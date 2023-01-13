import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../../app.module";
import { MyProfileComponent } from "./my-profile.component";
import { MyProfileRoutes } from "./my-profile.routing";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';
import { TabViewModule } from 'primeng/tabview';
import { ImageModule } from 'primeng/image';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MyProfileRoutes),
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    TranslateModule,
    TabViewModule,
    ImageModule,
  ],
  declarations: [MyProfileComponent, EditProfileComponent, ChangePasswordComponent, ProfileInfoComponent],
})
export class MyProfileModule {}
