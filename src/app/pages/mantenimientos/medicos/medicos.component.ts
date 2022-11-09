import { MedicoService } from './../../../services/medico.service';
import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.mode';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {
  public cargando : boolean = true;
  public medicos : Medico[] = []
  constructor(
    private medicoService : MedicoService
  ) { }

  ngOnInit(): void {
    this.cargarMedico();

  }

  cargarMedico(){
   this.cargando = false;
   this.medicoService.cargarMedicos()
    .subscribe(
      {
        next : (medicos)  =>{
          console.log(medicos)
          this.medicos = medicos
        }
      }
    )
  }

}
