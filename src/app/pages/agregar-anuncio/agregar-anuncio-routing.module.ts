import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarAnuncioPage } from './agregar-anuncio.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarAnuncioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarAnuncioPageRoutingModule {}
