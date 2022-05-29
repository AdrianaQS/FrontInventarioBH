import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }
  title = 'sweetAlert';
  showModal(){
    Swal.fire({
      title: 'Añadir Proveedor',
      html:
        '<label></label>Nombre:</label><br/><input id="swal-input1" class="swal2-input" placeholder="Nombre"><br/>' +
        '<br/><label>Ruc:</label><br/><input id="swal-input2" class="swal2-input" placeholder="Ruc"><br/>'+
        '<br/><label>Teléfono:</label><br/><input id="swal-input2" class="swal2-input" placeholder="Teléfono"><br/>'+
        '<br/><label>Ciudad:</label><br/><input id="swal-input2" class="swal2-input" placeholder="Ciudad"><br/>'+
        '<br/><label>Dirección:</label><br/><input id="swal-input2" class="swal2-input" placeholder="Dirección">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
      }
    })
  
  }

}

