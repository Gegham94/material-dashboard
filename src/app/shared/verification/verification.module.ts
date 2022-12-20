import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VerificationComponent} from "./verification.component";


@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [ VerificationComponent ],
  declarations: [VerificationComponent],
})
export class VerificationModule { }
