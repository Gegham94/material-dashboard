import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { MapsRoutes } from './maps.routing';

import { VectorMapsComponent } from './vectormaps/vectormaps.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MapsRoutes),
    FormsModule,
    TranslateModule
  ],
  declarations: [
      VectorMapsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MapsModule {}
