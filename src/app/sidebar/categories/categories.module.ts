import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../../app.module";
import { TranslateModule } from '@ngx-translate/core';

import { CategoriesComponent } from "./categories.component";
import { CategoriesRoutes } from "./categories.routing";
import { TooltipModule } from "primeng/tooltip";

@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(CategoriesRoutes),
    FormsModule,
    MaterialModule,
    TranslateModule,
    TooltipModule,
  ],
})
export class CategoriesModule {}
