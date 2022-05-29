import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SweetAlertArrayOptions } from 'sweetalert2';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.scss']
})
export class InsumosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  title = 'sweetAlert';
  showModal(){
    Swal.fire({
      title: 'Añadir Insumos',
      html:
        '<label></label>Nombre:</label><br/><input id="swal-input1" class="swal2-input" placeholder="Nombre"><br/>' +
        '<br/><label>Descripcion:</label><br/><input id="swal-input2" class="swal2-input" placeholder="Descripcion"><br/>'+
        '<br/><label>Stock:</label><br/><input id="swal-input2" class="swal2-input" placeholder="Stock"><br/>'+
        '<br/><label>Costo:</label><br/><input id="swal-input2" class="swal2-input" placeholder="Costo"><br/>'+
        '<br/><label>Categoria:</label><br/><input id="swal-input2" class="swal2-input" placeholder="Categoria">',
      focusConfirm: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
      }
    })
  
  }

}

