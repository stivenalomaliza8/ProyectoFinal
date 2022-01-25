import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificarPageRoutingModule } from './verificar-routing.module';

import { VerificarPage } from './verificar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificarPageRoutingModule
  ],
  declarations: [VerificarPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VerificarPageModule {}
