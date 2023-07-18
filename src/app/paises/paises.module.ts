import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaisComponent } from './components/pais/pais.component';
import { PaisFormComponent } from './pais-form/pais-form.component';
import { PaisTableComponent } from './pais-table/pais-table.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PaisComponent,
    PaisFormComponent,
    PaisTableComponent
  ],
  imports: [
    CommonModule, FormsModule
  ],
  exports: [
    PaisComponent
  ]
})
export class PaisesModule { }
