import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../../app.module";
import { TranslateModule } from '@ngx-translate/core';

import { ChangePasswordComponent } from './change-password.component';
import { ChangePasswordRoutes } from './change-password.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ChangePasswordRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule,
  ],
  declarations: [ChangePasswordComponent],
})
export class ChangePasswordModule { }
