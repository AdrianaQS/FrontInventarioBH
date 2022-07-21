import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SalidaService } from 'src/app/services/salida.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { JwtHelperService } from '@auth0/angular-jwt';
import { InsumoService } from 'src/app/services/insumo.service';

@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.scss']
})
export class SalidasComponent implements OnInit {

  idAdmin: any;
  arrayInsumos: any;
  salidaForm: FormGroup;
  salidaEditionForm: FormGroup;
  nameAdmin(): string {
    const token: any = localStorage.getItem('token');

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    const nameAdmin = decodedToken.nombreAdmin;
    this.idAdmin = decodedToken.idAdmin;
    //console.log(`Bienvenid@ ${decodedToken.nombreAdmin}`);
    return nameAdmin;
  }
  nameSalida = '';
  idSalida = 0;
  
  modalRef!: BsModalRef;
  numeroSalida: any;
  arrayDetalleSalida: any;
  arraySalidas: any;  
  public page: any;
  constructor(
    private salidaService: SalidaService,
    private modalService: BsModalService,    
    private insumoService: InsumoService,
    private fb: FormBuilder,
   ) {
    this.salidaForm = new FormGroup({
      idInsumo: new FormControl('', [Validators.required]),
      idManufactura: new FormControl('', [Validators.required]),
      idAdmin: new FormControl(''),
      cantInsumos: new FormControl('', [Validators.required]),
      insumos: this.fb.array([this.fb.group({ insumo: [], cantidad: [] })])
    });

    this.salidaEditionForm = new FormGroup({
      idManufactura: new FormControl('', [Validators.required]),
    });
   }

  ngOnInit(): void { 
    this.getSalidas();    
    this.limpiarFormulario();
    this.getListaInsumos();    

  }

  getListaInsumos() {
    this.insumoService.getInsumos().subscribe((res: any) => {
      this.arrayInsumos = res;
      console.log(this.arrayInsumos, 'lista insumos');
    });
  }

  getSalidas() {
    this.salidaService.getSalidas().subscribe((res: any) => {
      this.arraySalidas = res;
    });
  }

  get getInsumos() {
    return this.salidaForm.get('insumos') as FormArray;
  }

  addInsumos() {
    const control = <FormArray>this.salidaForm.controls['insumos'];
    control.push(this.fb.group({ insumo: [], cantidad: [] }));
  }

  removeInsumo(index: number) {
    const control = <FormArray>this.salidaForm.controls['insumos'];
    control.removeAt(index);
  }

  openModal(template: TemplateRef<any>, insumo: any, $event: any) {
    this.limpiarFormulario();
    $event && $event.stopPropagation();
    this.modalRef = this.modalService.show(template);
  }

  openModalDetalle(template: TemplateRef<any>, salida: any, $event: any) {
    this.numeroSalida = salida.idSalida;

    this.salidaService.getDetalleSalida(this.numeroSalida).subscribe((res: any) => {
      this.arrayDetalleSalida = res;
    });
    this.limpiarFormulario();
    $event && $event.stopPropagation();
    this.modalRef = this.modalService.show(template);
  }

  openModalEdition(template: TemplateRef<any>, salida: any, $event: any) {
    this.salidaEditionForm.setValue({
      idProveedor: salida.idProveedor,
      descripcion: salida.descripcion,
      totalInsumos: salida.totalInsumos,
      costoSalida: salida.costoSalida,
    });
    this.limpiarFormulario();
    $event && $event.stopPropagation();
    this.modalRef = this.modalService.show(template);
  }

  enviarFormulario() {
    console.log(this.salidaForm);
    if (this.salidaForm.valid) {
      const request = {
        idAdmin: parseInt(this.idAdmin),
        idManufactura: parseInt(this.salidaForm.value.idManufactura),
        totalInsumos: 12,
        costoSalida: 12,
      };
      console.log(request, 'request');
      this.salidaService.insertSalida(request).subscribe((res: any) => {
        this.getSalidas();
        this.modalRef.hide();
      });
    } else {
      window.alert('Error en el formulario');
    }
  }

  limpiarFormulario() {
    const control = <FormArray>this.salidaForm.controls['insumos'];
    control.removeAt(1);
    this.salidaForm.setValue({
      idInsumo: '',
      idAdmin: '',
      idManufactura: '',
      fechaSalida: '',
      cantInsumos: '',
      insumos: [{
        insumo: [],
        cantidad: []
      }]
    });
  }

  editarSalida() {
    if (this.salidaForm.valid) {
      const request = {
        idInsumo: this.salidaForm.value.idInsumo,
        idAdmin: parseInt(this.salidaForm.value.idAdmin),
        idManufactura: parseInt(this.salidaForm.value.idManufactura),
        fechaSalida: this.salidaForm.value.fechaSalida,
        totalInsumos: parseInt(this.salidaForm.value.totalInsumos),
        costoSalida: parseFloat(this.salidaForm.value.costoSalida),
      };
      const id = this.idSalida;
      this.salidaService.updateSalida(request, id).subscribe((res: any) => {
        this.getSalidas();
        this.modalRef.hide();
        this.idSalida = 0;
        this.limpiarFormulario();
      });
    } else {
      window.alert('Error en el formulario');
    }
  }

  eliminarSalida() {
    const request = {
      id: this.idSalida,
    };
    const id = this.idSalida;
    this.salidaService.deleteSalida(request, id).subscribe((res: any) => {
      this.getSalidas();
      this.modalRef.hide();
      this.idSalida = 0;
    });
  }

}
