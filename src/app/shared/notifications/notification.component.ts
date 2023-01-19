import { Component, OnInit } from "@angular/core";
import { NotificationService } from "../../core/services/notification.service";
import { Subject, takeUntil, mergeMap, timer, repeat } from "rxjs";
import { ToastrService } from "ngx-toastr";
import {
  NotificationsInterface,
  NotificationsUnread,
} from "src/app/core/interfaces/notifications";
import { Router } from "@angular/router";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"],
})
export class NotificationComponent implements OnInit {
  public allNotifications?: NotificationsInterface[];

  public unreadCount = 0;

  public notificationList: number[] = [];

  public destroyed$: Subject<boolean> = new Subject<boolean>();

  public loader = true;

  constructor(
    public router: Router,
    private notificationService: NotificationService,
    private toastr: ToastrService
  ) {}

  public ngOnInit(): void {
    this.getNotifications();
  }
  private getNotifications() {
    timer(0, 5000)
      .pipe(
        repeat(),
        mergeMap(() => this.notificationService.unread())
      )
      .subscribe((data: NotificationsUnread) => {
        if (data.success) {
          this.unreadCount = data.unread;
        }
      });
  }

  public fetchData() {
    this.loader = true;
    this.notificationService
      .getNotificationList()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(({ notifications }) => {
        if (notifications) {
          this.allNotifications = [...notifications];
          this.loader = false;
        }
      });
  }

  public readNotification(id: number, status: number, ev: Event) {
    ev.stopPropagation();
    if (status === 0) {
      this.notificationService.changeStatus(id).subscribe((res) => {
        if (res.success) {
          const notification = this.allNotifications?.find(
            (el) => el.id === id
          );
          if (notification) {
            notification.status = 1;
          }
          this.unreadCount--;
        }
      });
    }
  }

  public deleteNotification(id: number, event: Event, index: number) {
    event.stopPropagation();
    this.notificationService.delete(id).subscribe(
      () => {
        this.allNotifications?.splice(index, 1);
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    );
  }

  public markAllRead(ev: Event) {
    ev.stopPropagation();
    if (this.unreadCount) {
      this.notificationService.markAsRead().subscribe(() => {
        this.unreadCount = 0;
        this.allNotifications?.forEach((el) => {
          el.status = 1;
        });
      });
    }
  }
}
