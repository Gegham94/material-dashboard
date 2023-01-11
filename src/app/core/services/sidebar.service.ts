import { Injectable } from '@angular/core';
import { SidebarElem } from '../interfaces/sidebar.interface';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  constructor( ) { }

  private sidebarData: SidebarElem[] = [
    {
      path: "/system/dashboard",
      title: "Dashboard",
      type: "link",
      icontype: "dashboard",
      translateKey: "dashboard.dashboard",
    },
    {
      path: "/system/users",
      title: "Users",
      type: "link",
      icontype: "supervisor_account",
      translateKey: "dashboard.users",
    },
    {
      path: "/system/courses",
      title: "Courses",
      type: "link",
      icontype: "auto_stories",
      translateKey: "dashboard.courses",
    },
    {
      path: "/system/categories",
      title: "Categories",
      type: "link",
      icontype: "category",
      translateKey: "dashboard.categories",
    },
    {
      path: "/system/company-trainers",
      title: "Company trainers",
      type: "link",
      icontype: "supervisor_account",
      translateKey: "dashboard.company-trainers",
    },
    {
      path: "/system/notification",
      title: "Notification",
      type: "link",
      icontype: "notifications",
      translateKey: "global.header.header-notification.notifications",
    },
    // {
    //   path: "/system/documentation",
    //   title: "Documentation",
    //   type: "link",
    //   icontype: "assignment",
    //   translateKey: "dashboard.documentation",
    // },
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
    {
      path: "/system/basket",
      title: "Baskets",
      type: "link",
      icontype: "shopping_basket",
      translateKey: "dashboard.baskets",
    },
    {
      path: "/system/wishlist",
      title: "Wishlists",
      type: "link",
      icontype: "star_border",
      translateKey: "dashboard.wishlist",
    },
  ];

  get sidebar(): SidebarElem[] {
    return this.sidebarData;
  }
}
