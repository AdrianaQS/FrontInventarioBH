import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EntradaService } from 'src/app/services/entrada.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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
    private modalService: BsModalService
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

<<<<<<< Updated upstream
    this.entradaService.getDetallePedido(this.numeroPedido).subscribe((res: any) => {
      this.arrayDetalleEntrada = res;
    });
=======
    /*this.entradaService.getIdDetallePedido(this.numeroPedido).subscribe((res: any) => {
      this.arrayDetalleEntrada = res;
      console.log(res, 'res')
    });*/
>>>>>>> Stashed changes
    $event && $event.stopPropagation();
    this.modalRef = this.modalService.show(template);
  }

}
