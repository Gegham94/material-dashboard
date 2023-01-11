import { Routes } from "@angular/router";

import { CategoriesManagementComponent } from "./categories-management.component";

export const CategoryRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: CategoriesManagementComponent,
      },
    ],
  },
];
