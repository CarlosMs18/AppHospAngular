import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  sideBarMenu : any = [
    {
      title : 'Dashboard',
      subtitles : [
        {path : '/',subMenu : 'Dashboard'},
        {path : 'account-settings', subMenu : 'Account-Settings'},
        {path : 'graficas',subMenu : 'Graficas'},
        {path : 'progress',subMenu : 'Progress'}
      ]
    }
  ]

  constructor() { }


}
