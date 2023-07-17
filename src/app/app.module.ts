import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { MenusModule } from './menus/menus.module';
import { UsersModule } from './users/users.module';

import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, HomeModule, MenusModule, UsersModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
