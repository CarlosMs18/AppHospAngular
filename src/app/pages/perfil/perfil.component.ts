import Swal  from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from './../../services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {
  public usuario !: Usuario
  public perfilForm !: FormGroup
  constructor(
    private fb : FormBuilder,

    private usuarioService : UsuarioService
  ) {

    this.usuario = usuarioService.usuario;
    console.log(this.usuario);
   }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre : [this.usuario.nombre, Validators.required],
      email : [this.usuario.email,Validators.required],

   })
  }
  actualizarPerfil(){
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
        .subscribe(
          {
            next : data => {
              const {nombre , email} = this.perfilForm.value
              this.usuario.nombre = nombre;
              this.usuario.email = email;
              Swal.fire('Guardado','Cambios fueron guardados','success')
            },
            error : (error) => {
              Swal.fire('Error',error.error.msg, 'error')
            }
          }
        )





  }

}
