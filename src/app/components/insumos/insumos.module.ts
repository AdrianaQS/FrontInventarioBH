import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InsumosComponent } from './insumos.component';

@NgModule({
  declarations: [InsumosComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: InsumosComponent
      }
    ])
  ]
})
export class InsumosModule { }
