import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { CalendarComponent } from './calendar.component';
import { CalendarRoutes } from './calendar.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CalendarRoutes),
        FormsModule,
        TranslateModule
    ],
    declarations: [CalendarComponent]
})

export class CalendarModule {}
