import { HospitalesService } from './../../../services/hospitales.service';
import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {
  public cargando : boolean = true;
  public hospitales : Hospital[] = []
  constructor(
    private hospitalService : HospitalesService
  ) { }

  ngOnInit(): void {
    this.cargarHospitales();
  }


  cargarHospitales(){
    this.cargando = false
    this.hospitalService.cargarHospitales()
        .subscribe(
           {
            next : (hospitales) => {
              this.hospitales = hospitales
              console.log(this.hospitales)
            }
           }
        )
  }
}
