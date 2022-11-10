import { Hospital } from 'src/app/models/hospital.model';
import { HospitalesService } from './../../../services/hospitales.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {
  public medicoForm !: FormGroup;
  public hospitales : Hospital[] = [];
  constructor(private fb : FormBuilder,
              private hospitalService : HospitalesService) { }

  ngOnInit(): void {
      this.medicoForm= this.fb.group({
        nombre : ['Hernando',Validators.required],
        hospital : ['', Validators.required]
      })

      this.cargarHospitales()
  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales()
        .subscribe(
          {
            next : (hospitales: Hospital[]) => {
                this.hospitales = hospitales;
            }
          }
        )
  }

  guardarMedico(){

  }
}
