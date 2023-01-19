import { CourseTableData } from '../../core/interfaces/table-data.interface';
import { HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslatedTitleService } from "../../shared/shared-services/translated-title.service";
import { Filter } from '../../core/interfaces/filter.interface';
import { CourseStatus } from '../../core/enums/course-status.enum';
import { CourseType } from '../../core/enums/course-type.enum';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';
import { CoursesService } from "../../core/services/courses.service";
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.css"],
})
export class CoursesComponent implements OnInit {

  private readonly title: string = 'dashboard.courses';

  public online: string = '';
  public offline: string = '';
  public onlineWebinar: string = '';
  public consultation: string = '';

  public draft: string = '';
  public underReview: string = '';
  public approved: string = '';
  public declined: string = '';
  public deleted: string = '';

  public coursesData: CourseTableData;
  public totalPages: number = 0;
  public pageSize: number = 0;
  public currentPage: number = 1;
  public isLoading: boolean = true;
  public errorMessage: string;

  //FILTER BY TYPE Properties
  public _statuses: Filter[] = [
    { key: 'status', label: 'Draft', value: '1' },
    { key: 'status', label: 'Under Review', value: '2' },
    { key: 'status', label: 'Approved', value: '3' },
    { key: 'status', label: 'Decliden', value: '4' },
    { key: 'status', label: 'Deleted', value: '5' },
  ];
  public selectedStatuses: Filter[] = [];

  //FILTER BY STATUSES Properties
  public _types: Filter[] = [
    { key: 'type', label: 'Online', value: '1' },
    { key: 'type', label: 'Offline', value: '2' },
    { key: 'type', label: 'Online Webinar', value: '3' },
    { key: 'type', label: 'Consultation', value: '4' },
  ];
  public selectedTypes: Filter[] = [];

  public searchText: string = '';

  public joinedItemsArray: Filter[] = [];
  public filteredTypesArray: Filter[] = [];
  public filteredStatusesArray: Filter[] = [];

  constructor(
    private readonly translatedTitleService: TranslatedTitleService,
    private coursesService: CoursesService,
    private readonly activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private translateService: TranslateService,
  ) {
    this.translatedTitleService.setTranslatedTitle(this.title);
  }

  public ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      params['search_text'] ? this.searchText = (params['search_text']).trim() : '';
      if (params['status']) {
        let idArr = params['status'].split(',');
        idArr.forEach((el: string) => {
          if (el === '1') this.selectedStatuses.push({key: 'status', label: 'Draft', value: '1'});
          if (el === '2') this.selectedStatuses.push({key: 'status', label: 'Under Review', value: '2'});
          if (el === '3') this.selectedStatuses.push({key: 'status', label: 'Approved', value: '3'});
          if (el === '4') this.selectedStatuses.push({key: 'status', label: 'Decliden', value: '4'});
          if (el === '5') this.selectedStatuses.push({key: 'status', label: 'Deleted', value: '5'});
        });
      }
      if (params['type']) {
        let idArr = params['type'].split(',');
        idArr.forEach((el: string) => {
          if (el === '1') this.selectedTypes.push({key: 'type', label: 'Online', value: '1'});
          if (el === '2') this.selectedTypes.push({key: 'type', label: 'Offline', value: '2'});
          if (el === '3') this.selectedTypes.push({key: 'type', label: 'Online Webinar', value: '3'});
          if (el === '4') this.selectedTypes.push({key: 'type', label: 'Consultation', value: '4'});
        });
      }
    });
    this.joinDatas(false);
  }

  public detectTypeChange(selectedTypes: Filter[]) {
    this.currentPage = 1;
    this.pageSize = 0;
    this.totalPages = 0;
    this.selectedTypes = [];
    this.selectedStatuses = [];
    this.filteredTypesArray = selectedTypes;
    this.joinDatas(true);
  }

  public detectStatusChange(selectedStatuses: Filter[]) {
    this.currentPage = 1;
    this.pageSize = 0;
    this.totalPages = 0;
    this.selectedStatuses = [];
    this.selectedTypes = [];
    this.filteredStatusesArray = selectedStatuses;
    this.joinDatas(true);
  }

  public detectSearchSubmit(selectedStatuses: Filter[], selectedTypes: Filter[]) {
    this.currentPage = 1;
    this.pageSize = 0;
    this.totalPages = 0;
    this.selectedStatuses = [];
    this.selectedTypes = [];
    this.filteredTypesArray = selectedTypes;
    this.filteredStatusesArray = selectedStatuses;
    this.joinDatas(true);
  }

  public joinDatas (isMadeCurrentPageParam: boolean){
    if (this.selectedTypes.length > 0){
      this.filteredTypesArray = this.selectedTypes;
    }
    if (this.selectedStatuses.length > 0){
      this.filteredStatusesArray = this.selectedStatuses;
    }
    this.joinedItemsArray = [...this.filteredStatusesArray, ...this.filteredTypesArray, {key: 'search_text', label: 'Search Course', value: this.searchText.trim()}];
    if (isMadeCurrentPageParam) {
      let params = new HttpParams();
      let typeIdList = [];
      let statusIdList = [];
      if (this.joinedItemsArray.length !== 0) {
        this.joinedItemsArray.forEach((elem) => {
          if (elem.key === 'search_text' && elem.value !== '') params = params.append(elem.key, elem.value.trim());
          if (elem.key === 'status') statusIdList.push(elem.value);
          if (elem.key === 'type') typeIdList.push(elem.value);
          if (elem.key === 'search_text' && elem.value === '') params = params.delete(elem.key);
        });
        statusIdList.length > 0 ? params = params.append('status', statusIdList.join(',')) : params = params.delete('status');
        typeIdList.length > 0 ? params = params.append('type', typeIdList.join(',')) : params = params.delete('type');
      }
      let paramObj = {};
      Object.entries(params).forEach(([key, value]) => {
        if (key !== 'updates') {
          return;
        } else if (value) {
          value.forEach((item: { param: string; value: string; op: string }) => {
            let mergedObj = {
              [item.param]: item.value,
            };
            paramObj = Object.assign(paramObj, mergedObj);
          });
        }
      });
      this.addCurrentPageParam(paramObj);
    }
    this.fetchData();
  }

  public fetchData() {
    if (this.coursesData) {
      this.coursesData = {
        dataRows: [{id: 0, title: '', price: 0, type: 0, status: 0, currency: ''}]
      };
    }
    this.isLoading = true;
    this.coursesService.getCourses(this.joinedItemsArray, this.currentPage)
      .subscribe({
        next: (res) => {
          if (res.success === true) {
            this.coursesData = {
              dataRows: [{id: 0, title: '', price: 0, type: 0, status: 0, currency: ''}]
           };
          res.data.data.forEach((value) => {
            this.coursesData.dataRows.push({
              id: value.id,
              title: value.title,
              price: value.price,
              type: value.type,
              status: value.status,
              currency: value.currency,
            });
            switch (value.type) {
              case CourseType.ONLINE:
                this.online = this.translateService.instant('course.type.online');
                break;
              case CourseType.OFFLINE:
                this.offline = this.translateService.instant('course.type.offline');
                break;
              case CourseType.ONLINE_WEBINAR:
                this.onlineWebinar = this.translateService.instant('course.type.online_webinar');
                break;
              case CourseType.CONSULTATION:
                this.consultation = this.translateService.instant('course.type.consultation');
                break;
            }
            switch (value.status) {
              case CourseStatus.DRAFT:
                this.draft = this.translateService.instant('course.status.draft');
                break;
              case CourseStatus.UNDER_REVIEW:
                this.underReview = this.translateService.instant('course.status.under_review');
                break;
              case CourseStatus.APPROVED:
                this.approved = this.translateService.instant('course.status.approved');
                break;
              case CourseStatus.DECLINED:
                this.declined = this.translateService.instant('course.status.declined');
                break;
                case CourseStatus.DELETED:
              this.deleted = this.translateService.instant('course.status.deleted');
                break;
            }
          });
          this.coursesData.dataRows.shift();
          this.currentPage = res.data.current_page!;
          this.pageSize = res.data.per_page!;
          this.totalPages = res.data.total!;
          }
          this.isLoading = false;
        },
        error: (err) => {
          if (err.error.success === false) {
            this.errorMessage = err.error.message;
            this.isLoading = false;
          }
        },
      });
  }

  public get courseTypes(): typeof CourseType {
    return CourseType;
  }

  public get courseStatus(): typeof CourseStatus {
    return CourseStatus;
  }

  public openDeleteDialog(item_id: number, item_title: string, event: Event) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {delete_item: this.translateService.instant('course.course'), item_id, item_title},
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.fetchData();
      }
    });
  }

  public goCourseVerification(course) {
    this.router.navigate(['/system/courses/', course.id])
  }

  public addCurrentPageParam(params?: {}) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { ...params },
      queryParamsHandling: 'merge',
    });
  }

  public pageChanged(event: PageEvent): void {
    this.isLoading = true;
    this.currentPage = +event.pageIndex + 1;
    this.addCurrentPageParam();
    this.fetchData();
  }
}
