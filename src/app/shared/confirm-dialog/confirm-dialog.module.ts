import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
  ]
})
export class ConfirmDialogModule { }
