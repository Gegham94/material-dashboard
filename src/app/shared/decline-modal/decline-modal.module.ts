import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../../app.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {DeclineModalComponent} from "./decline-modal.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatInputModule
  ],
  exports: [ DeclineModalComponent ],
  declarations: [DeclineModalComponent],
})



export class DeclineModalModule { }
