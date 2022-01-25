import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapaCoordenadasPage } from './mapa-coordenadas.page';

const routes: Routes = [
  {
    path: '',
    component: MapaCoordenadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapaCoordenadasPageRoutingModule {}
