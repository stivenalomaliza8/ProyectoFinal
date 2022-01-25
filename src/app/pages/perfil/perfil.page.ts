import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/models/interfaces';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user:Usuario=JSON.parse(localStorage.getItem('usuario') || '{}');
  nombre:string='';
  telefono:string='';
  direccion:string='';

  userNuevo:Usuario={
    nombre:"",
    telefono:"",
    direccion:""
  };
  constructor(   private toastr: ToastrService,private _userService: UserService) { }

  ngOnInit() {
    this.RestablecerDatos();
  }
  RestablecerDatos(){
    this.user=JSON.parse(localStorage.getItem('usuario') || '{}');
    this.nombre=this.user.nombre;
    this.telefono=this.user.telefono;
    this.direccion=this.user.direccion;
  }
  editarDatos(){
    

        if(this.nombre!="" && this.telefono!="" && this.direccion!=""){
          if(this.telefono.length===10){
          this.userNuevo.nombre=this.nombre;
          this.userNuevo.telefono=this.telefono;
          this.userNuevo.direccion=this.direccion;
          this.userNuevo.id=this.user.id;
          this._userService.updateUser(this.userNuevo);
          this.cambiarLocalStorage();
        }else{
          this.mensajeError("Error!!",'Teléfono incorrecto')
        }
        }else{
            this.mensajeError("Error!!",'No se aceptan campos incompletos')
        }
       
  }
  cancelar(){
    this.RestablecerDatos();
    
  }
  cambiarLocalStorage(){
    
      const usuario:Usuario={
        id:this.user.id,
        uid:this.user.uid,
        nombre:this.nombre,
        telefono:this.telefono,
        direccion:this.direccion,
        correo:this.user.correo
      }
      localStorage.setItem('usuario',JSON.stringify(usuario));
      this.RestablecerDatos();
      this.mensajeExito("Operación exitosa","Sus datos han sido actualzados correctamente!")
  }
 
  mensajeError(titulo, mensaje) {
    this.toastr.error(mensaje,titulo);
  }
  mensajeExito(titulo, mensaje) {
    this.toastr.success(mensaje,titulo);
  }
}