import { UserTableData } from '../../core/interfaces/table-data.interface';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Filter } from '../../core/interfaces/filter.interface';
import { UserType } from '../../core/enums/user-type.enum';
import { UsersService } from 'src/app/core/services/users.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatedTitleService } from '../../shared/services/translated-title.service';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  private readonly title: string = 'dashboard.users';

  public administrator: string = '';
  public moderator: string = '';
  public trainer: string = '';
  public trainingCenter: string = '';
  public student: string = '';

  public usersData: UserTableData;
  public totalPages: number = 0;
  public pageSize: number = 0;
  public currentPage: number = 1;
  public isLoading: boolean = true;
  public errorMessage: string;

  //ROLE Properties
  public _roles: Filter[] = [
    { key: 'role_id', label: 'Administrator', value: '1' },
    { key: 'role_id', label: 'Moderator', value: '2' },
    { key: 'role_id', label: 'Trainer', value: '3' },
    { key: 'role_id', label: 'Training Center', value: '4' },
    { key: 'role_id', label: 'Student', value: '5' },
  ];
  public selectedRoles: Filter[] = [];

  public searchText: string = '';

  public joinedItemsArray: Filter[] = [];
  public filteredRolesArray: Filter[] = [];

  constructor(
    private readonly translatedTitleService: TranslatedTitleService,
    private usersService: UsersService,
    private readonly activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private translateService: TranslateService,
  ) {
    this.translatedTitleService.setTranslatedTitle(this.title);
  }

  public ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
        params['search_text'] ? this.searchText = (params['search_text']).trim() : '';
      if (params['role_id']) {
        let idArr = params['role_id'].split(',');
        idArr.forEach((el: string) => {
          if (el === '1') this.selectedRoles.push({key: 'role_id', label: 'Administrator', value: '1'});
          if (el === '2') this.selectedRoles.push({key: 'role_id', label: 'Moderator', value: '2'});
          if (el === '3') this.selectedRoles.push({key: 'role_id', label: 'Trainer', value: '3'});
          if (el === '4') this.selectedRoles.push({key: 'role_id', label: 'Training Center', value: '4'});
          if (el === '5') this.selectedRoles.push({key: 'role_id', label: 'Student', value: '5'});
        });
      }
    });
    this.joinDatas(false);
  }

  public detectRoleChange(selectedRoles: Filter[]) {
    this.currentPage = 1;
    this.pageSize = 0;
    this.totalPages = 0;
    this.selectedRoles = [];
    this.filteredRolesArray = selectedRoles;
    this.joinDatas(true);
  }

  public detectSearchSubmit(selectedRoles: Filter[]) {
    this.currentPage = 1;
    this.pageSize = 0;
    this.totalPages = 0;
    this.selectedRoles = [];
    this.filteredRolesArray = selectedRoles;
    this.joinDatas(true);
  }

  public joinDatas (isMadeCurrentPagePara: boolean){
    if (this.selectedRoles.length > 0){
      this.filteredRolesArray = this.selectedRoles;
    }
    this.joinedItemsArray = [...this.filteredRolesArray, {key: 'search_text', label: 'Search User', value: this.searchText.trim()}];
    if (isMadeCurrentPagePara){
      let params = new HttpParams();
      let roleIdList = [];
      if (this.joinedItemsArray.length !== 0) {
        this.joinedItemsArray.forEach((elem) => {
          if (elem.key === 'role_id') roleIdList.push(elem.value);
          if (elem.key === 'search_text' && elem.value !== '') params = params.append(elem.key, elem.value.trim());
          if (elem.key === 'search_text' && elem.value === '') params = params.delete(elem.key);
        });
        roleIdList.length && roleIdList.length > 0 ? params = params.append('role_id', roleIdList.join(',')) : params = params.delete('role_id');
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
    if (this.usersData) {
      this.usersData = {
        dataRows: [{avatar: '', id: 0, first_name: '', last_name: '', email: '', role_id: 0}]
      };
    }
    this.isLoading = true;
    this.usersService.getUsers(this.joinedItemsArray, this.currentPage)
    .subscribe({
      next: (res) => {
        if (res.success === true) {
          this.usersData = {
            dataRows: [{avatar: '', id: 0, first_name: '', last_name: '', email: '', role_id: 0}]
          };
          res.data.data.forEach((value) => {
            this.usersData.dataRows.push({
              id: value.id,
              avatar:value.avatar,
              first_name: value.first_name,
              last_name: value.last_name,
              email: value.email,
              role_id: value.role_id,
            });
            switch (value.role_id) {
              case UserType.ADMINISTRATOR:
                this.administrator = this.translateService.instant('user.role.administrator');
                break;
              case UserType.MODERATOR:
                this.moderator = this.translateService.instant('user.role.moderator');
                break;
              case UserType.TRAINER:
                this.trainer = this.translateService.instant('user.role.trainer');
                break;
              case UserType.TRAINING_CENTER:
                this.trainingCenter = this.translateService.instant('user.role.training_center');
                break;
              case UserType.STUDENT:
                this.student = this.translateService.instant('user.role.student');
                break;
            }
          });
          this.usersData.dataRows.shift();
          this.currentPage = res.data.current_page!;
          this.pageSize = res.data.per_page!;
          this.totalPages = res.data.total!;
        }
        this.isLoading = false;
      },
      error: (err) => {
        if (err.error.success === false){
          this.errorMessage = err.error.message;
          this.isLoading = false;
        }
      }
    });
  }

  public get usersRoles(): typeof UserType {
    return UserType;
  }

  public openDeleteDialog(item_id: number, item_title: string, item_second_title? :string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {delete_item: this.translateService.instant('user.user'), item_id, item_title, item_second_title},
    });
  }

  public addUser() {
    this.router.navigate(['/system/users-management'])
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