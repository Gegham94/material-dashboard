import { HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslatedTitleService } from "../../shared/services/translated-title.service";
import { Filter } from '../../core/interfaces/filter.interface';
import { PublicCourse } from "../../core/interfaces/public-course.interface";
import { CoursesService } from "../../core/services/courses.service";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.css"],
})
export class CoursesComponent implements OnInit {
  private readonly title: string = 'dashboard.courses';
  public coursesData: PublicCourse[];
  public totalPages: number = 0;
  public pageSize: number = 0;
  public currentPage: number = 1;
  public isLoading: boolean = true;
  public errorMessage: string;

  //FILTER BY TYPE Properties
  public _types: Filter[] = [
    { key: 'type', label: 'Draft', value: '1' },
    { key: 'type', label: 'Under Review', value: '2' },
    { key: 'type', label: 'Approved', value: '3' },
    { key: 'type', label: 'Decliden', value: '4' },
    { key: 'type', label: 'Deleted', value: '5' },
  ];
  public selectedTypes: Filter[] = [];

  //FILTER BY STATUSES Properties
  public _statuses: Filter[] = [
    { key: 'status', label: 'Online', value: '1' },
    { key: 'status', label: 'Offline', value: '2' },
    { key: 'status', label: 'Online Webinar', value: '3' },
    { key: 'status', label: 'Consultation', value: '4' },
  ];
  public selectedStatuses: Filter[] = [];

  public searchText: string = '';

  public joinedItemsArray: Filter[] = [];
  public filteredTypesArray: Filter[] = [];
  public filteredStatusesArray: Filter[] = [];

  constructor(
    private readonly translatedTitleService: TranslatedTitleService,
    private coursesService: CoursesService,
    private readonly activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.translatedTitleService.setTranslatedTitle(this.title);
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
        params['search_text'] ? this.searchText = (params['search_text']).trim() : '';
      if (params['type']) {
        let idArr = params['type'].split(',');
        idArr.forEach((el: string) => {
          if (el === '1') this.selectedTypes.push({key: 'type', label: 'Draft', value: '1'});
          if (el === '2') this.selectedTypes.push({key: 'type', label: 'Under Review', value: '2'});
          if (el === '3') this.selectedTypes.push({key: 'type', label: 'Approved', value: '3'});
          if (el === '4') this.selectedTypes.push({key: 'type', label: 'Decliden', value: '4'});
          if (el === '5') this.selectedTypes.push({key: 'type', label: 'Deleted', value: '5'});
        });
      }
      if (params['status']) {
        let idArr = params['status'].split(',');
        idArr.forEach((el: string) => {
          if (el === '1') this.selectedStatuses.push({key: 'status', label: 'Online', value: '1'});
          if (el === '2') this.selectedStatuses.push({key: 'status', label: 'Offline', value: '2'});
          if (el === '3') this.selectedStatuses.push({key: 'status', label: 'Online Webinar', value: '3'});
          if (el === '4') this.selectedStatuses.push({key: 'status', label: 'Consultation', value: '4'});
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

  public detectSearchSubmit(selectedTypes: Filter[], selectedStatuses: Filter[]) {
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
      this.coursesData = [];
    }
    this.isLoading = true;
    this.coursesService.getCourses(this.joinedItemsArray, this.currentPage)
      .subscribe({
        next: (res) => {
          if (res.success === true) {
            this.coursesData = res.data.data;
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

  public addCurrentPageParam(params?: {}) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        ...params
      },
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
