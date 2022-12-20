import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Input()
  public total: number = 0;

  @Input()
  public pageIndex: number = 0;

  @Input()
  public pageSize: number = 0;

  @Output()
  public pageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  constructor() {}

  public handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.pageChange.emit(e);
  }
}
