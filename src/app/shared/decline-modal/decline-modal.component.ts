import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";
import {ApproveService} from "../../core/services/approve.service";
import {ToastrMessageService} from "../../core/services/toastr.service";

@Component({
  selector: 'app-decline-modal',
  templateUrl: './decline-modal.component.html',
  styleUrls: ['./decline-modal.component.css']
})
export class DeclineModalComponent implements OnInit {
  public readonly declineForm = new FormGroup({
    decline_text: new FormControl(''),
  });
  constructor(
      public readonly dialogRef: MatDialogRef<DeclineModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data,
      private toastrMessageService: ToastrMessageService,
      public decline: ApproveService
  ) { }

  ngOnInit(): void {
    this.declineForm.controls['decline_text'].setValue(this.data.text);
  }

  public declineCourse(){
    const text = this.declineForm.controls['decline_text'].value
    this.decline.approveCourse(this.data.id,4, text).subscribe(res=>{
      if(res.success){
        this.closeDialog()
        this.toastrMessageService.showSuccess(res.message, 'Done !');
      }
    })
  }
  public closeDialog() {
    this.dialogRef.close();
  }

}
