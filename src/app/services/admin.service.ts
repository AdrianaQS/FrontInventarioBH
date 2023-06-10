import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private API = 'http://localhost:5000/api';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  postPassword(request: any) { // !CAMBIAR CONTRASEÑA
    return this.http.post(`${this.API}/administrador/cambioPassword`, request);
  }
}
