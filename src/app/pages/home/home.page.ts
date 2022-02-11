import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Anuncios, Usuario } from 'src/app/models/interfaces';
import { AnunciosService } from 'src/app/services/anuncios.service';
import { ItemDetailPage } from '../item-detail/item-detail.page';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user: Usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  todo: boolean = false;
  anuncios: Anuncios[] = [];
  constructor(
    private anuncioService: AnunciosService,
    private modalCtrl: ModalController,
    private router: Router,
    private menu: MenuController
  ) {}
  active = 1;
  ngOnInit() {
    this.active=1;
    this.obtenerTodo();
  }
  openMenu() {
    this.menu.enable(true, 'first');
    this.menu.open();
  }
  openEnd() {
    this.menu.open('end');
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
  nav(direccion){
    this.router.navigate([`/${direccion}`])
  }
}
