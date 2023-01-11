import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserListDialogComponent } from 'src/app/core/dialog/user-list-dialog/user-list-dialog.component';
import { IBasket } from 'src/app/core/interfaces/basket';
import { BasketService } from 'src/app/core/services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  public isLoading: boolean = true;
  public courses: IBasket[];
  constructor(
    private readonly basketService: BasketService,
    private readonly matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getCoursesFromBasket();
  }

  private getCoursesFromBasket(): void {
    this.basketService.getCourses().subscribe((res) => {
      this.courses = res.data;
      this.isLoading = false;
    })
  }

  public seeUsers(event: IBasket): void {       
    const dialog = this.matDialog.open(UserListDialogComponent,{
      panelClass: 'users-dialog',
      width: '500px',
      height: '400px',
      data: event
    });
  }

}
