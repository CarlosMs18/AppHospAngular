import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PagesModule } from './pages/pages.module';






@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PagesModule,
    AuthModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
