import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.mode';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from './../../services/busquedas.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {
  public usuarios : Usuario[] = [];
  public medicos : Medico[] = [];
  public hospitales :Hospital[] = [];
  constructor(private ActivatedRoute : ActivatedRoute,
              private busquedasService : BusquedasService) { }

  ngOnInit(): void {
    this.ActivatedRoute.params
      .subscribe(({termino}) => this.busquedaGlobal(termino))
  }


  busquedaGlobal(termino  : string){
    this.busquedasService.busquedaGlobal(termino)
              .subscribe((resp : any) => {
                 this.usuarios = resp.usuarios;
                 this.medicos = resp.medicos;
                 this.hospitales = resp.hospitales;
              })
  }

  abrirMedico(medico : Medico){
    console.log(medico)
  }

}
