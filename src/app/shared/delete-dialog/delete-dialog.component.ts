// import { DeleteItem } from './../../core/interfaces/delete-item.interface';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { CoursesService } from '../../core/services/courses.service';
import { ToastrMessageService } from '../../core/services/toastr.service';
import { UsersService } from '../../core/services/users.service';
interface DeleteItem {
  delete_item: string;
  item_id: number;
  item_title: string;
}

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  public isLoadingButton: boolean = false;

  constructor(
    private coursesService: CoursesService,
    private usersService: UsersService,
    public readonly dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: DeleteItem,
    private toastrMessageService: ToastrMessageService
  ) { }

  public ngOnInit() {
  }

  public deleteItem() {
    this.isLoadingButton = true;
    switch (this._data.delete_item) {
      case 'course':
        this.coursesService.deleteCourse(this._data.item_id).subscribe((res) => {
          if (res.success === true) {
            this.toastrMessageService.showSuccess(res.message, 'Done !');
          } else {
            this.toastrMessageService.showError(res.message, 'Ooops !');
          }
          this.isLoadingButton = false;
          this.dialogRef.close();
        });
        break;
      case 'user':
        this.usersService.deleteUser(this._data.item_id).subscribe((res) => {
          if (res.success === true) {
            this.toastrMessageService.showSuccess(res.message, 'Done !');
          } else {
            this.toastrMessageService.showError(res.message, 'Ooops !');
          }
          this.isLoadingButton = false;
          this.dialogRef.close();
        });
        break;
    }
  }

  public closeDialog() {
    this.isLoadingButton = false;
    this.dialogRef.close();
  }

}
