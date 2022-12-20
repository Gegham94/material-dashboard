import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { PublicUser } from '../../core/interfaces/public-user.interface';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  @Input()
  public userData!: PublicUser;

  constructor( public dialog: MatDialog ) { }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {delete_item: 'user', item_id: this.userData.id, item_title: this.userData.first_name},
    });
  }
}
