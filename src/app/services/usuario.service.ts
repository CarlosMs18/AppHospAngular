import { loginForm } from './../interfaces/login-form.interface';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable , tap, map , catchError, of} from 'rxjs'
import { RegisterForm } from '../interfaces/registro-form.interface';
import { Usuario } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private base_url = environment.base_url;
  public usuario !: Usuario
  constructor(private http : HttpClient) { }

  get token() : string{
    return localStorage.getItem('token') || '';
  }

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

  validarToken() /* : Observable<boolean> */ {
    return this.http.get(`${this.base_url}/login/renew`,{

        headers : {
          'x-token' : this.token
        }
    }).pipe(
        map((resp : any) =>{

            const {email, nombre, role, uid, img = ''} = resp.usuario;
            this.usuario  = new Usuario(nombre, email, '' , img, role,uid)
            localStorage.setItem('token',resp.token)
            return true
        }),
        catchError(error => of(false))

    )
  }
}
