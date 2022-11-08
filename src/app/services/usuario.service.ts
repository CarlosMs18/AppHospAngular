import { cargarUsuarios } from './../interfaces/cargar-usuarios.interface';
import { Router } from '@angular/router';
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
  constructor(
    private http : HttpClient,
    private router : Router
  ) { }

  get uid() : string{
    return this.usuario.uid || '';
  }

  get token() : string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers : {
        'x-token': this.token
      }
    }
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

  logout(){
    localStorage.removeItem('token')
    this.router.navigateByUrl('/login');
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

  crearUsuario(data : RegisterForm) {
    return this.http.post(`${this.base_url}/usuarios`, data)
                    .pipe(
                      tap( (resp : any) => {
                        localStorage.setItem('token',resp.token)
                      })
                    )
  }


  verUsuarios(desde : number = 0){
    return this.http.get<cargarUsuarios>(`${this.base_url}/usuarios?desde=${desde}`,this.headers)
          .pipe(
            map(resp => {
              const usuarios = resp.usuarios.map(user => new Usuario(user.nombre,user.email, '',user.img, user.role, user.uid))
              return {
                total : resp.total,
                usuarios
              }
            })
          )
  }


  eliminarUsuario(usuario :Usuario){
    return this.http.delete(`${this.base_url}/usuarios/${usuario.uid}`, this.headers)
  }

  guardarUsuario(usuario : Usuario){

    return this.http.put(`${this.base_url}/usuarios/${usuario.uid}`, usuario, this.headers)

  }
}
