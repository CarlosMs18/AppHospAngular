import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountSettingsService {
  public colorPrincipal = document.querySelector('#theme');
  constructor() {}

  seleccionarColor(color: string) {
    const pathColor = `./assets/css/colors/${color}.css`;
    this.colorPrincipal?.setAttribute('href', pathColor);

    localStorage.setItem('color', pathColor);

    this.currentColor();
  }

  currentColor() {
    const selectoColorAll = document.querySelectorAll('.selector');

    selectoColorAll.forEach((color) => {
      color.classList.remove('working');

      const colorActual = this.colorPrincipal?.getAttribute('href');
      const colorIterado = color.getAttribute('data-theme');
      const pathComparation = `./assets/css/colors/${colorIterado}.css`;

      if (colorActual == pathComparation) {
        color.classList.add('working');
      }
    });
  }

  inicializarColor() {
    const colorLocalStorage =
    localStorage.getItem('color') || './assets/css/colors/default-dark.css';
    this.colorPrincipal?.setAttribute('href', colorLocalStorage);
    this.currentColor();
  }
}
