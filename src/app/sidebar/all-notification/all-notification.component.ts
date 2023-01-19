import { Component, OnDestroy, OnInit } from "@angular/core";
import { NotificationService } from "../../core/services/notification.service";
import { TranslatedTitleService } from "../../shared/shared-services/translated-title.service";
import { Subject, takeUntil } from "rxjs";
import { NotificationsInterface } from "../../core/interfaces/notifications";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-all-notification",
  templateUrl: "./all-notification.component.html",
  styleUrls: ["./all-notification.component.scss"],
})
export class AllNotificationComponent implements OnInit, OnDestroy {
  private readonly title: string = "dashboard.all-notifications";

  public unsubscribe$: Subject<any> = new Subject<any>();

  public unreadCount = 0;

  public allNotificationList?: NotificationsInterface[] = [];

  public loader = false;

  constructor(
    private notificationService: NotificationService,
    private toastrService: ToastrService,
    private readonly translatedTitleService: TranslatedTitleService
  ) {
    this.translatedTitleService.setTranslatedTitle(this.title);
  }

  public ngOnInit(): void {
    this.fetchNotification();
  }

  public ngOnDestroy() {
    this.unsubscribe$.next("");
    this.unsubscribe$.complete();
  }

  public fetchNotification() {
    this.loader = true;
    this.notificationService
      .getNotifications()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        if (res.success) {
          this.allNotificationList = res.data;
          this.unreadCount = res["count"];
        }
        this.loader = false;
      });
  }

  public deleteItem(id: number) {
    this.notificationService
      .delete(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        if (res["success"]) {
          this.toastrService.success(res["message"]);
          this.allNotificationList = this.allNotificationList.filter(
            (el) => el.id !== id
          );
        } else {
          this.toastrService.error(res["message"]);
        }
      });
  }

  public readNotification(id: number, status: number) {
    if (status === 0) {
      this.notificationService.changeStatus(id).subscribe((res) => {
        if (res.success) {
          const notification = this.allNotificationList?.find(
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

  public markAllRead(ev: Event) {
    ev.stopPropagation();
    if (this.unreadCount) {
      this.notificationService.markAsRead().subscribe(() => {
        this.unreadCount = 0;
        this.allNotificationList?.forEach((el) => {
          el.status = 1;
        });
      });
    }
  }
}
