import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AllNotificationComponent } from './all-notification.component';
import { MaterialModule } from '../../app.module';

@NgModule({
    imports: [
       RouterModule,
       CommonModule,
       MaterialModule,
       TranslateModule,
        RouterModule.forChild([{ path: '', component: AllNotificationComponent }])
    ],
    declarations: [ AllNotificationComponent ],
    exports: [ AllNotificationComponent ]
})

export class AllNotificationModule {}
