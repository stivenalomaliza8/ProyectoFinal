import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { Anuncios, Usuario } from 'src/app/models/interfaces';
import { AnunciosService } from 'src/app/services/anuncios.service';

import { MapaPage } from '../mapa/mapa.page';
@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  @Input() anuncio: Anuncios;
  mapa: boolean = false;
  user: Usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  estados: string[] = ['Malo', 'Bueno', 'Excelente'];
  tipos: string[] = ['Casa', 'Departamento', 'Terreno'];
  file1: File;
  file2: File;
  file3: File;
  file4: File;
  file5: File;
  loading = false;
  lng: string = '';
  lat: string = '';
  ubicacion: string = '';
  titulo = '';
  precio = 0;
  descripcion = '';
  anio = '';
  tipo = '';
  estado = '';
  ciudad = '';
  direccion = '';

  constructor(
    private route: Router,
    private modalController: ModalController,
    private anuncioService: AnunciosService,
    private toastr:ToastrService
  ) {}
  ngOnInit() {
    this.anuncioService.img = this.anuncio.imagen;
    this.titulo = this.anuncio.titulo;
    this.precio = this.anuncio.precio;
    this.descripcion = this.anuncio.descripcion;
    this.anio = this.anuncio.anio;
    this.tipo = this.anuncio.tipo;
    this.estado = this.anuncio.estado;
    this.ciudad = this.anuncio.ciudad;
    this.direccion = this.anuncio.direccion;
    this.lat = this.anuncio.lat;
    this.lng = this.anuncio.lng;
  }
  cerrar() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
  async editar() {
    if(this.anuncioService.img.length>0){

  
    if (
      this.titulo != '' &&
      this.precio.toString() != '' &&
      this.descripcion != '' &&
      this.anio != '' &&
      this.tipo != '' &&
      this.estado != '' &&
      this.ciudad != '' &&
      this.direccion != '' &&
      this.lat != '' &&
      this.lng != ''
    ) {
      if (this.lng != undefined) {
        const anuncioGuardar: Anuncios = {
          uidPer: this.user.uid,
          id: this.anuncio.id,
          titulo: this.titulo,
          precio: 10,
          descripcion: this.descripcion,
          anio: this.anio,
          tipo: this.tipo,
          estado: this.estado,
          ciudad: this.ciudad,
          direccion: this.direccion,
          lat: this.lat,
          lng: this.lng,
          contacto: this.user.telefono,
        };
        this.anuncioService.updateAnuncio(anuncioGuardar);
        this.loading = false;
        this.alertaExito('El anuncio a sido editado exitosamente');
        this.cerrar();
      } else {
        this.alertaError('Agregar ubicación');
      }
    } else {
      this.alertaError('Por favor, se deben llenar todos los datos');
    }
  }else{
    this.alertaError('Se debe incluir una imagen');
  }
  }

  chooseFile1(event) {
    this.file1 = event.target.files[0];
    this.anuncioService.saveImg(this.file1);
  }

 
  async presentModal() {
    const modal = await this.modalController.create({
      component: MapaPage,
      cssClass: 'my-custom-class',
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    /* Si no regreso es undefined */
    this.lng = data.lng;
    this.lat = data.lat;
    if (this.lng != undefined) {
      const coordenadas = JSON.parse(
        localStorage.getItem('coordenadas') || '{}'
      );
      this.ubicacion = coordenadas.lng + ' : ' + coordenadas.lat;
      this.lng = coordenadas.lng;
      this.lat = coordenadas.lat;
    } else {
      this.ubicacion = '';
    }
  }
  eliminar(img){
    this.anuncioService.img = this.anuncioService.img.filter((element) => element != img);
    console.log(this.anuncioService.img)
  }
  alertaExito(mensaje){
    this.toastr.info(mensaje, 'Operación exitosa!');
  }
  alertaError(mensaje){
    this.toastr.error(mensaje, 'Error!');
  }
}
