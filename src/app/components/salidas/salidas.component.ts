import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SalidaService } from 'src/app/services/salida.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { JwtHelperService } from '@auth0/angular-jwt';
import { InsumoService } from 'src/app/services/insumo.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ReportesService } from 'src/app/services/reportes.service';
@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.scss']
})
export class SalidasComponent implements OnInit {
  namePedido = '';
  idSalida = 0;
  idAdmin: any;
  arrayInsumos: any;
  salidaForm: FormGroup;
  salidaEditionForm: FormGroup;
  nameAdministrador = '';
  nameAdmin(): string {
    const token: any = localStorage.getItem('token');
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    this.nameAdministrador = decodedToken.nombreAdmin;
    const nameAdmin = decodedToken.nombreAdmin;
    this.idAdmin = decodedToken.idAdmin;
    //console.log(`Bienvenid@ ${decodedToken.nombreAdmin}`);
    return nameAdmin;
  }
  nameSalida = '';
  modalRef!: BsModalRef;
  numeroSalida: any;
  arrayDetalleSalida: any;
  arraySalidas: any;
  public page: any;

  totalPedido: number;
  totalCantidadPedido: number;
  constructor(
    private salidaService: SalidaService,
    private modalService: BsModalService,
    private insumoService: InsumoService,
    private fb: FormBuilder,
    private reportesService: ReportesService
  ) {

    this.totalPedido = 0;
    this.totalCantidadPedido = 0;
    this.salidaForm = new FormGroup({
      idsalida: new FormControl(''),
      idInsumo: new FormControl(''),
      idManufactura: new FormControl('', [Validators.required]),
      idAdmin: new FormControl(''),
      insumos: this.fb.array([this.fb.group({ insumo: [], cantidad: [], costo: [] })])
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

  downloadPDF() {
    // Extraemos el
    const DATA = document.getElementById('htmlData') !== undefined ? document.getElementById('htmlData') : null;
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    if (DATA !== null) {
      html2canvas(DATA, options).then((canvas) => {

        const img = canvas.toDataURL('image/PNG');

        // Add image Canvas to PDF
        const bufferX = 15;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
        return doc;
      }).then((docResult) => {
        docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
      });
    }
  }


  getSalidas() {
    this.salidaService.getSalidas().subscribe((res: any) => {
      this.arraySalidas = res;
    });
  }

  getListaInsumos() {
    this.insumoService.getInsumos().subscribe((res: any) => {
      this.arrayInsumos = res;
    });
  }

  get getInsumos() {
    return this.salidaForm.get('insumos') as FormArray;
  }

  addInsumos() {
    const control = <FormArray>this.salidaForm.controls['insumos'];
    control.push(this.fb.group({ insumo: [], cantidad: [] }));
    this.totalCantidadYcostoInsumos();
  }

  removeInsumo(index: number) {
    const control = <FormArray>this.salidaForm.controls['insumos'];
    control.removeAt(index);
    this.totalCantidadYcostoInsumos();
  }

  openModal(template: TemplateRef<any>, insumo: any, $event: any) {
    this.limpiarFormulario();
    $event && $event.stopPropagation();
    this.modalRef = this.modalService.show(template);
  }

  totalCantidadYcostoInsumos() {
    let totalCostoDeInsumo = 0;
    let totalDeCantidadPedido = 0;
    this.salidaForm.value.insumos.forEach((value: any) => {
      if (value.costo !== null) {
        totalCostoDeInsumo += parseInt(value.costo);
      }
      if (value.cantidad !== null) {
        totalDeCantidadPedido += parseInt(value.cantidad);
      }
    });
    this.totalPedido = totalCostoDeInsumo;
    this.totalCantidadPedido = totalDeCantidadPedido;
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

  modalEliminacion(template: TemplateRef<any>, salida: any, $event: any) {
    this.namePedido = salida.idPedido;
    this.idSalida = salida.idSalida;
    $event && $event.stopPropagation();
    this.modalRef = this.modalService.show(template);
  }

  enviarFormulario() {
    if (this.salidaForm.valid) {
      this.totalCantidadYcostoInsumos();
      const request = {
        administrador: this.nameAdministrador,
        manufactura: this.salidaForm.value.idManufactura,
        totalInsumos: this.totalCantidadPedido,
        costoSalida: this.totalPedido,
      };
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

  transformFecha(fecha: any) {
    const f = new Date(fecha);
    const dia = f.getDate();
    const mes = f.getMonth() + 1; // Los meses en JavaScript son base 0
    const año = f.getFullYear();

    return `${dia}/${mes}/${año}`;
  }

  onGenerarReporte() {
    const data = this.arraySalidas;
    // console.log(data);
    let newData: any = [];
    data.forEach((salida: any) => {
      const { fecha, nombreAdmin, nombreManufactura, totalInsumos, costoSalida } = salida;

      const newFecha = this.transformFecha(fecha);

      const preData = [newFecha, nombreAdmin, nombreManufactura, totalInsumos, `S/ ${costoSalida}`];

      newData.push(preData);
    });
    console.log(newData);

    const encabezado = ['Fecha', 'Administrador', 'Manufactura', 'Total Insumos', 'Costo Salida'];
    const cuerpo = newData;
    // const cuerpo = [newData];

    const titulo = 'Reporte de Salidas';
    this.reportesService.reporteGeneral(encabezado, cuerpo, titulo, "salidas", true);
  }

  onGenerarReporteDetalle(salida: any) {

    console.log(salida.idSalida);
    this.numeroSalida = salida.idSalida;
    const idSalida = salida.idSalida;
    const fecha = salida.fecha;

    const newFecha = this.transformFecha(fecha);

    const administrador = salida.nombreAdmin;
    const manufactura = salida.nombreManufactura;
    const costoSalida = salida.costoSalida;

    this.salidaService.getDetalleSalida(11).subscribe((res: any) => {
      this.arrayDetalleSalida = res;
    });

    const data = this.arrayDetalleSalida;
    console.log(data);

    let newData: any = [];

    data.forEach((detalleSalida: any) => {
      const { nombreInsumo, costoInsumo, cantidadSalida, costoDetalle } = detalleSalida;

      const preData = [newFecha, administrador, manufactura, `S/ ${costoSalida}`, nombreInsumo, `S/ ${costoInsumo}`, `${cantidadSalida} KG`, `S/ ${costoDetalle}`];
      newData.push(preData);
    });
    console.log(newData);

    const encabezado = ['Fecha', 'Administrador', 'Manufactura', 'Costo Salida', 'Nombre Insumo', 'Costo Insumo', 'Cantidad', 'Costo Detalle'];
    const cuerpo = newData;
    // const cuerpo = [newData];

    const titulo = `Reporte de Detalle Salida #${idSalida}`;
    this.reportesService.reporteGeneral(encabezado, cuerpo, titulo, "detalle_salida", true);
  }

}
