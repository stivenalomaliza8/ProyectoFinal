import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verificar',
  templateUrl: './verificar.page.html',
  styleUrls: ['./verificar.page.scss'],
})
export class VerificarPage implements OnInit {

  constructor(
    private route: Router,
  ) { }

  ngOnInit() {
  }
  volver(){
    this.route.navigate(['/login']);
  }
}
