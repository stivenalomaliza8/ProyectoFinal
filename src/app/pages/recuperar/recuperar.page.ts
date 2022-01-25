import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  recuperarForm: FormGroup;
  loading = false;
  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private route: Router,
    private toastr: ToastrService,
    private _errorService: ErrorService
  ) {
    this.recuperarForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}
  recuperarPassword() {
    const usuario = this.recuperarForm.get('usuario')?.value;
    if (this.validarEmail(usuario)) {
      this.afAuth
        .sendPasswordResetEmail(usuario)
        .then(() => {
          this.mensajeExito(
            'Operación exitosa',
            'Revisa tu correo electronico para restableces tu contraseña.'
          );
          this.route.navigate(['/login']);
        })
        .catch((error) => {
          this.mensajeError('Error!!', this._errorService.error(error.code));
          this.loading = false;
          this.recuperarForm.reset();
        });
    }else{
      this.mensajeError('Error!!', 'Correo invalido');
    }
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
  mensajeError(titulo, mensaje) {
    this.toastr.error(mensaje, titulo);
  }
  mensajeExito(titulo, mensaje) {
    this.toastr.success(mensaje, titulo);
  }
}
