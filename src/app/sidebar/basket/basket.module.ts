import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasketRoutingModule } from './basket-routing.module';
import { BasketComponent } from './basket.component';
import {TranslateModule} from '@ngx-translate/core'
import { DialogModule } from 'src/app/core/dialog/dialog.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    BasketComponent
  ],
  imports: [
    CommonModule,
    BasketRoutingModule,
    TranslateModule,
    DialogModule,
    MatProgressSpinnerModule
  ]
})
export class BasketModule { }
