import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorridaComponent } from './components/corrida/corrida.component';
import { CorridaFormComponent } from './components/corrida-form/corrida-form.component';
import { CorridaTableComponent } from './components/corrida-table/corrida-table.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CorridaComponent,
    CorridaFormComponent,
    CorridaTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    CorridaComponent
  ]
})
export class CorridasModule { }
