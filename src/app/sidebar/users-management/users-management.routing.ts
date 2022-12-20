import { Routes } from "@angular/router";

import { UsersManagementComponent } from "./users-management.component";

export const AdminModeratorRoutes: Routes = [
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
