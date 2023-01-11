import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-description-view-modal',
  templateUrl: './description-view-modal.component.html',
  styleUrls: ['./description-view-modal.component.css']
})
export class DescriptionViewModalComponent implements OnInit {
  public description: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) private readonly data, private readonly dialogRef: MatDialogRef<DescriptionViewModalComponent>) { }

  public ngOnInit(): void {
    this.description = this.data.description;
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
