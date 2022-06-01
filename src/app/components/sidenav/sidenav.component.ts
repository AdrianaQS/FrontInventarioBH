import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
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

}
