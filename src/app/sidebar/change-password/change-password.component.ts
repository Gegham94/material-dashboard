import { ChangePasswordService } from './../../core/services/change-password.service';
import { ChangePasswordInterface } from './../../core/interfaces/change-password.interface';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrMessageService } from '../../core/services/toastr.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public isLoading: boolean = true;
  public data: ChangePasswordInterface;
  public changePasswordForm: FormGroup;

  constructor(
    public changePasswordService: ChangePasswordService,
    private toastrMessageService: ToastrMessageService,
  ) {
    this.changePasswordForm = new FormGroup({
      new_password: new FormControl('', [
        Validators.required,
        Validators.pattern("^[A-Za-z0-9_]\\w{7,15}$"),
      ]),
      repeat_password: new FormControl('', [
        Validators.required,
        Validators.pattern("^[A-Za-z0-9_]\\w{7,15}$"),
      ]),
    });
  }

  public ngOnInit(): void {
    this.changePasswordForm.reset();
    this.isLoading = false;
  }

  public submitForm() {
    this.data = this.changePasswordForm.getRawValue();
    if (this.data.new_password !== this.data.repeat_password) {
      this.toastrMessageService.showWarning(
        "Fields are not match!",
        "Warning !"
      );
      return;
    }
    this.isLoading = true;
    this.changePasswordService.changePassword(this.data).subscribe({
      next: (res) => {
        if (res.success === true) {
          this.isLoading = false;
          this.toastrMessageService.showSuccess(
            "Password changed successfuly.",
            "Done !"
          );
        } else {
          setTimeout(() => (this.isLoading = false), 300);
          if (res.errors.email) {
            this.toastrMessageService.showError(res.errors.email, "Failed !");
          } else {
            this.toastrMessageService.showError(
              "Password can not be changed",
              "Failed !"
            );
          }
        }
      },
      error: (err) => {
        if (err.error.success === false) {
          this.isLoading = false;
        }
      },
    });
  }
}
