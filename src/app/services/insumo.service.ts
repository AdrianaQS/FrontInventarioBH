import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class InsumoService {
  private API = 'http://localhost:5000/api';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  getInsumos() {
    return this.http.get(`${this.API}/insumos/`);
  }

  insertInsumo(request: any) {
    return this.http.post(`${this.API}/insumos/`, request);
  }

  deleteInsumo(request: any, id: any) {
    return this.http.delete(`${this.API}/insumos/`+ id, request);
  }

  updateInsumo(request: any, id: any) {
    return this.http.put(`${this.API}/insumos/`+ id, request);
  }
}
