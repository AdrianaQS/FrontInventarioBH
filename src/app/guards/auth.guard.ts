import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  //Funciona si no hay token o ya expiro del localStorage
  canActivate(): boolean {
    if (!this.authService.isAuth()) {
      console.log('El token ya expiro o no es valido');
      this.router.navigate(['login']); //Retorna al login si no existe el token
      return false;
    }
    return true;
  }
}
