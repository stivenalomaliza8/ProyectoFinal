import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Anuncios, Usuario } from 'src/app/models/interfaces';
import { AnunciosService } from 'src/app/services/anuncios.service';
import { ItemDetailPage } from '../item-detail/item-detail.page';
@Component({
  selector: 'app-invitado',
  templateUrl: './invitado.page.html',
  styleUrls: ['./invitado.page.scss'],
})
export class InvitadoPage implements OnInit {

  todo: boolean = false;
  anuncios: Anuncios[] = [];
  constructor(
    private anuncioService: AnunciosService,
    private modalCtrl: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    
    this.obtenerTodo();
  }

  obtenerTodo() {
    this.anuncioService.getAnuncios().subscribe((res) => {
      this.anuncios = res;
    });
  }
  async presentModal(anuncio: Anuncios) {
    const modal = await this.modalCtrl.create({
      component: ItemDetailPage,
      cssClass: 'my-custom-class',
      componentProps: {
        anuncio: anuncio,
      },
    });
    return await modal.present();
  }
  categorias(categoria: string) {
    this.router.navigate(['/categorias', categoria]);
  }
  segmentChanged(ev: any) {
    if (ev.detail.value === 'todo') {
      this.todo = true;
    } else {
      this.todo = false;
    }
  }
}
