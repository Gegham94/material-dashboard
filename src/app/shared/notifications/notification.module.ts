import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NotificationComponent],
  imports: [CommonModule, TranslateModule, MatProgressSpinnerModule, RouterModule],
  exports: [NotificationComponent],
})
export class NotificationModule { }
