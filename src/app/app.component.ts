import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UtilService } from './util.service';
import { menuController } from '@ionic/core';
import { Router } from '@angular/router';
import { Usuario } from './models/interfaces';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  public isMenuEnabled:boolean = true; 
  public selectedIndex = 0;
  user:Usuario=JSON.parse(localStorage.getItem('usuario') || '{}');
  constructor(
   
    private router: Router,
  ) {
   
  }

  
  ngOnInit() {
    this.selectedIndex = 1;
    
   
  }

  navigate(path, selectedId) {
    this.selectedIndex = selectedId;
    this.router.navigate([path]);
  }

  close() {
    menuController.toggle();
  }
}
