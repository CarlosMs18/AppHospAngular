import { Component, OnInit } from '@angular/core';
import { AccountSettingsService } from 'src/app/services/account-settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  /* public colorPrincipal  = document.querySelector('#theme') */

  constructor(private accountSettings : AccountSettingsService) {

   }

  ngOnInit(): void {

  }

  seleccionarColor(color : string){

    this.accountSettings.seleccionarColor(color)


  }


}
