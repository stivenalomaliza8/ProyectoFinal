import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Anuncios } from 'src/app/models/interfaces';
import { AnunciosService } from 'src/app/services/anuncios.service';
import { ItemDetailPage } from '../item-detail/item-detail.page';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  categorias:Anuncios[]=[];
  anuncios:Anuncios[]=[];
  constructor(private route:ActivatedRoute,
              private anunciosService:AnunciosService,
              private modalCtrl: ModalController) { }
  id:string = '';
  ngOnInit() {
    this.id=this.route.snapshot.paramMap.get('id')!;
    this.getData();
    
  }
  getData(){
    this.anunciosService.getAnuncios().subscribe((res)=>{
      this.categorias = res.filter((anuncio) => anuncio.tipo === this.id);
    })
  }
  async presentModal(anuncio:Anuncios) {
    const modal = await this.modalCtrl.create({
      component: ItemDetailPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'anuncio': anuncio,
      }
    });
    return await modal.present();
  }
}
