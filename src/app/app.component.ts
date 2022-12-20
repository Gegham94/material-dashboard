import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-my-app",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  private _router: Subscription;

  constructor(
    private router: Router,
    private translateService: TranslateService,
  ) {}

  ngOnInit() {
    this._router = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const body = document.getElementsByTagName("body")[0];
        const modalBackdrop = document.getElementsByClassName("modal-backdrop")[0];
        if (body.classList.contains("modal-open")) {
          body.classList.remove("modal-open");
          modalBackdrop.remove();
        }
      });

    let defaultLanguage: string = this.getLang();

    this.translateService.setDefaultLang(defaultLanguage);
    this.translateService.use(defaultLanguage);

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      localStorage.setItem("lang", event.lang);
    });

    localStorage.setItem("lang", defaultLanguage);
  }

  public getLang(): string {
    let lang: string = "";
    const storedLanguage = localStorage.getItem("lang");
    if (storedLanguage && ["en", "hy"].indexOf(storedLanguage) > -1) {
      lang = storedLanguage;
    } else if ( ["en", "hy"].indexOf(<string>this.translateService.getBrowserLang()) > -1) {
        lang = <string>this.translateService.getBrowserLang();
    } else {
      lang = "en";
      localStorage.setItem("lang", lang);
    }
    return lang;
  }
}
