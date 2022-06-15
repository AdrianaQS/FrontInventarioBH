import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class EntradaService {
  private API = 'http://localhost:5000/api';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  getEntradas() {
    return this.http.get(`${this.API}/entradas/`);
  }
}