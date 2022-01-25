import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapaCoordenadasPageRoutingModule } from './mapa-coordenadas-routing.module';

import { MapaCoordenadasPage } from './mapa-coordenadas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapaCoordenadasPageRoutingModule
  ],
  declarations: [MapaCoordenadasPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MapaCoordenadasPageModule {}
