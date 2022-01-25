import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';

import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/models/interfaces';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  imgPerfil = '../../assets/usaurios/sin-foto.svg';
  registerForm: FormGroup;
  loading = false;
  user: Usuario = {
    nombre: '',
    telefono: '',
    correo: '',
    clave: '',
    direccion: '',
  };
  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private route: Router,
    private _errorService: ErrorService,
    private toastr: ToastrService,
    private _userService: UserService
  ) {
    this.registerForm = this.fb.group(
      {
        nombre: ['', [Validators.required]],
        telefono: ['', [Validators.required]],
        direccion: ['', [Validators.required]],
        correo: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repetirPassword: ['', [Validators.required]],
      },
      { validators: this.checkPassword }
    );
  }

  ngOnInit() {}
  registrar() {
    this.user.nombre = this.registerForm.get('nombre')?.value;
    this.user.telefono = this.registerForm.get('telefono')?.value;
    this.user.direccion = this.registerForm.get('direccion')?.value;
    this.user.clave = this.registerForm.get('password')?.value;
    this.user.correo = this.registerForm.get('correo')?.value;
    if (this.user.nombre === '') {
      this.alertaError('Ingrese un nombre');
    } else if (this.user.telefono.length != 10) {
      this.alertaError('Ingrese un número teléfonico valido');
    }else if(this.user.direccion===''){
      this.alertaError('Ingrese una dirección');
    } else if (!this.validarEmail(this.user.correo)) {
      this.alertaError('Ingrese un correo valido');
    } else if (this.checkPassword(this.registerForm)) {
     
      this.afAuth
        .createUserWithEmailAndPassword(this.user.correo, this.user.clave)
        .then((rta) => {
          rta.user?.sendEmailVerification();
          this.user.uid = rta.user.uid;
          this._userService.inserUser(this.user);
          this.alertaExito(
            'Registro exitoso. \nRevisa tu corrro para verificar la cuenta.'
          );
          this.route.navigate(['/login']);
        })
        .catch((error) => {
         
          this.loading = false;
          this.alertaError(this._errorService.error(error.code));
        });
    }else{
      this.alertaError('Las contraseñas no coinciden');
    }
  }

  checkPassword(group: FormGroup): any {
    const pass = group.controls.password?.value;
    const confirmarPass = group.controls.repetirPassword?.value;
    return pass === confirmarPass ? true : false;
  }

  alertaExito(mensaje) {
    this.toastr.info(mensaje, 'Operación exitosa!');
  }
  alertaError(mensaje) {
    this.toastr.error(mensaje, 'Error!');
  }
  validarEmail(email) {
    var EMAIL_REGEX =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(EMAIL_REGEX)) {
      return true;
    } else {
      return false;
    }
  }
}
