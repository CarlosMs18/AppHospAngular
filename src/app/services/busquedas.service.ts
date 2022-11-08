import { Usuario } from 'src/app/models/usuario.model';
import { map } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {
  private base_url = environment.base_url
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

  private transformarUsuarios(resultados : any[]) : Usuario[]{
    return resultados.map(
      user => new Usuario(user.nombre, user.email, '',user.img , user.role, user.uid )
    )
  }

  buscar(
    tipo : 'usuarios' | 'medicos' | 'hospitales',
     termino : string){

      const url= `${this.base_url}/todo/coleccion/${tipo}/${termino}`;
      return this.http.get(url, this.headers)
          .pipe(
            map((resp : any)=> {
              switch(tipo){
                case 'usuarios' :
                  return this.transformarUsuarios(resp.resultados)
              }
            })
          )


  }
}
