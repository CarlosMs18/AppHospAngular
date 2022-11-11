import { UsuarioService } from './../services/usuario.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private usuarioService : UsuarioService,
              private router : Router){}
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.usuarioService.validarToken()
    .pipe(
      tap(esAutenticado => {
         if(!esAutenticado){
          this.router.navigateByUrl('/login')
         }
      })
    )
  }

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
