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

  arrayEntradas: any;
  constructor(
    private entradaService: EntradaService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getPedidos();
  }

  getPedidos() {
    this.entradaService.getEntradas().subscribe((res: any) => {
      this.arrayEntradas = res;
    });
  }

  openModal(template: TemplateRef<any>, insumo: any, $event: any) {
    $event && $event.stopPropagation();
    this.modalRef = this.modalService.show(template);
  }  
}
