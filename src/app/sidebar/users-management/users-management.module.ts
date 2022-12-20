import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../../app.module";
import { TranslateModule } from "@ngx-translate/core";
import { ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { RadioButtonModule } from "primeng/radiobutton";

import { UsersManagementComponent } from "./users-management.component";
import { AdminModeratorRoutes } from "./users-management.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminModeratorRoutes),
    FormsModule,
    MaterialModule,
    TranslateModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    RadioButtonModule,
  ],
  declarations: [UsersManagementComponent],
})
export class UsersManagementModule {}
