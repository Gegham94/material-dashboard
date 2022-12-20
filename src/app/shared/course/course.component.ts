import { Component, Input, OnInit } from '@angular/core';
import { PublicCourse } from '../../core/interfaces/public-course.interface';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Router } from "@angular/router";
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit{

  @Input()
  public courseData!: PublicCourse;

  constructor (
    private route:Router,
    public dialog: MatDialog,
    private primengConfig: PrimeNGConfig
  ) { }

  public ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {delete_item: 'course', item_id: this.courseData.id, item_title: this.courseData.title},
    });
  }
  goCourseVerification(course) {
    this.route.navigate(['/system/courses/verification/',course.id])
  }
}
