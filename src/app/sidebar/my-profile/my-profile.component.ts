import { Subject, takeUntil } from "rxjs";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { PublicUser } from "../../core/interfaces/public-user.interface";
import { GlobalService } from "../../core/services/global.service";
import { TranslatedTitleService } from "../../shared/services/translated-title.service";

@Component({
  selector: "app-my-profile",
  templateUrl: "./my-profile.component.html",
  styleUrls: ["./my-profile.component.css"],
})
export class MyProfileComponent implements OnDestroy {
  private readonly title: string = "user.profile.my_profile";
  public destroy$: Subject<void> = new Subject<void>();
  public isLoading: boolean = true;
  public userData: PublicUser;

  constructor(
    private readonly translatedTitleService: TranslatedTitleService,
    private readonly globalService: GlobalService
  ) {
    this.translatedTitleService.setTranslatedTitle(this.title);
    this.globalService.currentUserObservable
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user) {
          this.userData = user;
          this.isLoading = false;
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
