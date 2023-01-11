import { Subject, takeUntil } from 'rxjs';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PublicUser } from "../../core/interfaces/public-user.interface";
import { GlobalService } from "../../core/services/global.service";
import { TranslatedTitleService } from "../../shared/services/translated-title.service";
import { ProfileService } from "../../core/services/profile.service";
import { ToastrMessageService } from "../../core/services/toastr.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-my-profile",
  templateUrl: "./my-profile.component.html",
  styleUrls: ["./my-profile.component.css"],
})
export class MyProfileComponent implements OnInit, OnDestroy {
  private readonly title: string = "dashboard.my_profile";
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public isLoading: boolean = true;
  public userData: PublicUser;

  public profileForm: FormGroup;
  
  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = "";

  constructor(
    private readonly translatedTitleService: TranslatedTitleService,
    private readonly globalService: GlobalService,
    private readonly profileService: ProfileService,
    private toastrMessageService: ToastrMessageService,
    private router: Router,
  ) {
    this.translatedTitleService.setTranslatedTitle(this.title);
    this.globalService.currentUserObservable.pipe(takeUntil(this.destroy$))
    .subscribe(user => {
      if (user) {
        this.userData = user;
        this.isLoading = false;
      }
    });
  }

  public ngOnInit(): void {
    this.profileForm = new FormGroup({
      avatar: new FormControl(this.userData.avatar),
      first_name: new FormControl(this.userData.first_name, [
        Validators.required,
        Validators.pattern(
          "^(?=.{3,22}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"
        ),
      ]),
      last_name: new FormControl(this.userData.last_name, [
        Validators.required,
        Validators.pattern(
          "^(?=.{3,22}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"
        ),
      ]),
      email: new FormControl(this.userData.email, [
        Validators.required,
        Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$"),
      ]),
    });
  }

  public uploadFile(event) {
    let reader = new FileReader();
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.profileForm.patchValue({
          avatar: reader.result
        });
      }
    }
  }

  public submitForm() {
    this.userData = this.profileForm.getRawValue();
    this.isLoading = true;
    this.profileService.editProfile(this.userData).subscribe({
      next: (res) => {
        if (res.success === true) {
          this.isLoading = false;
          this.toastrMessageService.showSuccess(
            "User edited successfuly.",
            "Done !"
          );
          this.router.navigate(['/system/my-profile']);
        } else {
          setTimeout(() => (this.isLoading = false), 300);
          if (res.errors.email) {
            this.toastrMessageService.showError(res.errors.email, "Failed !");
          } else {
            this.toastrMessageService.showError(
              "User can not be edited",
              "Failed !"
            );
          }
        }
      },
      error: (err) => {
        if (err.error.success === false) {
          this.isLoading = false;
          this.toastrMessageService.showError(
            err.error.message,
            "Failed !"
          );
        }
      },
    });
  }

  public ngOnDestroy(): void {
    this.profileForm.reset();
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
