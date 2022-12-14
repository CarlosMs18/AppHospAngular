import { PipesModule } from './../pipes/pipes.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { GraficasComponent } from './graficas/graficas.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProgressComponent } from './progress/progress.component';
import { ComponentsModule } from '../components/components.module';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil/perfil.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';




@NgModule({
  declarations: [
    DashboardComponent,
    AccountSettingsComponent,
    GraficasComponent,
    PagesComponent,
    ProgressComponent,
    UsuariosComponent,
    HospitalesComponent,
    MedicosComponent,
    PerfilComponent,
    MedicoComponent,
    BusquedaComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    ComponentsModule,
    PipesModule
  ]
})
export class PagesModule { }
