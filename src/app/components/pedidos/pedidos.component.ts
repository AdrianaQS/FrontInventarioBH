import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PedidoService } from 'src/app/services/pedido.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit {
  namePedido = '';
  idPedido = 0;
  pedidoForm = new FormGroup({
    idInsumo: new FormControl('', [Validators.required]),
    fechaPedido: new FormControl('', [Validators.required]),
    idAdmin: new FormControl('', [Validators.required]),
    idProveedor: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    totalInsumos: new FormControl('', [Validators.required]),
    costoPedido: new FormControl('', [Validators.required]),
  });
  modalRef!: BsModalRef;

  arrayPedidos: any;
  constructor(
    private pedidoService: PedidoService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getPedidos();
    this.limpiarFormulario();
  }

  getPedidos() {
    this.pedidoService.getPedidos().subscribe((res: any) => {
      this.arrayPedidos = res;
    });
  }

  openModal(template: TemplateRef<any>, insumo: any, $event: any) {
    this.limpiarFormulario();
    $event && $event.stopPropagation();
    this.modalRef = this.modalService.show(template);
  }

  enviarFormulario() {
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
      totalInsumos: '',
      costoPedido: '',
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
    this.namePedido = pedido.namePedido;
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
