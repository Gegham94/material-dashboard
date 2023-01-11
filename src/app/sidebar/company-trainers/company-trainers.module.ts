import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyTrainersRoutingModule } from './company-trainers-routing.module';
import { CompanyTrainersComponent } from './company-trainers.component';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/app.module';
import { PaginationModule } from 'src/app/shared/pagination/pagination.module';


@NgModule({
  declarations: [
    CompanyTrainersComponent
  ],
  imports: [
    CommonModule,
    CompanyTrainersRoutingModule,
    TranslateModule,
    MaterialModule,
    PaginationModule,
  ]
})
export class CompanyTrainersModule { }
