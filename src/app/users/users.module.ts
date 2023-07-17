import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './components/user/user.component';
import { RouterModule } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { UserTableComponent } from './user-table/user-table.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserComponent,
    UserFormComponent,
    UserTableComponent
  ],
  imports: [
    CommonModule, FormsModule
  ],
  exports: [
    UserComponent
  ]
})
export class UsersModule { }
