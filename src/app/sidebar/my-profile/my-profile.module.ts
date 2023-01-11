import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../../app.module";
import { MyProfileComponent } from "./my-profile.component";
import { MyProfileRoutes } from "./my-profile.routing";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MyProfileRoutes),
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [MyProfileComponent],
})
export class MyProfileModule {}
