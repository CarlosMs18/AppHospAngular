import Swal from 'sweetalert2';
import { BusquedasService } from './../../../services/busquedas.service';
import { HospitalesService } from './../../../services/hospitales.service';
import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [],
})
export class HospitalesComponent implements OnInit {
  public cargando: boolean = true;
  public hospitales: Hospital[] = [];
  public hospitalTemp: Hospital[] = [];
  constructor(
    private hospitalService: HospitalesService,
    private busquedaService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.cargarHospitales();
  }

  buscarHospital(valor: string) {
    if (valor.length === 0) {
      this.hospitales = this.hospitalTemp;
    }

    this.busquedaService.buscar('hospitales', valor).subscribe({
      next: (hospitales) => {
        this.hospitales = hospitales as Hospital[];
      },
    });
  }

  cargarHospitales() {
    this.cargando = false;
    this.hospitalService.cargarHospitales().subscribe({
      next: (hospitales) => {
        this.hospitales = hospitales;
        this.hospitalTemp = hospitales;
      },
    });
  }

  eliminarHospital(hospital: Hospital) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Esta a punto de borrar a ${hospital.nombre}`,
      icon: 'question',
      showCancelButton: true,

      confirmButtonText: 'Si, Borrarlo',
    }).then((result) => {
      if (result.value) {
        this.hospitalService.eliminarHospital(hospital).subscribe((resp) => {
          this.cargarHospitales();
          Swal.fire(
            'Usuario borrado',
            `${hospital.nombre} fue eliminado correctamente`,
            'success'
          );
        });
      }
    });
  }


  guardarCambios(hospital : Hospital){
    this.hospitalService.actualizarHospital(hospital)
          .subscribe(
               {
                next : (resp) =>{
                    Swal.fire('Actualizado', hospital.nombre ,'success');
                }
               }
          )
  }

  async abrirSweetAlert(){
    const {value = ''} = await Swal.fire<string>({
      title : 'Crear Hospital',
      text : 'Ingrese el nombre del nuevo hospital',
      input: 'text',

      inputPlaceholder: 'Nombre del Hospital',
      showCancelButton : true
    })

    if(value.trim().length > 0){
      console.log('e')
        this.hospitalService.crearHospital(value)
            .subscribe( (resp : any) => {

              this.hospitales.push(resp.hospitalDB)
            })
    }

  }
}
