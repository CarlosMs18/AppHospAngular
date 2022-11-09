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

  cargarMedicos(){
    return this.http.get<{ok : boolean, medicos: Medico[]}>(`${this.base_url}/medicos` ,this.headers)
            .pipe(
              map((resp : {ok : boolean, medicos : Medico[]}) => resp.medicos)
            )


  }
}
