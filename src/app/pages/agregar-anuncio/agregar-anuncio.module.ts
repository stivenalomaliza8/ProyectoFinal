import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarAnuncioPageRoutingModule } from './agregar-anuncio-routing.module';

import { AgregarAnuncioPage } from './agregar-anuncio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarAnuncioPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AgregarAnuncioPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AgregarAnuncioPageModule {}
