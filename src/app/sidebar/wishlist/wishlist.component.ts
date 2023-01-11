import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserListDialogComponent } from 'src/app/core/dialog/user-list-dialog/user-list-dialog.component';
import { IBasket } from 'src/app/core/interfaces/basket';

import { IWishlist } from 'src/app/core/interfaces/wishlist';
import { WishListService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  public isLoading: boolean = true;
  public courses: IWishlist[];
  constructor(
    private readonly wishlistService: WishListService,
    private readonly matDialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.getcoursesFromWishList();
  }


  private getcoursesFromWishList(): void {
    this.wishlistService.getCourses().subscribe((res) => {
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
