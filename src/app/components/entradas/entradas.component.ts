import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EntradaService } from 'src/app/services/entrada.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.scss']
})
export class EntradasComponent implements OnInit {
  modalRef!: BsModalRef;
  numeroPedido: any;
  arrayDetalleEntrada: any;
  arrayEntradas: any;
  public page: any;
  constructor(
    private entradaService: EntradaService,
    private modalService: BsModalService,
    private reportesService: ReportesService
  ) { }

  ngOnInit(): void {
    this.getPedidos();
  }

  getPedidos() {
    this.entradaService.getEntradas().subscribe((res: any) => {
      console.log(res, 'res')
      this.arrayEntradas = res;
    });
  }

  openModal(template: TemplateRef<any>, insumo: any, $event: any) {
    $event && $event.stopPropagation();
    this.modalRef = this.modalService.show(template);
  }

  openModalDetalle(template: TemplateRef<any>, entrada: any, $event: any) {
    this.numeroPedido = entrada.idEntrada;

    this.entradaService.getDetallePedido(this.numeroPedido).subscribe((res: any) => {
      this.arrayDetalleEntrada = res;
    });
    $event && $event.stopPropagation();
    this.modalRef = this.modalService.show(template);
  }

  transformFecha(fecha: any) {
    const f = new Date(fecha);
    const dia = f.getDate();
    const mes = f.getMonth() + 1; // Los meses en JavaScript son base 0
    const año = f.getFullYear();

    return `${dia}/${mes}/${año}`;
  }

  onGenerarReporte() {
    const data = this.arrayEntradas;
    // console.log(data);
    let newData: any = [];
    data.forEach((entrada: any) => {
      const { fechaPedido, fechaEntrada, administrador, nombreProveedor, valorEntrada } = entrada;

      const newFechaPedido = this.transformFecha(fechaPedido);
      const newFechaEntrada = this.transformFecha(fechaEntrada);

      const preData = [newFechaPedido, newFechaEntrada, administrador, nombreProveedor, `S/ ${valorEntrada}`];

      newData.push(preData);
    });
    console.log(newData);

    const encabezado = ['Fecha Pedido', 'Fecha Entrada', 'Administrador', 'Proveedor', 'Valor Entrada'];
    const cuerpo = newData;
    // const cuerpo = [newData];

    const titulo = 'Reporte de Entradas';
    this.reportesService.reporteGeneral(encabezado, cuerpo, titulo, "entradas", true);
  }


  onGenerarReporteDetalle(pedido: any) {

    console.log(pedido);
    this.numeroPedido = pedido.idEntrada;
    const idPedido = this.numeroPedido;
    const fechaPedido = pedido.fechaPedido;
    const fechaEntrada = pedido.fechaEntrada;

    const newFechaPedido = this.transformFecha(fechaPedido);
    const newFechaEntrada = this.transformFecha(fechaEntrada);

    const administrador = pedido.administrador;
    const proveedor = pedido.nombreProveedor;
    const valorEntrada = pedido.valorEntrada;


    this.entradaService.getDetallePedido(this.numeroPedido).subscribe((res: any) => {
      this.arrayDetalleEntrada = res;
    });

    const data = this.arrayDetalleEntrada;
    console.log(data);

    let newData: any = [];

    data.forEach((detallePedido: any) => {
      const { nombreInsumo, costoInsumo, cantidadPedido, costoDetalle } = detallePedido;

      const preData = [newFechaPedido, newFechaEntrada, administrador, proveedor, `S/ ${valorEntrada}`, nombreInsumo, `S/ ${costoInsumo}`, `${cantidadPedido} KG`, `S/ ${costoDetalle}`];

      newData.push(preData);
    });
    console.log(newData);

    const encabezado = ['Fecha Pedido', 'Fecha Entrada', 'Administrador', 'Proveedor', 'Valor Entrada', 'Nombre Insumo', 'Costo Insumo', 'Cantidad', 'Costo Detalle'];
    const cuerpo = newData;
    // const cuerpo = [newData];

    const titulo = `Reporte de Detalle Entrada #${idPedido}`;
    this.reportesService.reporteGeneral(encabezado, cuerpo, titulo, "detalle_entrada", true);
  }




}
