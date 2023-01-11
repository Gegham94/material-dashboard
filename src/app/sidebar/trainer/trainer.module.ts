import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainerRoutingModule } from './trainer-routing.module';
import { TrainerComponent } from './trainer.component';
import { MaterialModule } from 'src/app/app.module';


@NgModule({
  declarations: [
    TrainerComponent
  ],
  imports: [
    CommonModule,
    TrainerRoutingModule,
    MaterialModule,
  ]
})
export class TrainerModule { }
