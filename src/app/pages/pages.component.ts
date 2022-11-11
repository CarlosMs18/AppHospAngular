import { SidebarService } from 'src/app/services/sidebar.service';
import { Component, OnInit } from '@angular/core';
import { AccountSettingsService } from '../services/account-settings.service';
declare function customInitFunctions():void;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',

})
export class PagesComponent implements OnInit {

  constructor(private accountSettings :AccountSettingsService,
            private SidebarService : SidebarService
        ) { }

  ngOnInit(): void {
    customInitFunctions()
    this.accountSettings.inicializarColor();
    this.SidebarService.cargarMenu()
  }

}
