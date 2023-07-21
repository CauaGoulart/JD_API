import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home/home-page/home-page.component';
import { UserComponent } from './users/components/user/user.component';
import { CampeonatoComponent } from './campeonatos/components/campeonato/campeonato.component';
import { PistaComponent } from './pistas/components/pista/pista.component';
import { PaisComponent } from './paises/components/pais/pais.component';
import { EquipeComponent } from './equipes/components/equipe/equipe.component';
import { PilotoComponent } from './pilotos/components/piloto/piloto.component';
import { CorridaComponent } from './corridas/components/corrida/corrida.component';
import { LoginComponent } from './login/components/login/login.component';
import { PilotoCorridaComponent } from './pilotos-corridas/component/piloto-corrida/piloto-corrida.component';

const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "users", component: UserComponent },
  { path: "paises", component: PaisComponent },
  { path: "equipes", component: EquipeComponent },
  { path: "campeonatos", component: CampeonatoComponent },
  { path: "pistas", component: PistaComponent },
  { path: "pilotos", component: PilotoComponent },
  { path: "corridas", component: CorridaComponent },
  { path: "corridas", component: CorridaComponent },
  { path: "pilotoCorrida", component: PilotoCorridaComponent },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
