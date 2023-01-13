import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { PublicUser } from 'src/app/core/interfaces/public-user.interface';
import { ProfileService } from 'src/app/core/services/profile.service';
import { ToastrMessageService } from 'src/app/core/services/toastr.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, AfterViewInit, OnDestroy {

  public destroy$: Subject<void> = new Subject<void>();
  public isLoading: boolean = true;
  public profileForm: FormGroup;
  @Input() public userData: PublicUser;

  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = "";

  constructor(
    private readonly profileService: ProfileService,
    private toastrMessageService: ToastrMessageService,
    private router: Router,
    private translateService: TranslateService,
  ) { }

  public ngOnInit(): void {
    this.isLoading = true;
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

  public ngAfterViewInit(): void {
    this.userData ? this.isLoading = false : this.isLoading = true;
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

  public submitEditProfileForm() {
    this.userData = this.profileForm.getRawValue();
    this.profileService.editProfile(this.userData).pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res) => {
        if (res.success === true) {
          this.isLoading = false;
          this.toastrMessageService.showSuccess(
            this.translateService.instant('user.profile_validation.edit_success'),
            this.translateService.instant('user.profile_validation.done')
          );
          this.router.navigate(['/system/my-profile']);
        } else {
          setTimeout(() => (this.isLoading = false), 300);
          if (res.errors.email) {
            this.toastrMessageService.showError(res.errors.email, this.translateService.instant('user.profile_validation.faild'));
          } else {
            this.toastrMessageService.showError(
              this.translateService.instant('user.profile_validation.edit_faild'),
              this.translateService.instant('user.profile_validation.faild')
            );
          }
        }
      },
      error: (err) => {
        if (err.error.success === false) {
          this.isLoading = false;
          this.toastrMessageService.showError(
            err.error.message,
            this.translateService.instant('user.profile_validation.faild')
          );
        }
      },
    });
  }

  public ngOnDestroy(): void {
    this.profileForm.reset();
    this.destroy$.next();
    this.destroy$.complete();
  }

}
