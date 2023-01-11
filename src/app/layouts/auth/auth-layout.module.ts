import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageModule } from '../../shared/language/language.module';

import { AuthLayoutComponent } from './auth-layout.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [AuthLayoutComponent, LoginComponent],
  imports: [CommonModule, AuthLayoutRoutingModule, ReactiveFormsModule, TranslateModule, LanguageModule],
})
export class AuthLayoutModule {}
