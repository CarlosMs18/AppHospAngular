import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { PerfilComponent } from './perfil/perfil.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { AuthGuard } from './../guards/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { GraficasComponent } from './graficas/graficas.component';
import { ProgressComponent } from './progress/progress.component';




const routes: Routes = [
  {
    path : 'dashboard',
    component : PagesComponent,
    canActivate : [AuthGuard],
    children : [
      {path : '',component : DashboardComponent, data : {title : 'Dashboard'}},
      {path : 'account-settings',component : AccountSettingsComponent, data : {title : 'Account-Settings'}},
      {path : 'graficas', component : GraficasComponent, data : {title : 'Graficas'}},
      {path : 'progress',component : ProgressComponent, data : {title : 'Progress'}},

      /*Perfil*/
      {path : 'perfil' , component : PerfilComponent , data : {title : 'Perfil'}},

      /* MANTENIMIENTO */
      {path : 'usuarios' , component : UsuariosComponent , data : {title : 'Mantenimiento Usuarios'}},
      {path : 'medicos' , component : MedicosComponent , data : {title : 'Mantenimiento Medicos'}},
      {path : 'medico/:id', component : MedicoComponent , data : {title : 'Mantenimiento Medico'}},

      {path : 'hospitales', component : HospitalesComponent, data  : {title : 'Mantenimiento Hospitales'}},



    ]
  }

  //{ path: 'path/:routeParam', component: MyComponent },
  //{ path: 'staticPath', component: ... },
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
