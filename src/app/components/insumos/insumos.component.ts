import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InsumoService } from 'src/app/services/insumo.service';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.scss'],
})
export class InsumosComponent implements OnInit {
  nameInsumo = '';
  idInsumo = 0;
  insumoForm = new FormGroup({
    nombreInsumo: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    stock: new FormControl('', [Validators.required]),
    costo: new FormControl('', [Validators.required]),
    idCategoria: new FormControl('', [Validators.required]),
  });
  modalRef!: BsModalRef;
  public page: any;
  arrayInsumos: any;
  constructor(
    private insumoService: InsumoService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getInsumos();
    this.limpiarFormulario();
  }

  getInsumos() {
    this.insumoService.getInsumos().subscribe((res: any) => {
      this.arrayInsumos = res;
    });
  }

  openModal(template: TemplateRef<any>, insumo: any, $event: any) {
    this.limpiarFormulario();
    $event && $event.stopPropagation();
    this.modalRef = this.modalService.show(template);
  }

  enviarFormulario() {
    if (this.insumoForm.valid) {
      const request = {
        nombreInsumo: this.insumoForm.value.nombreInsumo,
        descripcion: this.insumoForm.value.descripcion,
        stock: parseInt(this.insumoForm.value.stock),
        costo: parseInt(this.insumoForm.value.costo),
        idCategoria: parseInt(this.insumoForm.value.idCategoria),
      };
      this.insumoService.insertInsumo(request).subscribe((res: any) => {
        this.getInsumos();
        this.modalRef.hide();
      });
    } else {
      window.alert('Error en el formulario');
    }
  }

  modalEdicion(template: TemplateRef<any>, insumo: any, $event: any) {
    this.nameInsumo = insumo.nombreInsumo;
    this.idInsumo = insumo.idInsumo;
    $event && $event.stopPropagation();
    this.modalRef = this.modalService.show(template);
    this.insumoForm.setValue({
      nombreInsumo: insumo.nombreInsumo,
      descripcion: insumo.descripcion,
      stock: insumo.stock,
      costo: insumo.costo,
      idCategoria: insumo.idCategoria,
    });
  }

  limpiarFormulario() {
    this.insumoForm.setValue({
      nombreInsumo: '',
      descripcion: '',
      stock: '',
      costo: '',
      idCategoria: '',
    });
  }

  editarInsumo() {
    if (this.insumoForm.valid) {
      const request = {
        nombreInsumo: this.insumoForm.value.nombreInsumo,
        descripcion: this.insumoForm.value.descripcion,
        stock: parseInt(this.insumoForm.value.stock),
        costo: parseFloat(this.insumoForm.value.costo),
        idCategoria: parseInt(this.insumoForm.value.idCategoria),
      };
      const id = this.idInsumo;
      this.insumoService.updateInsumo(request, id).subscribe((res: any) => {
        this.getInsumos();
        this.modalRef.hide();
        this.idInsumo = 0;
        this.limpiarFormulario();
      });
    } else {
      window.alert('Error en el formulario');
    }
  }

  modalEliminacion(template: TemplateRef<any>, insumo: any, $event: any) {
    this.nameInsumo = insumo.nombreInsumo;
    this.idInsumo = insumo.idInsumo;
    $event && $event.stopPropagation();
    this.modalRef = this.modalService.show(template);
  }

  EliminarInsumo() {
    const request = {
      id: this.idInsumo,
    };
    const id = this.idInsumo;
    this.insumoService.deleteInsumo(request, id).subscribe((res: any) => {
      this.getInsumos();
      this.modalRef.hide();
      this.idInsumo = 0;
    });
  }
}
