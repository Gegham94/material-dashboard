import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layouts/auth/auth-layout.module').then((m) => m.AuthLayoutModule),
  },
  {
    path: 'system',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./sidebar/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'my-profile',
        loadChildren: () => import('./sidebar/my-profile/my-profile.module').then((m) => m.MyProfileModule),
      },
      {
        path: 'change-password',
        loadChildren: () => import('./sidebar/change-password/change-password.module').then((m) => m.ChangePasswordModule),
      },
      {
        path: 'users',
        loadChildren: () => import('./sidebar/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'courses',
        loadChildren: () => import('./sidebar/courses/courses.module').then((m) => m.CoursesModule),
      },
      {
        path: 'categories',
        loadChildren: () => import('./sidebar/categories/categories.module').then((m) => m.CategoriesModule),
      },
      {
        path: "company-trainers",
        loadChildren: () => import("./sidebar/company-trainers/company-trainers.module").then((m) => m.CompanyTrainersModule),
      },
      {
        path: "trainer/:id",
        loadChildren: () => import("./sidebar/trainer/trainer.module").then((m) => m.TrainerModule),
      },
      {
        path: 'notification',
        loadChildren: () => import('./sidebar/all-notification/all-notification.module').then((m) => m.AllNotificationModule),
      },
      {
        path: 'users-management',
        loadChildren: () => import('./sidebar/users-management/users-management.module').then((m) => m.UsersManagementModule),
      },
      {
        path: 'categories-management',
        loadChildren: () => import('./sidebar/categories-management/categories-management.module').then((m) => m.CategoriesManagementModule),
      },
      {
        path: 'basket',
        loadChildren: () => import('./sidebar/basket/basket.module').then((m) => m.BasketModule),
      },
      {
        path: 'wishlist',
        loadChildren: () => import('./sidebar/wishlist/wishlist.module').then((m) => m.WishlistModule),
      },
      // {
      //   path: 'components',
      //   loadChildren: () => import('./sidebar/components/components.module').then((m) => m.ComponentsModule),
      // },
      // {
      //   path: 'forms',
      //   loadChildren: () => import('./sidebar/forms/forms.module').then((m) => m.Forms),
      // },
      // {
      //   path: 'tables',
      //   loadChildren: () => import('./sidebar/tables/tables.module').then((m) => m.TablesModule),
      // },
      // {
      //   path: 'maps',
      //   loadChildren: () => import('./sidebar/maps/maps.module').then((m) => m.MapsModule),
      // },
      // {
      //   path: 'widgets',
      //   loadChildren: () => import('./sidebar/widgets/widgets.module').then((m) => m.WidgetsModule),
      // },
      // {
      //   path: 'charts',
      //   loadChildren: () => import('./sidebar/charts/charts.module').then((m) => m.ChartsModule),
      // },
      // {
      //   path: 'calendar',
      //   loadChildren: () => import('./sidebar/calendar/calendar.module').then((m) => m.CalendarModule),
      // },
      // {
      //   path: "calendar",
      //   loadChildren: () => import("./sidebar/calendar/calendar.module").then((m) => m.CalendarModule),
      // },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/system/dashboard',
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
