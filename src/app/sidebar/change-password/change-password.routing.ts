import { Routes } from "@angular/router";
import { ChangePasswordComponent } from "./change-password.component";

export const ChangePasswordRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: ChangePasswordComponent,
      }
    ],
  },

];
