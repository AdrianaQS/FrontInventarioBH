import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  modalRef!: BsModalRef;

  constructor(private router: Router, private modalService: BsModalService) {}

  ngOnInit() {
    //this.welcomeTest();
    //this.router.navigate(['/inventario/tablero-principal']);
  }

  welcomeTest(): boolean {
    const token: any = localStorage.getItem('token');
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    alert(`Bienvenid@ ${decodedToken.nombreAdmin}`);
    return true;
  }

  goToDashboard() {
    this.router.navigate(['/inventario/tablero-principal']);
  }

  goToProveedor() {
    this.router.navigate(['/inventario/proveedor']);
  }

  goToInsumo() {
    this.router.navigate(['/inventario/insumos']);
  }

  goToPedido() {
    this.router.navigate(['/inventario/pedidos']);
  }

  goToEntrada() {
    this.router.navigate(['/inventario/entradas']);
  }
  openModal(template: TemplateRef<any>,dashboard: any, $event: any) {
    $event && $event.stopPropagation();
    this.modalRef = this.modalService.show(template);
  }
}
