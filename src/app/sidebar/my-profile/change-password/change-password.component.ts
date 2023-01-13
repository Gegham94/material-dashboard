import { Component, OnInit, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ChangePasswordService } from './../../../core/services/change-password.service';
import { Subject, takeUntil } from 'rxjs';
import { ChangePasswordInterface } from '../../../core/interfaces/change-password.interface';
import { ToastrMessageService } from '../../../core/services/toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements AfterViewInit, OnInit, OnDestroy {

  public isLoading: boolean = true;
  public destroy$: Subject<void> = new Subject<void>();
  public passwordData: ChangePasswordInterface;
  public passwordForm: FormGroup;
  @Input() public readonly userId: number;

  constructor(
    public changePasswordService: ChangePasswordService,
    private translateService: TranslateService,
    private toastrMessageService: ToastrMessageService,
    private router: Router,
  ) {
    this.passwordForm = new FormGroup({
      current_password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern("^[A-Za-z0-9_]\\w{5,20}$"),
      ]),
      new_password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern("^[A-Za-z0-9_]\\w{5,20}$"),
      ]),
      repeat_password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern("^[A-Za-z0-9_]\\w{5,20}$"),
      ]),
    });
  }

  public ngOnInit(): void {
    this.isLoading = true;
  }

  public ngAfterViewInit(): void {
    this.userId ? this.isLoading = false : this.isLoading = true;
  }

  public get oldPassword(): FormControl {
    return this.passwordForm.get('current_password') as FormControl;
  }

  public submitChangePasswordForm() {
    this.passwordData = this.passwordForm.getRawValue();
    this.passwordData.id = this.userId;
    this.changePasswordService.checkCurrentPassword(this.oldPassword.value).pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res) => {
        if (res.success === true) {
          if (this.passwordData.new_password !== this.passwordData.repeat_password) {
            this.toastrMessageService.showError(
              this.translateService.instant('user.profile_validation.not_match'),
              this.translateService.instant('user.profile_validation.faild')
            );
            return;
          }
          this.isLoading = true;
          this.changePasswordService.changePassword(this.passwordData).pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (res) => {
              if (res.success === true) {
                this.isLoading = false;
                this.toastrMessageService.showSuccess(
                  this.translateService.instant('user.profile_validation.success_changed'),
                  this.translateService.instant('user.profile_validation.done')
                );
                this.router.navigate(['/system/my-profile']);
              } else {
                setTimeout(() => (this.isLoading = false), 300);
                if (res.errors.email) {
                  this.toastrMessageService.showError(res.errors.email, this.translateService.instant('user.profile_validation.faild'));
                } else {
                  this.toastrMessageService.showError(
                    this.translateService.instant('user.profile_validation.faild_save'),
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
        } else {
          setTimeout(() => (this.isLoading = false), 300);
          this.toastrMessageService.showError(
            this.translateService.instant('user.profile_validation.incorrect_current_password'),
            this.translateService.instant('user.profile_validation.faild')
          );
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
    this.passwordForm.reset();
    this.destroy$.next();
    this.destroy$.complete();
  }

}
