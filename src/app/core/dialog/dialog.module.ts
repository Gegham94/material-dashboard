import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { UserListDialogComponent } from './user-list-dialog/user-list-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    UserListDialogComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
})
export class DialogModule { }
