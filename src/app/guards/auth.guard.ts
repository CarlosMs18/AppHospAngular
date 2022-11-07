import { UsuarioService } from './../services/usuario.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService : UsuarioService,
              private router : Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){

     return this.usuarioService.validarToken()
            .pipe(
              tap(esAutenticado => {
                 if(!esAutenticado){
                  this.router.navigateByUrl('/login')
                 }
              })
            )

  }

}
