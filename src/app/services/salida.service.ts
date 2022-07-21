import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class SalidaService {
  private API = 'http://localhost:5000/api';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  getSalidas() {
    return this.http.get(`${this.API}/salida`);
  }

  getDetalleSalida(id: any) {
    return this.http.get(`${this.API}/detalleSalida/`+ id);
  }

  insertSalida(request: any) {
    return this.http.post(`${this.API}/salida/`, request);
  }

  deleteSalida(request: any, id: any) {
    return this.http.delete(`${this.API}/salida/`+ id, request);
  }

  updateSalida(request: any, id: any) {
    return this.http.put(`${this.API}/salida/`+ id, request);
  }

}