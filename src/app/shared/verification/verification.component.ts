import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {DeclineModalComponent} from "../decline-modal/decline-modal.component";
import {ApproveService} from "../services/approve/approve.service";
import {ToastrMessageService} from "../../core/services/toastr.service";

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
    public courseId;
    public approveCourseData
  constructor(private route: ActivatedRoute,
              private dialog:MatDialog,
              private approve:ApproveService,
              private toastrMessageService: ToastrMessageService
  ) { }

  ngOnInit(): void {
      this.route.params.subscribe((params) => {
          console.log(params['id'])
          if (params['id']) {
              this.courseId = +params['id'];
          }
      });
      this.getApprovalCurses()
  }
   openDecline(){
       const dialogRef = this.dialog.open(DeclineModalComponent, {
           data:this.courseId
       });
   }
   public getApprovalCurses(){
        this.approve.getCourse(this.courseId).subscribe(res =>{
           if(res.success){
               this.approveCourseData = res.data.new_value
               console.log(this.approveCourseData)
           }
        })
   }
   public approveCourse(){
       this.approve.approveCourse(this.courseId, 3).subscribe(res =>{
           if(res.success){
               this.toastrMessageService.showSuccess(res.message, 'Done !');
           }

       })

   }
}
