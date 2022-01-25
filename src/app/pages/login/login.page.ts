import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ErrorService } from 'src/app/services/error.service';
import { Usuario } from 'src/app/models/interfaces';
import { UserService } from 'src/app/services/user.service';

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuarios:Usuario[]=[];

  user:Usuario=JSON.parse(localStorage.getItem('usuario') || '{}');

  loginForm: FormGroup;

  loading = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private _errorService: ErrorService,
    private route: Router,
    public toastController: ToastController,
    private _userService: UserService,
    private router: Router,
    private toastr: ToastrService
    ) {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {}
  login() {
    const usaurio = this.loginForm.get('usuario')?.value;
    const pass = this.loginForm.get('password')?.value;
    this.loading = true;
    this.afAuth.signInWithEmailAndPassword(usaurio, pass)
      .then((respuesta) => {
        if (!respuesta.user?.emailVerified) {
          this.route.navigate(['/verificar']);
        } else {
        this.setLocalStorage(respuesta.user);
         this.route.navigate(['/home']);
        }
        this.loading = false;

      }, error => {
        this.loading = false;
        this.alertaError(this._errorService.error(error.code));
      })
  }
  async setLocalStorage(user:any){
 await this._userService.getUsers().subscribe(res =>
  {
    this.usuarios=res;
      res.forEach(elemet => {
      if(elemet.uid===user.uid){
        const usuario:Usuario={
          id:elemet.id,
          uid:user.uid,
          nombre:elemet.nombre,
          telefono:elemet.telefono,
          correo:user.email,
          direccion:elemet.direccion,
        }
     
        localStorage.setItem('usuario',JSON.stringify(usuario));
      
        return;
      }
    });  

  })
     
     
  }
 
  alertaExito(mensaje){
    this.toastr.info(mensaje, 'Operación exitosa!');
  }
  alertaError(mensaje){
    this.toastr.error(mensaje, 'Error!');
  }
}
