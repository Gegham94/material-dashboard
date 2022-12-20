import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';

import { CourseComponent } from "./course.component";
import { MaterialModule } from "src/app/app.module";
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    TranslateModule,
    TooltipModule,
    RippleModule,
  ],
  exports: [ CourseComponent ],
  declarations: [CourseComponent],
})
export class CourseModule {}
