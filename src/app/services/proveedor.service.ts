import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jsPDF } from "jspdf"

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  private API = 'https://backend-bh.onrender.com/api';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  getProveedores() {
    return this.http.get(`${this.API}/proveedores/`);
  }

  postProveedor(request: any) {
    return this.http.post(`${this.API}/proveedores/`, request);
  }

  deleteProveedor(request: any, id: any) {
    return this.http.delete(`${this.API}/proveedores/` + id, request);
  }

  updateProveedor(request: any, id: any) {
    return this.http.put(`${this.API}/proveedores/` + id, request);
  }

}
