import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private API = 'http://localhost:5000/api';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  getPedidos() {
    return this.http.get(`${this.API}/pedido`);
  }

  getPedidoU(id: any) {
    return this.http.get(`${this.API}/pedido/`+ id);
  }

  getDetallePedido(id: any) {
    return this.http.get(`${this.API}/detallePedido/`+ id);
  }

  insertPedido(request: any) {
    return this.http.post(`${this.API}/pedido/`, request);
  }

  deletePedido(request: any, id: any) {
    return this.http.delete(`${this.API}/pedido/`+ id, request);
  }

  updatePedido(request: any, id: any) {
    return this.http.put(`${this.API}/pedido/`+ id, request);
  }

  recibirPedidoRegistrarEntrada(request: any) {
    return this.http.post(`${this.API}/pedido/recibirPedido`, request);
  }
}