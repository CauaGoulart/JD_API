import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampeonatoComponent } from './components/campeonato/campeonato.component';
import { CampeonatoFormComponent } from './components/campeonato-form/campeonato-form.component';
import { CampeonatoTableComponent } from './components/campeonato-table/campeonato-table.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CampeonatoComponent,
    CampeonatoFormComponent,
    CampeonatoTableComponent
  ],
  imports: [
    CommonModule, FormsModule
  ],
  exports: [
    CampeonatoComponent
  ]
})
export class CampeonatosModule { }
