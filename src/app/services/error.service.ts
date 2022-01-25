import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }
  error(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'El correo que usted ingreso ya se encuentra registrado.';
      case 'auth/invalid-email':
        return 'El correo que usted ingreso es invalido.';
      case 'auth/user-not-found':
        return 'Por favor revisa tu usuario o tu contraseña.'
      case 'auth/wrong-password':
        return 'Por favor revisa tu usuario o tu contraseña.'
      default:
        return 'Error desconocido';

    }

  }
}