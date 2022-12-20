import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';

import { PaginationComponent } from "./pagination.component";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MaterialModule } from "src/app/app.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    MatPaginatorModule,
    TranslateModule
  ],
  exports: [ PaginationComponent ],
  declarations: [PaginationComponent],
})
export class PaginationModule {}
