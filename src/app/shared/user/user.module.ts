import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';

import { UserComponent } from "./user.component";
import { MaterialModule } from "src/app/app.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    TranslateModule
  ],

  exports: [ UserComponent ],
  declarations: [UserComponent],
})
export class UserModule {}
