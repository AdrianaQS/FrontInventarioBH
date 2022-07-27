import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PedidoService } from 'src/app/services/pedido.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { JwtHelperService } from '@auth0/angular-jwt';
import { InsumoService } from 'src/app/services/insumo.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})

export class PedidosComponent implements OnInit {
  saveUsername: boolean = false;
  disableCheckbox: boolean = false;
  nameAdministrador: any;
  idAdmin: any;
  arrayInsumos: any;
  pedidoForm: FormGroup;
  pedidoEditionForm: FormGroup;
  totalPedido: number;
  totalCantidadPedido: number;
  nameAdmin(): string {
    const token: any = localStorage.getItem('token');

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    const nameAdmin = decodedToken.nombreAdmin;
    this.nameAdministrador = decodedToken.nombreAdmin;
    this.idAdmin = decodedToken.idAdmin;
    //console.log(`Bienvenid@ ${decodedToken.nombreAdmin}`);
    return nameAdmin;
  }
  namePedido = '';
  idPedido = 0;

  modalRef!: BsModalRef;
  arrayDetallePedido: any;
  arrayPedidos: any;
  numeroPedido: any;
  public page: any;
  constructor(
    private pedidoService: PedidoService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private insumoService: InsumoService,
  ) {
    this.totalPedido = 0;
    this.disableCheckbox = true;
    this.totalCantidadPedido = 0;
    this.pedidoForm = new FormGroup({
      idAdmin: new FormControl(''),
      idProveedor: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      insumos: this.fb.array([this.fb.group({ insumo: [], cantidad: [], costo: [] })])
    });

    this.pedidoEditionForm = new FormGroup({
      idProveedor: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      totalInsumos: new FormControl('', [Validators.required]),
      costoPedido: new FormControl('', [Validators.required]),
    });

  }

  ngOnInit(): void {
    this.getPedidos();
    this.limpiarFormulario();
    this.getPedidoU();
    this.getListaInsumos();
  }

  getListaInsumos() {
    this.insumoService.getInsumos().subscribe((res: any) => {
      this.arrayInsumos = res;
    });
  }

  getPedidos() {
    this.pedidoService.getPedidos().subscribe((res: any) => {
      this.arrayPedidos = res;
    });
  }

  get getInsumos() {
    return this.pedidoForm.get('insumos') as FormArray;
  }

  addInsumos() {
    const control = <FormArray>this.pedidoForm.controls['insumos'];
    control.push(this.fb.group({ insumo: [], cantidad: [], costo: [] }));
    this.totalCantidadYcostoInsumos();
  }

  removeInsumo(index: number) {
    const control = <FormArray>this.pedidoForm.controls['insumos'];
    control.removeAt(index);
    this.totalCantidadYcostoInsumos();
  }



  getPedidoU() {
    this.pedidoService.getPedidoU(1).subscribe((res: any) => {
      // this.arrayPedidos = res;
      console.log(this.arrayPedidos, 'lista pedidos');
    });
  }

  openModal(template: TemplateRef<any>, insumo: any, $event: any) {
    this.limpiarFormulario();
    $event && $event.stopPropagation();
    this.modalRef = this.modalService.show(template);
  }

  openModalDetalle(template: TemplateRef<any>, pedido: any, $event: any) {
    this.numeroPedido = pedido.idPedido;

    this.pedidoService.getDetallePedido(this.numeroPedido).subscribe((res: any) => {
      this.arrayDetallePedido = res;
    });
    this.limpiarFormulario();
    $event && $event.stopPropagation();
    this.modalRef = this.modalService.show(template);
  }

  openModalEdition(template: TemplateRef<any>, pedido: any, $event: any) {
    this.pedidoEditionForm.setValue({
      idProveedor: pedido.idProveedor,
      descripcion: pedido.descripcion,
      totalInsumos: pedido.totalInsumos,
      costoPedido: pedido.costoPedido,
    });
    this.limpiarFormulario();
    $event && $event.stopPropagation();
    this.modalRef = this.modalService.show(template);
  }

  totalCantidadYcostoInsumos() {
    let totalCostoDeInsumo = 0;
    let totalDeCantidadPedido = 0;
    this.pedidoForm.value.insumos.forEach((value: any) => {
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

  enviarFormulario() {
    console.log(this.pedidoForm, 'this.pedidoForm.')
    console.log(this.pedidoForm.valid, 'valido?')
    if (this.pedidoForm.valid) {

      this.totalCantidadYcostoInsumos();
      const request = {
        administrador: this.nameAdministrador,
        proveedor: this.pedidoForm.value.idProveedor,
        descripcion: this.pedidoForm.value.descripcion,
        totalInsumos: this.totalCantidadPedido,
        costoPedido: this.totalPedido,
      };
      this.pedidoService.insertPedido(request).subscribe((res: any) => {
        this.getPedidos();
        this.modalRef.hide();
      });
    } else {
      window.alert('Error en el formulario');
    }
  }

  modalEdicion(template: TemplateRef<any>, pedido: any, $event: any) {
    this.namePedido = pedido.nombreInsumo;
    this.idPedido = pedido.idInsumo;
    $event && $event.stopPropagation();
    this.modalRef = this.modalService.show(template);
    this.pedidoForm.setValue({
      fechaPedido: pedido.fechaPedido,
      idAdmin: pedido.idAdmin,
      idProveedor: pedido.idProveedor,
      descripcion: pedido.descripcion,
      totalInsumos: pedido.totalInsumos,
      costoPedido: pedido.costoPedido,
    });
  }

  limpiarFormulario() {
    const control = <FormArray>this.pedidoForm.controls['insumos'];
    control.removeAt(1);
    this.pedidoForm.setValue({
      idAdmin: '',
      idProveedor: '',
      descripcion: '',
      insumos: [{
        insumo: [],
        cantidad: [],
        costo: []
      }]
    });
  }

  editarPedido() {
    if (this.pedidoForm.valid) {
      const request = {
        idInsumo: this.pedidoForm.value.idInsumo,
        fechaPedido: this.pedidoForm.value.fechaPedido,
        idAdmin: parseInt(this.pedidoForm.value.idAdmin),
        idProveedor: parseInt(this.pedidoForm.value.idProveedor),
        descripcion: this.pedidoForm.value.descripcion,
        totalInsumos: parseInt(this.pedidoForm.value.totalInsumos),
        costoPedido: parseFloat(this.pedidoForm.value.costoPedido),
      };
      const id = this.idPedido;
      this.pedidoService.updatePedido(request, id).subscribe((res: any) => {
        this.getPedidos();
        this.modalRef.hide();
        this.idPedido = 0;
        this.limpiarFormulario();
      });
    } else {
      window.alert('Error en el formulario');
    }
  }

  modalEliminacion(template: TemplateRef<any>, pedido: any, $event: any) {
    this.namePedido = pedido.idPedido;
    this.idPedido = pedido.idPedido;
    $event && $event.stopPropagation();
    this.modalRef = this.modalService.show(template);
  }

  EliminarPedido() {
    const request = {
      id: this.idPedido,
    };
    const id = this.idPedido;
    this.pedidoService.deletePedido(request, id).subscribe((res: any) => {
      this.getPedidos();
      this.modalRef.hide();
      this.idPedido = 0;
    });
  }

  cambiosSwitch(pedido: any) {
    const request = {
      idPedido: pedido.idPedido
    }
    this.pedidoService.recibirPedidoRegistrarEntrada(pedido).subscribe((res: any) => {
      this.getPedidos();
    });
  }
}
