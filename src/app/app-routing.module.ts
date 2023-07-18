import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home/home-page/home-page.component';
import { UserComponent } from './users/components/user/user.component';
import { PaisComponent } from './paises/components/pais/pais.component';
import { EquipeComponent } from './equipes/components/equipe/equipe.component';

const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "users", component: UserComponent },
  { path: "paises", component: PaisComponent },
  { path: "equipes", component: EquipeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
