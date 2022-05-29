import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProveedoresComponent } from './proveedores.component';

@NgModule({
  declarations: [ProveedoresComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProveedoresComponent
      }
    ])
  ]
})
export class ProveedoresModule { }
