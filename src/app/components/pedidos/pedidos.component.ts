import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PedidoService } from 'src/app/services/pedido.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})

export class PedidosComponent implements OnInit {
  idAdmin: any;
  nameAdmin(): string {
    const token: any = localStorage.getItem('token');

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    const nameAdmin = decodedToken.nombreAdmin;
    this.idAdmin = decodedToken.idAdmin;
    //console.log(`Bienvenid@ ${decodedToken.nombreAdmin}`);
    return nameAdmin;
  }
  namePedido = '';
  idPedido = 0;
  pedidoForm = new FormGroup({
    idInsumo: new FormControl('', [Validators.required]),
    fechaPedido: new FormControl('', [Validators.required]),
    idAdmin: new FormControl(''),
    idProveedor: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    cantInsumos: new FormControl('', [Validators.required]),
  });

  pedidoEditionForm = new FormGroup({
    idProveedor: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    totalInsumos: new FormControl('', [Validators.required]),
    costoPedido: new FormControl('', [Validators.required]),
  });

  modalRef!: BsModalRef;
  arrayDetallePedido: any;
  arrayPedidos: any;
  numeroPedido: any;
  constructor(
    private pedidoService: PedidoService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getPedidos();
    this.limpiarFormulario();
    this.getPedidoU();
  }

  getPedidos() {
    this.pedidoService.getPedidos().subscribe((res: any) => {
      this.arrayPedidos = res;
    });
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

  enviarFormulario() {
    console.log(this.pedidoForm);
    if (this.pedidoForm.valid) {
      const request = {
        idAdmin: parseInt(this.idAdmin),
        idProveedor: parseInt(this.pedidoForm.value.idProveedor),
        descripcion: 'test',
        totalInsumos:12,
        costoPedido: 12,
        idEstado: 1,
      };
      console.log(request, 'request');
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
    this.pedidoForm.setValue({
      idInsumo: '',
      fechaPedido: '',
      idAdmin: '',
      idProveedor: '',
      descripcion: '',
      cantInsumos: '',
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
}
