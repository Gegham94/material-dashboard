import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyTrainersComponent } from './company-trainers.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: CompanyTrainersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyTrainersRoutingModule { }
