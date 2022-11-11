import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = [];

  cargarMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];

  }


  /* sideBarMenu : any = [
    {
      title : 'Dashboard',
      subtitles : [
        {path : '/',subMenu : 'Dashboard'},
        {path : 'account-settings', subMenu : 'Account-Settings'},
        {path : 'graficas',subMenu : 'Graficas'},
        {path : 'progress',subMenu : 'Progress'}
      ]
    },
    {
      title : 'Mantenimiento',
      subtitles : [
        {path : 'usuarios',subMenu : 'Usuarios'},
        {path : 'medicos', subMenu : 'Medicos'},
        {path : 'hospitales',subMenu : 'Hospitales'}
      ]
    }
  ] */

  constructor() { }


}
