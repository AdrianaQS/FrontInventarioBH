import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
//El servicio se instancia en el constructor del componente : login.components
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API = 'http://localhost:5000/api';

  //Inicializacion del modulo
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  //Funcion para ingresar
  singin(admin: any) {
    return this.http.post(`${this.API}/administrador/singin`, admin); //Envio el JSON de admin
  }

  //Verifica la existencia del token en el localStorage
  isAuth(): boolean {
    const token: any = localStorage.getItem('token');
    //El token expiro o Existe una variable llamado token?
    if (
      this.jwtHelper.isTokenExpired(token) ||
      !localStorage.getItem('token')
    ) {
      //npm i --save @auth0/angular-jwt para manejar tokens en angular -> app.module.ts -> providers: {}
      return false;
    }

    //Token decodificado
    /*const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    console.log(decodedToken);*/
    return true;
  }
}
