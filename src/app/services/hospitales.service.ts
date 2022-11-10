import { map } from 'rxjs';
import { Hospital } from './../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {
  private base_url = environment.base_url;
  constructor(
      private http : HttpClient
  ) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }



  get headers(){
    return {
      headers : {
        'x-token' : this.token
      }
    }
  }
  crearHospital(nombre : string){
    const url = `${this.base_url}/hospitales`;
    return this.http.post(url, {nombre}, this.headers)
  }

  cargarHospitales(){
    const url = `${this.base_url}/hospitales`;
    return this.http.get<{ok : boolean , hospitales : Hospital[]}>(url,this.headers )
        .pipe(
          map((resp : {ok : boolean, hospitales : Hospital[]}) => resp.hospitales)
        )
  }

  eliminarHospital(hospital : Hospital){
    const url = `${this.base_url}/hospitales/${hospital._id}`;
    return this.http.delete(url , this.headers);
  }

  actualizarHospital(hospital : Hospital){
    const url = `${this.base_url}/hospitales/${hospital._id}`;
    return this.http.put(url, hospital , this.headers)
  }
}
