import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { MenusModule } from './menus/menus.module';
import { UsersModule } from './users/users.module';

import { HttpClientModule } from '@angular/common/http';
import { PaisesModule } from './paises/paises.module';
import { EquipesModule } from './equipes/equipes.module';
import { CampeonatosModule } from './campeonatos/campeonatos.module';
import { PistasModule } from './pistas/pistas.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    MenusModule,
    UsersModule,
    PaisesModule,
    EquipesModule,
    CampeonatosModule,
    PistasModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
