import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../../app.module";
import { TranslateModule } from '@ngx-translate/core';

import { TablesRoutes } from "./tables.routing";

import { ExtendedTableComponent } from "./extendedtable/extendedtable.component";
import { RegularTableComponent } from "./regulartable/regulartable.component";
import { DataTableComponent } from "./datatable.net/datatable.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TablesRoutes),
    FormsModule,
    MaterialModule,
    TranslateModule
  ],
  declarations: [
    ExtendedTableComponent,
    DataTableComponent,
    RegularTableComponent,
  ],
})
export class TablesModule {}
