import { PaginationModule } from '../../shared/pagination/pagination.module';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../../app.module";
import { TranslateModule } from '@ngx-translate/core';
import { UsersComponent } from "./users.component";
import { UsersRoutes } from "./users.routing";
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UsersRoutes),
    FormsModule,
    MaterialModule,
    TranslateModule,
    PaginationModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    MultiSelectModule,
    TooltipModule,
  ],
  declarations: [ UsersComponent ],
})
export class UsersModule {}
