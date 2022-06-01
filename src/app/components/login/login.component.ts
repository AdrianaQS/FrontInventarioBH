import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  //Objeto admin para obtener las credenciales
  admin = {
    username: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {} // private aut: AuthService,

  ngOnInit() {}

  logIn() {
    //console.log(this.admin);
    this.authService.singin(this.admin).subscribe((res: any) => {
      console.log(res);
      //Guardamos el token dentro del LocalStorage
      localStorage.setItem('token', res.token); //nombreItem,valor
      //Nos envias al panel principal
      this.router.navigate(['inventario']); //Nombre asignado en el app-routing.module.ts
    });
  }
}
