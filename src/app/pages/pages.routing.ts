import { Routes } from "@angular/router";

import { PricingComponent } from "./pricing/pricing.component";
import { LoginComponent } from "./login/login.component";

export const PagesRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "pricing",
        component: PricingComponent,
      },
    ],
  },
];
