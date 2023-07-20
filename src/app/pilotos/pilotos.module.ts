import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PilotoComponent } from './components/piloto/piloto.component';
import { PilotoFormComponent } from './components/piloto-form/piloto-form.component';
import { PilotoTableComponent } from './components/piloto-table/piloto-table.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PilotoComponent,
    PilotoFormComponent,
    PilotoTableComponent
  ],
  imports: [
    CommonModule
    ,FormsModule
  ],
  exports:[
    PilotoComponent
  ]
})
export class PilotosModule { }
