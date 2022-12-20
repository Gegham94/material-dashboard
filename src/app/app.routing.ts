import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./core/guards";

import { AdminLayoutComponent } from "./layouts/admin/admin-layout.component";

export const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./layouts/auth/auth-layout.module").then((m) => m.AuthLayoutModule),
  },
  {
    path: "system",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "dashboard",
      },
      {
        path: "dashboard",
        loadChildren: () => import("./sidebar/dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "users",
        loadChildren: () => import("./sidebar/users/users.module").then((m) => m.UsersModule),
      },
      {
        path: "categories",
        loadChildren: () => import("./sidebar/categories/categories.module").then((m) => m.CategoriesModule),
      },
      {
        path: "courses",
        loadChildren: () => import("./sidebar/courses/courses.module").then((m) => m.CoursesModule),
      },
      {
        path: "users-management",
        loadChildren: () => import("./sidebar/users-management/users-management.module").then((m) => m.UsersManagementModule),
      },
      {
        path: "components",
        loadChildren: () => import("./sidebar/components/components.module").then((m) => m.ComponentsModule),
      },
      {
        path: "forms",
        loadChildren: () => import("./sidebar/forms/forms.module").then((m) => m.Forms),
      },
      {
        path: "tables",
        loadChildren: () => import("./sidebar/tables/tables.module").then((m) => m.TablesModule),
      },
      {
        path: "maps",
        loadChildren: () => import("./sidebar/maps/maps.module").then((m) => m.MapsModule),
      },
      {
        path: "widgets",
        loadChildren: () => import("./sidebar/widgets/widgets.module").then((m) => m.WidgetsModule),
      },
      {
        path: "charts",
        loadChildren: () => import("./sidebar/charts/charts.module").then((m) => m.ChartsModule),
      },
      {
        path: "calendar",
        loadChildren: () => import("./sidebar/calendar/calendar.module").then((m) => m.CalendarModule),
      }
    ],
    canActivate: [AuthGuard],
  },
  {
    path: "**",
    redirectTo: "/system/dashboard",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'top',
      onSameUrlNavigation: 'ignore',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}