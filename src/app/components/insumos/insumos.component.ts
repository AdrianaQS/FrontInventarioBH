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
    nombreInsumo: new FormControl(''),
    descripcion: new FormControl(''),
    stock: new FormControl(''),
    costo: new FormControl(''),
    idCategoria: new FormControl(''),
  });
  modalRef!: BsModalRef;

  arrayInsumos: any;
  constructor(
    private insumoService: InsumoService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.getInsumos();
  }

  getInsumos() {
    this.insumoService.getInsumos().subscribe((res: any) => {
      this.arrayInsumos = res;
    });
  }

  openModal(template: TemplateRef<any>, insumo: any, $event: any) {
    $event && $event.stopPropagation();
    this.modalRef = this.modalService.show(template);
  }

  enviarFormulario() {
    if (this.insumoForm.valid) {
      const request = {
        nombreInsumo: this.insumoForm.value.inputName,
        descripcion: this.insumoForm.value.descripcion,
        stock: this.insumoForm.value.stock,
        costo: this.insumoForm.value.costo,
        idCategoria: this.insumoForm.value.idCategoria,
      };
      this.insumoService.insertInsumo(request).subscribe((res: any) => {
        this.getInsumos();
        this.modalRef.hide();
      });
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
    })
  }

  editarInsumo() {
    if (this.insumoForm.valid) {
      const request = {
        nombreinsumo: this.insumoForm.value.inputName,
        ruc: this.insumoForm.value.inputRuc,
        telefono: this.insumoForm.value.inputDirecion,
        ciudad: this.insumoForm.value.inputCiudad,
        direccion: this.insumoForm.value.inputDirecion,
      };
      const id = this.idInsumo;
      this.insumoService.updateInsumo(request, id).subscribe((res: any) => {
        this.getInsumos();
        this.modalRef.hide();
        this.idInsumo = 0;
      });
    }
  }


  modalEliminacion(template: TemplateRef<any>, insumo: any, $event: any) {
    this.idInsumo = insumo.idinsumo;
    $event && $event.stopPropagation();
    this.modalRef = this.modalService.show(template);
  }

  EliminarInsumo() {
    const request = {
      id: this.idInsumo
    };
    const id = this.idInsumo;
    this.insumoService.deleteInsumo(request, id).subscribe((res: any) => {
      this.getInsumos();
      this.modalRef.hide();
      this.idInsumo = 0;
    });
  }

}
