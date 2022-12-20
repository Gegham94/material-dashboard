import { Routes } from "@angular/router";

import { CoursesComponent } from "./courses.component";
import {VerificationComponent} from "../../shared/verification/verification.component";

export const CoursesRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: CoursesComponent,
      },
      {
        path: "verification/:id",
        children: [
          {
            path: "",
            component: VerificationComponent,
          },
        ],
      },
    ],
  },

];
