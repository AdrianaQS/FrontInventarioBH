import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.welcomeTest();
  }

  welcomeTest(): boolean {
    const token: any = localStorage.getItem('token');
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    alert(`Bienvenid@ ${decodedToken.nombreAdmin}`);
    return true;
  }
}