import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { UsersManagementService } from "../../core/services/users-management.service";
import { UserInterface } from "../../core/interfaces/user.interface";
import { ToastrMessageService } from "../../core/services/toastr.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-users-management",
  templateUrl: "./users-management.component.html",
  styleUrls: ["./users-management.component.css"],
})
export class UsersManagementComponent implements OnInit {

  public errorMessage: string = "";

  public userManagementForm: FormGroup;

  public showPassword: boolean = false;

  public fieldTextType = false;

  public userData: UserInterface;

  public emailError: string = "";

  public passwordError: string = "";

  public isLoading = false;

  constructor(
    public usersManagementService: UsersManagementService,
    private toastrMessageService: ToastrMessageService,
    private translateService: TranslateService,
  ) {
    this.userManagementForm = new FormGroup({
      first_name: new FormControl("", [
        Validators.required,
        Validators.pattern(
          "^(?=.{3,22}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"
        ),
      ]),
      last_name: new FormControl("", [
        Validators.required,
        Validators.pattern(
          "^(?=.{3,22}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"
        ),
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(
          "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$"
        ),
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.pattern("^[A-Za-z0-9_]\\w{7,15}$"),
      ]),
      role_id: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.userManagementForm.reset();
  }

  public toggleShowPassword() {
    this.showPassword = !this.showPassword;
    this.fieldTextType = !this.fieldTextType;
  }

  public submitForm() {
    this.isLoading = true;
    let lang = localStorage.getItem("lang");
    this.userData = this.userManagementForm.getRawValue();
    this.userData.language_code = lang;
    this.usersManagementService.createUser(this.userData).subscribe({
      next: (res) => {
        if (res.success === true) {
          this.isLoading = false;
          this.toastrMessageService.showSuccess(
            "User created successfuly.",
            "Done !"
          );
        } else {
          setTimeout(() => (this.isLoading = false), 300);
          if (res.errors.email) {
            this.toastrMessageService.showError(res.errors.email, "Failed !");
          } else {
            this.toastrMessageService.showError(
              "User can not be created",
              "Failed !"
            );
          }
        }
      },
      error: (err) => {
        if (err.error.success === false) {
          this.errorMessage = err.error.message;
          this.isLoading = false;
        }
      },
    });
  }

  public get f(): { [key: string]: AbstractControl } {
    return this.userManagementForm.controls;
  }
}
