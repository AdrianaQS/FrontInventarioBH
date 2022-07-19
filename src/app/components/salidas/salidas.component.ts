import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SalidaService } from 'src/app/services/salida.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.scss']
})
export class SalidasComponent implements OnInit {
  constructor( ) { }

  ngOnInit(): void { }

}
