import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Anuncios, Usuario } from 'src/app/models/interfaces';
import { AnunciosService } from 'src/app/services/anuncios.service';
import { ToastController } from '@ionic/angular';
import { MapaPage } from '../mapa/mapa.page';
import { element } from 'protractor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agregar-anuncio',
  templateUrl: './agregar-anuncio.page.html',
  styleUrls: ['./agregar-anuncio.page.scss'],
})
export class AgregarAnuncioPage implements OnInit {
  mapa: boolean = false;
  anuncioForm: FormGroup;
  imgs = this.anuncioService.img;
  user: Usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  estados: string[] = ['Malo', 'Bueno','Muy bueno', 'Perfecto'];
  tipos: string[] = ['Terreno', 'Casa', 'Departamento'];

  file1: File;

  lng: string = '';
  lat: string = '';
  ubicacion: string = '';
  constructor(
    private route: Router,
    private modalController: ModalController,
    private fb: FormBuilder,
    private anuncioService: AnunciosService,
    private toastr:ToastrService
  ) {
    this.anuncioForm = this.fb.group({
      titulo: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      anio: [''],
      tipo: ['', [Validators.required]],
      estado: ['sss', [Validators.required]],
      ciudad: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
    });
  }

  ngOnInit() {
   
  }
  cerrar() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
  async agregar() {
    const fecha = this.anuncioForm.get('anio')?.value.substring(0, 4);

    if (this.file1 === undefined) {
      this.alertaError('Se debe incluir al menos 1 imagen');
    } else {
      if (this.lng != undefined) {
 
        
          const anuncioGuardar: Anuncios = {
            uidPer: this.user.uid,
            imagen: [],
            titulo: this.anuncioForm.get('titulo')?.value,
            precio: this.anuncioForm.get('precio')?.value,
            descripcion: this.anuncioForm.get('descripcion')?.value,
            anio: fecha,
            tipo: this.anuncioForm.get('tipo')?.value,
            estado: this.anuncioForm.get('estado')?.value,
            ciudad: this.anuncioForm.get('ciudad')?.value,
            direccion: this.anuncioForm.get('direccion')?.value,
            lat: this.lat,
            lng: this.lng,
            contacto: this.user.telefono,
          };
          this.anuncioService.inserAnuncio(anuncioGuardar);
          this.alertaExito('Anuncio agregado exitosamente');
          this.cerrar();
      } else {
        this.alertaError('Se debe incluir la ubicación');
      }
    }
  }
 
  async chooseFile1(event) {
    if (this.anuncioService.img.length > 5) {
      this.alertaError('Solo se pueden incluir 5 imagenes')
    } else {
      this.file1 = event.target.files[0];
      if (this.file1 != undefined) {
        this.anuncioService.saveImg(this.file1);
      }
    }
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

  }
  alertaExito(mensaje){
    this.toastr.info(mensaje, 'Operación exitosa!');
  }
  alertaError(mensaje){
    this.toastr.error(mensaje, 'Error!');
  }
}
