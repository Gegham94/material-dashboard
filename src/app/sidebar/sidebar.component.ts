import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PublicUser } from "./../core/interfaces/public-user.interface";
// import PerfectScrollbar from "perfect-scrollbar";
import { AuthService } from "../core/services/auth.service";
import { GlobalService } from "../core/services/global.service";
import { SidebarService } from '../core/services/sidebar.service';
import { Subject, takeUntil } from "rxjs";

declare const $: any;

@Component({
  selector: "app-sidebar-cmp",
  templateUrl: "sidebar.component.html",
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  public isLoading: boolean = false;
  public currentUser: PublicUser;
  public destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public authService: AuthService,
    private router: Router,
    private readonly globalService: GlobalService,
    private readonly sidebarService: SidebarService,
  ){}

  public menuItems: any[];
  ps: any;
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  public ngOnInit() {
    this.globalService.currentUserObservable.pipe(takeUntil(this.destroy$))
    .subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.isLoading = false;
      }
    });
    this.menuItems = this.sidebarService.sidebar.filter((menuItem) => menuItem);
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemSidebar = <HTMLElement>(
        document.querySelector(".sidebar .sidebar-wrapper")
      );
      // this.ps = new PerfectScrollbar(elemSidebar);
    }
  }
  
  public updatePS(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      this.ps.update();
    }
  }
  public isMac(): boolean {
    let bool = false;
    if (
      navigator.platform.toUpperCase().indexOf("MAC") >= 0 ||
      navigator.platform.toUpperCase().indexOf("IPAD") >= 0
    ) {
      bool = true;
    }
    return bool;
  }
  public logout(): void {
    this.isLoading = true;
    this.authService.logout().subscribe((response) => {
      if (response.success === true) {
        this.isLoading = false;
        this.router.navigate(['']);
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
