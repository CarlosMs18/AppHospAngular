import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { PerfilComponent } from './perfil/perfil.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { AdminGuard } from './../guards/admin.guard';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { GraficasComponent } from './graficas/graficas.component';
import { ProgressComponent } from './progress/progress.component';

const childRoutes :Routes = [
      {path : '',component : DashboardComponent, data : {title : 'Dashboard'}},
      {path : 'account-settings',component : AccountSettingsComponent, data : {title : 'Account-Settings'}},
      {path : 'buscar/:termino',component : BusquedaComponent, data : {title : 'Busquedas'}},
      {path : 'graficas', component : GraficasComponent, data : {title : 'Graficas'}},
      {path : 'progress',component : ProgressComponent, data : {title : 'Progress'}},

      /*Perfil*/
      {path : 'perfil' , component : PerfilComponent , data : {title : 'Perfil'}},

      /* MANTENIMIENTO */
      {path : 'medicos' , component : MedicosComponent , data : {title : 'Mantenimiento Medicos'}},
      {path : 'medico/:id', component : MedicoComponent , data : {title : 'Mantenimiento Medico'}},

      {path : 'hospitales', component : HospitalesComponent, data  : {title : 'Mantenimiento Hospitales'}},

      {path : 'usuarios'  , canActivate : [AdminGuard] ,  component : UsuariosComponent , data : {title : 'Mantenimiento Usuarios'}},


]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]

})
export class ChildRoutesModule { }
