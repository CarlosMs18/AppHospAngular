import Swal from 'sweetalert2';
import { cargarUsuarios } from './../../../interfaces/cargar-usuarios.interface';
import { BusquedasService } from './../../../services/busquedas.service';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {
  public totalUsuarios : number = 0;
  public usuarios : Usuario[] = []
  public usuariosTemp : Usuario[] = []
  public desde : number = 0;
  public cargando : boolean = true;
  constructor(
    private usuarioService :UsuarioService,
    private busquedaService : BusquedasService
    ) { }

  ngOnInit(): void {
      this.obtenerUsuarios();
  }


  cambiarPagina(valor : number){
    this.desde += valor;
    if(this.desde < 0){
      this.desde = 0
    }else if(this.desde > this.totalUsuarios){
      this.desde -= valor;
    }

    this.obtenerUsuarios();
  }

  buscarTermino(valor : string){
    if(valor.length === 0){
      return (this.usuarios = this.usuariosTemp);
    }else{
      this.busquedaService.buscar('usuarios', valor)
            .subscribe((resp : any)=> {
                this.usuarios = resp;
            })
    }
  }


  cambiarRole(usuario : Usuario){
    this.usuarioService.guardarUsuario(usuario)
                    .subscribe( resp =>{
                    console.log(resp)
                  })
  }

  obtenerUsuarios(){
    this.usuarioService.verUsuarios(this.desde)
        .subscribe(
          {
            next  : ({total, usuarios}) => {
              this.totalUsuarios = total;
              this.usuariosTemp = usuarios;
              this.usuarios = usuarios
              this.cargando = false
            }
          }
        )

  }

  eliminar(usuario :Usuario){
    if(this.usuarioService.uid === usuario.uid){
        return Swal.fire('Error','No se puede eliminar a ud mismo mientras esta en sesion!')
    }

    Swal.fire({
      title: 'Are you sure?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,

      confirmButtonText: 'Si, Borrarlo',
    }).then((result) => {
      if (result.value) {
        this.usuarioService.eliminarUsuario(usuario).subscribe((resp) => {
          this.obtenerUsuarios();
          Swal.fire(
            'Usuario borrado',
            `${usuario.nombre} fue eliminado correctamente`,
            'success'
          );
        });
      }
    });

  }

}
