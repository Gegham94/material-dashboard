import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageModule } from '../../shared/language/language.module';

import { NavbarComponent } from './navbar.component';
import { NotificationModule } from '../notifications/notification.module';
@NgModule({
    imports: [ RouterModule, CommonModule, TranslateModule, LanguageModule, NotificationModule ],
    declarations: [ NavbarComponent ],
    exports: [ NavbarComponent ]
})

export class NavbarModule {}
