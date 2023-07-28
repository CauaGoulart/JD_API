import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PilotoCorridaComponent } from './component/piloto-corrida/piloto-corrida.component';
import { PilotoCorridaFormComponent } from './component/piloto-corrida-form/piloto-corrida-form.component';
import { PilotoCorridaTableComponent } from './component/piloto-corrida-table/piloto-corrida-table.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PilotoCorridaComponent,
    PilotoCorridaFormComponent,
    PilotoCorridaTableComponent
  ],
  imports: [
    CommonModule,FormsModule
  ],
  exports:[
    PilotoCorridaComponent
  ]
})
export class PilotosCorridasModule { }
