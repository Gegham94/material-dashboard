import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import PerfectScrollbar from "perfect-scrollbar";
import { AuthService } from "../core/services/auth.service";

declare const $: any;

//Metadata
export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  ab: string;
  type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: "/system/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "dashboard",
  },
  {
    path: "/system/users",
    title: "Users",
    type: "link",
    icontype: "supervisor_account",
  },
  {
    path: "/system/courses",
    title: "Courses",
    type: "link",
    icontype: "auto_stories",
  },
  {
    path: "/system/categories",
    title: "Categories",
    type: "link",
    icontype: "category",
  },
  {
    path: "/system/users-management",
    title: "Users Management",
    type: "link",
    icontype: "person_add_alt",
  },
  {
    path: "/system/documentation",
    title: "Documentation",
    type: "link",
    icontype: "assignment",
  },
  // {
  //   path: "/system/components",
  //   title: "Components",
  //   type: "sub",
  //   icontype: "apps",
  //   collapse: "components",
  //   children: [
  //     { path: "buttons", title: "Buttons", ab: "B" },
  //     { path: "grid", title: "Grid System", ab: "GS" },
  //     { path: "panels", title: "Panels", ab: "P" },
  //     { path: "sweet-alert", title: "Sweet Alert", ab: "SA" },
  //     { path: "notifications", title: "Notifications", ab: "N" },
  //     { path: "icons", title: "Icons", ab: "I" },
  //     { path: "typography", title: "Typography", ab: "T" },
  //   ],
  // },
  // {
  //   path: "/system/forms",
  //   title: "Forms",
  //   type: "sub",
  //   icontype: "content_paste",
  //   collapse: "forms",
  //   children: [
  //     { path: "regular", title: "Regular Forms", ab: "RF" },
  //     { path: "extended", title: "Extended Forms", ab: "EF" },
  //     { path: "validation", title: "Validation Forms", ab: "VF" },
  //     { path: "wizard", title: "Wizard", ab: "W" },
  //   ],
  // },
  // {
  //   path: "/system/tables",
  //   title: "Tables",
  //   type: "sub",
  //   icontype: "grid_on",
  //   collapse: "tables",
  //   children: [
  //     { path: "regular", title: "Regular Tables", ab: "RT" },
  //     { path: "extended", title: "Extended Tables", ab: "ET" },
  //     { path: "datatables.net", title: "Datatables.net", ab: "DT" },
  //   ],
  // },
  // {
  //   path: "/system/maps",
  //   title: "Maps",
  //   type: "sub",
  //   icontype: "place",
  //   collapse: "maps",
  //   children: [
  //     { path: "vector", title: "Vector Map", ab: "VM" },
  //   ],
  // },
  // {
  //   path: "/system/widgets",
  //   title: "Widgets",
  //   type: "link",
  //   icontype: "widgets",
  // },
  // {
  //   path: "/system/charts",
  //   title: "Charts",
  //   type: "link",
  //   icontype: "timeline",
  // },
  // {
  //   path: "/system/calendar",
  //   title: "Calendar",
  //   type: "link",
  //   icontype: "date_range",
  // },
];

@Component({
  selector: "app-sidebar-cmp",
  templateUrl: "sidebar.component.html",
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public isLoading: boolean = false;

  constructor(
    public authService: AuthService,
    private router: Router
  ){}

  public menuItems: any[];
  ps: any;
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemSidebar = <HTMLElement>(
        document.querySelector(".sidebar .sidebar-wrapper")
      );
      this.ps = new PerfectScrollbar(elemSidebar);
    }
  }
  updatePS(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      this.ps.update();
    }
  }
  isMac(): boolean {
    let bool = false;
    if (
      navigator.platform.toUpperCase().indexOf("MAC") >= 0 ||
      navigator.platform.toUpperCase().indexOf("IPAD") >= 0
    ) {
      bool = true;
    }
    return bool;
  }
  logout(): void {
    this.isLoading = true;
    this.authService.logout().subscribe((response) => {
      if (response.success === true) {
        this.isLoading = false;
        this.router.navigate(['']);
      }
    });
  }
}
