import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {

  nameProveedor = '';
  idProveedor = 0;
  proveedorForm = new FormGroup({
    inputName: new FormControl('', [Validators.required]),
    inputRuc: new FormControl('', [Validators.required]),
    inputTelefono: new FormControl('', [Validators.required]),
    inputDirecion: new FormControl('', [Validators.required]),
    inputCiudad: new FormControl('', [Validators.required]),
  });
  modalRef!: BsModalRef;

  arrayProveedores: any;
  constructor(
    private proveedorService: ProveedorService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.getProveedores();
  }

  getProveedores() {
    this.proveedorService.getProveedores().subscribe((res: any) => {
      this.arrayProveedores = res;
    });
  }

  openModal(template: TemplateRef<any>, proveedor: any, $event: any) {
    $event && $event.stopPropagation();
    this.limpiarFormulario();
    this.modalRef = this.modalService.show(template);
  }

  limpiarFormulario() {
    this.proveedorForm.setValue({
      inputName: '',
      inputRuc: '',
      inputTelefono: '',
      inputDirecion: '',
      inputCiudad: '',
    })
  }

  enviarFormulario() {
    if (this.proveedorForm.valid) {
      const request = {
        nombreProveedor: this.proveedorForm.value.inputName,
        ruc: this.proveedorForm.value.inputRuc,
        telefono: this.proveedorForm.value.inputTelefono,
        ciudad: this.proveedorForm.value.inputCiudad,
        direccion: this.proveedorForm.value.inputDirecion,
      };
      this.proveedorService.postProveedor(request).subscribe((res: any) => {
        this.getProveedores();
        this.modalRef.hide();
      });
    } else {
      window.alert('Error en el formulario');
    }
  }

  modalEdicion(template: TemplateRef<any>, proveedor: any, $event: any) {
    this.nameProveedor = proveedor.nombreProveedor;
    this.idProveedor = proveedor.idProveedor;
    $event && $event.stopPropagation();
    this.modalRef = this.modalService.show(template);
    this.proveedorForm.setValue({
      inputName: proveedor.nombreProveedor,
      inputRuc: proveedor.ruc,
      inputTelefono: proveedor.telefono,
      inputDirecion: proveedor.direccion,
      inputCiudad: proveedor.ciudad,
    })
  }

  editarProveedor() {
    if (this.proveedorForm.valid) {
      const request = {
        nombreProveedor: this.proveedorForm.value.inputName,
        ruc: this.proveedorForm.value.inputRuc,
        telefono: this.proveedorForm.value.inputTelefono,
        ciudad: this.proveedorForm.value.inputCiudad,
        direccion: this.proveedorForm.value.inputDirecion,
      };
      const id = this.idProveedor;
      this.proveedorService.updateProveedor(request, id).subscribe((res: any) => {
        this.getProveedores();
        this.modalRef.hide();
        this.idProveedor = 0;
      });
    } else {
      window.alert('Error en el formulario');
    }
  }


  modalEliminacion(template: TemplateRef<any>, proveedor: any, $event: any) {
    this.idProveedor = proveedor.idProveedor;
    $event && $event.stopPropagation();
    this.modalRef = this.modalService.show(template);
  }

  EliminarProveedor() {
    const request = {
      id: this.idProveedor
    };
    const id = this.idProveedor;
    this.proveedorService.deleteProveedor(request, id).subscribe((res: any) => {
      this.getProveedores();
      this.modalRef.hide();
      this.idProveedor = 0;
    });
  }

}

