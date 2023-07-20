import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaisComponent } from './components/pais/pais.component';

import { FormsModule } from '@angular/forms';
import { PaisFormComponent } from './components/pais-form/pais-form.component';
import { PaisTableComponent } from './components/pais-table/pais-table.component';


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
