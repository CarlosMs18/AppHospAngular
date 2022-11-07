import { Component, OnInit } from '@angular/core';
import { AccountSettingsService } from '../services/account-settings.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',

})
export class PagesComponent implements OnInit {

  constructor(private accountSettings :AccountSettingsService) { }

  ngOnInit(): void {
    this.accountSettings.inicializarColor();
  }

}
