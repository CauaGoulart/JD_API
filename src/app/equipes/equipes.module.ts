import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipeTableComponent } from './equipe-table/equipe-table.component';
import { EquipeFormComponent } from './equipe-form/equipe-form.component';
import { EquipeComponent } from './components/equipe/equipe.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EquipeTableComponent,
    EquipeFormComponent,
    EquipeComponent
  ],
  imports: [
    CommonModule, FormsModule
  ],
  exports: [
    EquipeComponent
  ]
})
export class EquipesModule { }
