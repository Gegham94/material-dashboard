import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../../app.module";

import { CategoriesManagementComponent } from "./categories-management.component";
import { CategoryRoutes } from "./categories-management.routing";
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import {TranslateModule} from '@ngx-translate/core'
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CategoryRoutes),
    MaterialModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    TranslateModule
  ],
  declarations: [CategoriesManagementComponent],
})
export class CategoriesManagementModule {}
