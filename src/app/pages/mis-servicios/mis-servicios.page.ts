import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { Anuncios, Usuario } from 'src/app/models/interfaces';

import { AnunciosService } from 'src/app/services/anuncios.service';
import { AgregarAnuncioPage } from '../agregar-anuncio/agregar-anuncio.page';
import { EditarPage } from '../editar/editar.page';

@Component({
  selector: 'app-mis-servicios',
  templateUrl: './mis-servicios.page.html',
  styleUrls: ['./mis-servicios.page.scss'],
})

export class MisServiciosPage implements OnInit {
  active=1;
  user:Usuario=JSON.parse(localStorage.getItem('usuario') || '{}');
  constructor(
    private modalCtrl: ModalController,
    private anuncioService: AnunciosService,
    public alertController: AlertController,
    public actionSheetController: ActionSheetController
  ) { }
    anuncios:Anuncios[]=[];
  ngOnInit() {
    this.getAll();
    this.active=1;
  }
  async presentModal(){
    const modal = await this.modalCtrl.create({
            component: AgregarAnuncioPage,
      cssClass: 'my-custom-class',
    });
    return await modal.present();
  }
  getAll(){
    this.anuncioService.getAnuncios().subscribe((res) => {
      this.anuncios=res.filter(element => element.uidPer === this.user.uid);
    });
  }
  async eliminar(id:string){
 
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Aviso',
        message: 'La publicación se eliminara, desea continuar?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
             
            }
          }, {
            text: 'Si',
            handler: () => {
              this.anuncioService.deleteAnuncio(id);
            }
          }
        ]
      });
  
      await alert.present();
    
  }
  async editar(anuncio:Anuncios){
    const modal = await this.modalCtrl.create({
      component: EditarPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'anuncio': anuncio,
      }
    });
    return await modal.present();
  }
  async presentActionSheet(anuncio:Anuncios) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.eliminar(anuncio.id);
        }
      }, {
        text: 'Editar',
        icon: 'pencil',
        handler: () => {
         this.editar(anuncio);
        }
      },{
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
