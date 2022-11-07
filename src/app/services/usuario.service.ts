import { loginForm } from './../interfaces/login-form.interface';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable , tap} from 'rxjs'
import { RegisterForm } from '../interfaces/registro-form.interface';
import { Usuario } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private base_url = environment.base_url;
  constructor(private http : HttpClient) { }

  crearUsuario(data : RegisterForm) {
    return this.http.post(`${this.base_url}/usuarios`, data)
                    .pipe(
                      tap( (resp : any) => {
                        localStorage.setItem('token',resp.token)
                      })
                    )
  }

  login(data : loginForm){
    return this.http.post(`${this.base_url}/login`,data)
              .pipe(
                tap(
                  ((resp : any) => {
                    localStorage.setItem('token',resp.token)
                  })
                )
              )
  }
}
