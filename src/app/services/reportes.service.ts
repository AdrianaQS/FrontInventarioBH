import { Injectable } from '@angular/core'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor() { }

  public reporteGeneral(encabezado: string[], cuerpo: Array<any>, titulo: string, nameDocument: string, guardar?: boolean) {
    const document = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: 'letter'
    });

    document.text(titulo, document.internal.pageSize.width / 2, 25, { align: 'center' });
    if (guardar) {
      const hoy = new Date();

      autoTable(document, {
        head: [encabezado],
        body: cuerpo,
      });

      document.save(`${nameDocument}_${hoy.getDate()}_${hoy.getMonth()}_${hoy.getFullYear()}_${hoy.getTime()}.pdf`);
    } else {

    }
  }

}
