import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IBasket } from '../../interfaces/basket';

@Component({
  selector: 'app-user-list-dialog',
  templateUrl: './user-list-dialog.component.html',
  styleUrls: ['./user-list-dialog.component.css']
})
export class UserListDialogComponent implements OnInit {
  public dialogData: IBasket
  constructor(
    public readonly dialogRef: MatDialogRef<UserListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: IBasket,
  ) { }

  ngOnInit(): void {
    this.dialogData = this._data
  }

  public closeDialog(): void {
    this.dialogRef.close()
  }

}
