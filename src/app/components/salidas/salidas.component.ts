import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SalidaService } from 'src/app/services/salida.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { JwtHelperService } from '@auth0/angular-jwt';
import { InsumoService } from 'src/app/services/insumo.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.scss']
})
export class SalidasComponent implements OnInit {
  namePedido = '';
  idSalida = 0;
  idAdmin: any;
  arrayInsumos: any;
  salidaForm: FormGroup;
  salidaEditionForm: FormGroup;
  nameAdministrador = '';
  nameAdmin(): string {
    const token: any = localStorage.getItem('token');
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    this.nameAdministrador = decodedToken.nombreAdmin;
    const nameAdmin = decodedToken.nombreAdmin;
    this.idAdmin = decodedToken.idAdmin;
    //console.log(`Bienvenid@ ${decodedToken.nombreAdmin}`);
    return nameAdmin;
  }
  nameSalida = '';
  modalRef!: BsModalRef;
  numeroSalida: any;
  arrayDetalleSalida: any;
  arraySalidas: any;
  public page: any;

  totalPedido: number;
  totalCantidadPedido: number;
  constructor(
    private salidaService: SalidaService,
    private modalService: BsModalService,
    private insumoService: InsumoService,
    private fb: FormBuilder,
  ) {

    this.totalPedido = 0;
    this.totalCantidadPedido = 0;
    this.salidaForm = new FormGroup({
      idsalida: new FormControl(''),
      idInsumo: new FormControl(''),
      idManufactura: new FormControl('', [Validators.required]),
      idAdmin: new FormControl(''),
      insumos: this.fb.array([this.fb.group({ insumo: [], cantidad: [], costo: [] })])
    });

    this.salidaEditionForm = new FormGroup({
      idManufactura: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getSalidas();
    this.limpiarFormulario();
    this.getListaInsumos();
  }

  public downloadPDF(): void {
    const doc = new jsPDF();

    doc.text('Hello world!', 10, 10);
    doc.save('hello-world.pdf');
  }

  getSalidas() {
    this.salidaService.getSalidas().subscribe((res: any) => {
      this.arraySalidas = res;
      console.log(this.arraySalidas, 'lista getSalidas');
    });
  }

  getListaInsumos() {
    this.insumoService.getInsumos().subscribe((res: any) => {
      this.arrayInsumos = res;
      console.log(this.arrayInsumos, 'lista insumos');
    });
  }



  get getInsumos() {
    return this.salidaForm.get('insumos') as FormArray;
  }

  addInsumos() {
    const control = <FormArray>this.salidaForm.controls['insumos'];
    control.push(this.fb.group({ insumo: [], cantidad: [] }));
    this.totalCantidadYcostoInsumos();
  }

  removeInsumo(index: number) {
    const control = <FormArray>this.salidaForm.controls['insumos'];
    control.removeAt(index);
    this.totalCantidadYcostoInsumos();
  }

  openModal(template: TemplateRef<any>, insumo: any, $event: any) {
    this.limpiarFormulario();
    $event && $event.stopPropagation();
    this.modalRef = this.modalService.show(template);
  }

  totalCantidadYcostoInsumos() {
    let totalCostoDeInsumo = 0;
    let totalDeCantidadPedido = 0;
    this.salidaForm.value.insumos.forEach((value: any) => {
      if (value.costo !== null) {
        totalCostoDeInsumo += parseInt(value.costo);
      }
      if (value.cantidad !== null) {
        totalDeCantidadPedido += parseInt(value.cantidad);
      }
    });
    this.totalPedido = totalCostoDeInsumo;
    this.totalCantidadPedido = totalDeCantidadPedido;
  }

  openModalDetalle(template: TemplateRef<any>, salida: any, $event: any) {
    this.numeroSalida = salida.idSalida;

    this.salidaService.getDetalleSalida(this.numeroSalida).subscribe((res: any) => {
      this.arrayDetalleSalida = res;
    });
    this.limpiarFormulario();
    $event && $event.stopPropagation();
    this.modalRef = this.modalService.show(template);
  }

  openModalEdition(template: TemplateRef<any>, salida: any, $event: any) {
    this.salidaEditionForm.setValue({
      idProveedor: salida.idProveedor,
      descripcion: salida.descripcion,
      totalInsumos: salida.totalInsumos,
      costoSalida: salida.costoSalida,
    });
    this.limpiarFormulario();
    $event && $event.stopPropagation();
    this.modalRef = this.modalService.show(template);
  }

  modalEliminacion(template: TemplateRef<any>, salida: any, $event: any) {
    this.namePedido = salida.idPedido;
    this.idSalida = salida.idSalida;
    $event && $event.stopPropagation();
    this.modalRef = this.modalService.show(template);
  }

  enviarFormulario() {
    if (this.salidaForm.valid) {
      this.totalCantidadYcostoInsumos();
      const request = {
        administrador: this.nameAdministrador,
        manufactura: this.salidaForm.value.idManufactura,
        totalInsumos: this.totalCantidadPedido,
        costoSalida: this.totalPedido,
      };
      this.salidaService.insertSalida(request).subscribe((res: any) => {
        this.getSalidas();
        this.modalRef.hide();
      });
    } else {
      window.alert('Error en el formulario');
    }
  }

  limpiarFormulario() {
    const control = <FormArray>this.salidaForm.controls['insumos'];
    control.removeAt(1);
  }

  editarSalida() {
    if (this.salidaForm.valid) {
      const request = {
        idInsumo: this.salidaForm.value.idInsumo,
        idAdmin: parseInt(this.salidaForm.value.idAdmin),
        idManufactura: parseInt(this.salidaForm.value.idManufactura),
        fechaSalida: this.salidaForm.value.fechaSalida,
        totalInsumos: parseInt(this.salidaForm.value.totalInsumos),
        costoSalida: parseFloat(this.salidaForm.value.costoSalida),
      };
      const id = this.idSalida;
      this.salidaService.updateSalida(request, id).subscribe((res: any) => {
        this.getSalidas();
        this.modalRef.hide();
        this.idSalida = 0;
        this.limpiarFormulario();
      });
    } else {
      window.alert('Error en el formulario');
    }
  }

  eliminarSalida() {
    const request = {
      id: this.idSalida,
    };
    const id = this.idSalida;
    this.salidaService.deleteSalida(request, id).subscribe((res: any) => {
      this.getSalidas();
      this.modalRef.hide();
      this.idSalida = 0;
    });
  }

}
