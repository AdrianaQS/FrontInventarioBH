import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  modalRef!: BsModalRef;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = [false, false, false];

  passwordForm = new FormGroup({
    inputPassword: new FormControl('', [Validators.required]),
    inputNewPassword: new FormControl('', [Validators.required]),
    inputConfirmPassword: new FormControl('', [Validators.required])
  });

  constructor(private router: Router, private modalService: BsModalService, private adminService: AdminService,) { }
  ngOnInit(): void { }

  nameAdmin(): string {
    const token: any = localStorage.getItem('token');
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    const nameAdmin = decodedToken[0].nombreAdmin;

    // console.log(`Bienvenid@ ${decodedToken.nombreAdmin}`);
    return nameAdmin;
  }

  removeToken(): boolean {
    const remove = localStorage.removeItem('token');
    return true;
  }

  goToDashboard() {
    this.router.navigate(['/inventario/tablero-principal']);
  }

  goToProveedor() {
    this.router.navigate(['/inventario/proveedor']);
  }

  goToInsumo() {
    this.router.navigate(['/inventario/insumos']);
  }
  goToPedidos() {
    this.router.navigate(['/inventario/pedidos']);
  }

  goToEntrada() {
    this.router.navigate(['/inventario/entradas']);
  }

  goToSalida() {
    this.router.navigate(['/inventario/salidas']);
  }

  openModal(template: TemplateRef<any>, dashboard: any, $event: any) {
    $event && $event.stopPropagation();
    this.limpiarFormulario();
    this.modalRef = this.modalService.show(template);
  }

  limpiarFormulario() {
    this.passwordForm.setValue({
      inputPassword: '',
      inputNewPassword: '',
      inputConfirmPassword: ''
    })
  }

  dataValor() {
    const token: any = localStorage.getItem('token');
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    const idAdmin = decodedToken.idAdmin;
    const passwordOrigen = decodedToken.password;
    return { idAdmin, passwordOrigen };
  }

  cambiarPassword() {
    const { inputNewPassword, inputConfirmPassword, inputPassword } = this.passwordForm.value;

    if (inputNewPassword !== inputConfirmPassword) {
      window.alert('Las contraseñas no son iguales');
      return;
    }

    if (!this.passwordForm.valid) {
      window.alert('Error en datos');
      return;
    }

    const { idAdmin, passwordOrigen } = this.dataValor();

    if (passwordOrigen !== inputPassword) {
      window.alert('La contraseña no es correcta');
      return;
    }

    if (passwordOrigen == inputNewPassword) {
      window.alert('La nueva contraseña no puede ser la misma que la anterior');
      return;
    }

    const request = {
      idAdmin: idAdmin,
      newPassword: inputNewPassword,
    };

    // console.log(request); // ! TIENES QUE BORRARLO

    this.adminService.postPassword(request).subscribe((res: any) => {
      // console.log(res);
      if (this.removeToken()) location.reload();
      this.modalRef.hide();
    });
  }

}

