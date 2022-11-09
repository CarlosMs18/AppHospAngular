import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  usuario !: Usuario;
  sideBar : any;
  constructor(private sidebarService : SidebarService,
              private usuarioService : UsuarioService,
              private router : RouterModule) {
    this.sideBar = sidebarService.sideBarMenu;
    this.usuario = this.usuarioService.usuario;

   }

  ngOnInit(): void {
  }


  logout(){
    this.usuarioService.logout()
  }
}
