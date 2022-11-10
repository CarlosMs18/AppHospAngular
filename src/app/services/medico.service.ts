import { map } from 'rxjs';
import { Medico } from './../models/medico.mode';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private base_url = environment.base_url;
  constructor(private http : HttpClient) { }

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

  crearMedico(medico : {nombre : string, hospital : string}){
      const url = `${this.base_url}/medicos`;
      return this.http.post(url,medico, this.headers)
  }

  cargarMedicos(){
    return this.http.get<{ok : boolean, medicos: Medico[]}>(`${this.base_url}/medicos` ,this.headers)
            .pipe(
              map((resp : {ok : boolean, medicos : Medico[]}) => resp.medicos)
            )


  }

  obtenerMedicoporId(id : string){
    const url = `${this.base_url}/medicos/${id}`;
    return this.http.get(url, this.headers)
            .pipe(
              map((resp : {ok: boolean, medico : Medico}) => resp.medico)
            )
 }

 actualizarMedico(medico : Medico){
  const url = `${this.base_url}/medicos/${medico._id}`;
  return this.http.put(url, medico, this.headers)
 }

 borrarMedico(_id : string){
  const url = `${this.base_url}/medicos/${_id}`
  return this.http.delete(url, this.headers)
 }
}
