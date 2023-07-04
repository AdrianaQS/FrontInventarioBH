import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class EntradaService {
  private API = 'https://backend-bh.onrender.com/api';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  getEntradas() {
    return this.http.get(`${this.API}/entrada`);
  }

  getDetallePedido(id: any) {
    return this.http.get(`${this.API}/detallePedido/`+ id);
  }

}