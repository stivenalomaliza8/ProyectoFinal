import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisServiciosPageRoutingModule } from './mis-servicios-routing.module';

import { MisServiciosPage } from './mis-servicios.page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisServiciosPageRoutingModule,
    NgbModule
  ],
  declarations: [MisServiciosPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MisServiciosPageModule {}
4