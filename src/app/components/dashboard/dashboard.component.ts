import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    //this.welcomeTest();
    //this.router.navigate(["/inventario/tablero-principal"])
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

}
