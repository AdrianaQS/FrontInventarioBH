import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  nameAdmin(): string {
    const token: any = localStorage.getItem('token');
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    const nameAdmin = decodedToken.nombreAdmin;
    //console.log(`Bienvenid@ ${decodedToken.nombreAdmin}`);
    return nameAdmin;
  }

  removeToken(): boolean {
    const remove = localStorage.removeItem('token');
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
  goToPedidos() {
    this.router.navigate(['/inventario/pedidos']);
  }

  goToEntrada() {
    this.router.navigate(['/inventario/entradas']);
  }

  goToSalida() {
    this.router.navigate(['/inventario/salidas']);
  }
}
