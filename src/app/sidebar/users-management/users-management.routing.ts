import { Routes } from "@angular/router";

import { UsersManagementComponent } from "./users-management.component";

export const UserRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: UsersManagementComponent,
      },
    ],
  },
];
