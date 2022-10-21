import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  constructor() { }

  private isVisibleCreateNewCategoryButton: boolean = false;

  get_createNewCategoryButton_visibleStatus(): boolean {
    return this.isVisibleCreateNewCategoryButton
  }

  set_createNewCategoryButton_visibleStatus(buttonStatus: boolean): void {
    this.isVisibleCreateNewCategoryButton = buttonStatus;
  }
}
