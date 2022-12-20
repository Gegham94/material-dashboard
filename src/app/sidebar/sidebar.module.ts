import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { SidebarComponent } from './sidebar.component';
import { MaterialModule } from '../app.module';
@NgModule({
    imports: [ RouterModule, CommonModule, MaterialModule, TranslateModule ],
    declarations: [ SidebarComponent ],
    exports: [ SidebarComponent ]
})

export class SidebarModule {}
