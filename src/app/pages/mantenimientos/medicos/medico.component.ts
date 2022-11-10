import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Medico } from 'src/app/models/medico.mode';
import { MedicoService } from './../../../services/medico.service';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalesService } from './../../../services/hospitales.service';
import { FormGroup, FormBuilder, Validators, UntypedFormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [],
})
export class MedicoComponent implements OnInit {
  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado!: Hospital;
  public medicoSeleccionado!: Medico;
  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalesService,
    private medicoService: MedicoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarMedico(id);
    });

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital')?.valueChanges.subscribe((hospitalId) => {
      this.hospitalSeleccionado = this.hospitales.find(
        (h) => h._id === hospitalId
      )!;
      console.log(this.hospitalSeleccionado);
    });
  }

  cargarMedico(id: string) {
    if(id === 'nuevo'){
      return;
    }
    this.medicoService.obtenerMedicoporId(id)
    .pipe(
      delay(100)
    )
    .subscribe( {
      next: (medico) => {
        console.log(medico)
        this.medicoSeleccionado = medico;

        this.medicoForm.setValue({
          nombre: medico.nombre,
          hospital: medico.hospital._id,
        });
      },
      error: (err) => {
        console.log(err)
        this.router.navigateByUrl('/dashboard/medicos');
      },
    }

      /* const {
        nombre,
        hospital: { _id },
      } = medico;
      console.log(nombre, _id);
      this.medicoSeleccionado = medico;
      this.medicoForm.setValue({ nombre, hospital: _id }); */
    );
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales().subscribe({
      next: (hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      },
    });
  }

  guardarMedico() {
    const {nombre} = this.medicoForm.value
    if (this.medicoSeleccionado) {
      const data = {
        ...this.medicoForm.value,
        _id : this.medicoSeleccionado._id,

      }


      this.medicoService.actualizarMedico(data)
          .subscribe(resp => {
            Swal.fire('Actualizado', `${nombre}  correctamente`, 'success');
          } )
    } else {
      const { nombre } = this.medicoForm.value;
      this.medicoService.crearMedico(this.medicoForm.value).subscribe({
        next: (resp: any) => {
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
        },
      });
    }
  }
}
