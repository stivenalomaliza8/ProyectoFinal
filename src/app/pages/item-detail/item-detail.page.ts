import { Component, Input, OnInit } from '@angular/core';
import { AnimationController, ModalController } from '@ionic/angular';
import { Anuncios } from 'src/app/models/interfaces';
import { MapaCoordenadasPage } from '../mapa-coordenadas/mapa-coordenadas.page';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage implements OnInit {
  selectedSize: number;
  selectedColor: number;
  activeVariation: string;
  usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  @Input() anuncio: Anuncios;
  constructor(
    private animatioCntrl: AnimationController,
    private modalCtrl: ModalController,
    private iab: InAppBrowser

  ) { }
  numero='593';
  ngOnInit() {
    this.activeVariation = 'size';
   this.numero=this.numero.toString() + Number(this.anuncio.contacto).toString();
  }

  
  cerrar(){
this.modalCtrl.dismiss();
  }
  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: MapaCoordenadasPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'lng': this.anuncio.lng,
        'lat':this.anuncio.lat,
      }
    });
    return await modal.present();
  }
  enviarMensaje(){
    const texto='Saludos cordiales vi su publicación de ' + this.anuncio.titulo + ' y me gustaria comprarla';
    let url = 'https://wa.me/' + this.numero + '?text=' + texto;
   const browser = this.iab.create(url,'_system'); 
  }
}
