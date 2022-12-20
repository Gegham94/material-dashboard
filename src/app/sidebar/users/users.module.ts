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
import { UserModule } from '../../shared/user/user.module';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UsersRoutes),
    FormsModule,
    MaterialModule,
    TranslateModule,
    PaginationModule,
    UserModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    MultiSelectModule,
  ],
  declarations: [ UsersComponent ],
})
export class UsersModule {}
