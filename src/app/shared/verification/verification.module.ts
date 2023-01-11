import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerificationComponent } from "./verification.component";
import { TablesModule } from "../../sidebar/tables/tables.module";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MaterialModule } from "../../app.module";
import {SectionViewModalModule} from '../section-view-modal/section-view-modal.module';


@NgModule({
    imports: [
        CommonModule,
        TablesModule,
        MatCheckboxModule,
        TablesModule,
        MaterialModule,
        SectionViewModalModule
    ],
  exports: [ VerificationComponent ],
  declarations: [VerificationComponent],
})
export class VerificationModule { }
