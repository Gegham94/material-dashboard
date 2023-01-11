import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LanguageComponent } from "./language.component";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatRippleModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [LanguageComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    FormsModule,
  ],
  exports: [LanguageComponent],
})
export class LanguageModule {}
