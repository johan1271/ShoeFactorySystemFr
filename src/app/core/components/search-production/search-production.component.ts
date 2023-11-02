import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jspdf, { jsPDF } from 'jspdf';
import 'jsbarcode';
import { AppService } from 'src/app/app.service';
import { productionsByUser, userProduction } from '../../models/interfaces';
import { SnackBarService } from '../../services/snack-bar.service';
import * as JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-search-production',
  templateUrl: './search-production.component.html',
  styleUrls: ['./search-production.component.scss']
})
export class SearchProductionComponent {

  form: FormGroup;

  productions: productionsByUser;
  loader: boolean = true;
  constructor(private formBuilder: FormBuilder, public _appService: AppService, private snackBar: SnackBarService) {
    this.form = this.formBuilder.group({
      search: ['', [Validators.required]],

      startDate: [''],
      endDate: [''],

    });
    this.productions = {
      production: [],
      total_compensation: 0
    }
  }

  ngOnInit(): void {
    this.getAllProductions();
  }

  getAllProductions() {
    this._appService.getAllProductions().subscribe({
      next: (response: any) => {
        
        this.loader = false;
        if(Object.keys(response).length === 0){
         //this.snackBar.openSnackBar('No se encontraron resultados', 'Cerrar');
          this.productions.production = [];
          this.productions.total_compensation = 0;
          return;
        }
        this.productions.total_compensation = 0;
        this.productions.production = response.production;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  searchProduction() {


    if (this.form.invalid) {
      this.snackBar.openSnackBar('Debe llenar el campo de busqueda', 'Cerrar');
      return;
    }
    const formData = this.form.value;
    this.loader = true;
    

    if (!formData.startDate && !formData.endDate) {

      this._appService.getProductionById(parseInt(formData.search)).subscribe({
        next: (response: any) => {
          
          this.loader = false;
          if (Object.keys(response).length === 0) {
            this.snackBar.openSnackBar('No se encontraron resultados', 'Cerrar');
            this.productions.production = [];
            this.productions.total_compensation = 0;
            return;
          }
          const { production, total_compensation } = response;

          this.productions.production = production;
          this.productions.total_compensation = total_compensation;
        },
        error: (error: any) => {
          console.log(error);
        }
      })

    } else if (formData.startDate && formData.endDate) {
      this.loader = false;
      const startDate = formData.startDate.toISOString().slice(0, 10);
      const endDate = formData.endDate.toISOString().slice(0, 10);

      this._appService.getProductionByDate(parseInt(formData.search), startDate, endDate).subscribe({
        next: (response: any) => {
          

          if (Object.keys(response).length === 0) {
            
            this.snackBar.openSnackBar('No se encontraron resultados', 'Cerrar');
            this.productions.production = [];
            this.productions.total_compensation = 0;
            return;
          }

          const { production, total_compensation } = response;
          this.productions.production = production;
          this.productions.total_compensation = total_compensation;
        },
        error: (error: any) => {
          console.log(error);
        }
      })

    } else {
      this.loader = false;
      this.snackBar.openSnackBar('Debe llenar los campos de fecha', 'Cerrar');
    }
  }

  updateSearch(): void {
    if (this.form['controls']['search'].value == '') {
      this.getAllProductions();
    }

  }

  clearDates() {
    this.form['controls']['startDate'].reset();
    this.form['controls']['endDate'].reset();
  }

  generatePDF(production: userProduction, index: number) {
    const doc = new jsPDF();

    const labelWidth = 80; // Ancho de la etiqueta en puntos
    const labelHeight = 80; // Alto de la etiqueta en puntos
    const labelXStart = 10;
    const labelYStart = 15;
    const barcodeHeight = 20; // Alto del código de barras
    const separatorY = labelYStart + labelHeight - barcodeHeight - 5; // Coordenada Y de la línea separadora

    // Agregar un cuadro alrededor de la etiqueta
    doc.setLineWidth(0.5); // Grosor de la línea
    doc.rect(labelXStart, labelYStart, labelWidth, labelHeight);

    // Agregar título
    doc.setFontSize(16);
    doc.text('Paquete #' + index, labelXStart + 5, labelYStart + 10);

    // Agregar detalles de producción
    doc.setFontSize(12);
    doc.text(`Producto: ${production.name}`, labelXStart + 5, labelYStart + 20);
    doc.text(`Fecha: ${production.date}`, labelXStart + 5, labelYStart + 27);
    doc.text(`Empleado: ${production.employee_name}`, labelXStart + 5, labelYStart + 34);
    doc.text(`Rol: ${production.role_name}`, labelXStart + 5, labelYStart + 41);
    doc.text(`Compensación: ${production.compensation.toString()}`, labelXStart + 5, labelYStart + 48);

    // Generar y mostrar un código de barras ficticio
    const barcodeValue = this.generateUUID(); // Valor ficticio del código de barras
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, barcodeValue, {
      format: 'CODE128',
      displayValue: true,
    });

    // Convertir el código de barras en una imagen y añadirla al PDF
    const barcodeDataURL = canvas.toDataURL('image/png');
    doc.addImage(barcodeDataURL, 'PNG', labelXStart + 15, labelYStart + 57, 50, barcodeHeight);

    // Agregar una línea separadora debajo del código de barras
    doc.setLineWidth(0.5); // Grosor de la línea
    doc.line(labelXStart, separatorY, labelXStart + labelWidth, separatorY);

    // Guardar o mostrar el PDF
    doc.save('etiqueta.pdf'); // Para guardar el PDF
    // doc.output('dataurlnewwindow'); // Para mostrar el PDF en una nueva ventana
  }

  generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  generateAllPDF() {
    const doc = new jsPDF();
  
    const labelWidth = 65; // Ancho de la etiqueta en puntos
    const labelHeight = 50; // Alto de la etiqueta en puntos
    const spacing = 10; // Espacio entre etiquetas en puntos
    const labelsPerRow = 2; // Máximo de etiquetas por fila
    const labelsPerPage = 8; // Máximo de etiquetas por página
  
    const labelXStart = 10;
    const labelYStart = 15;
    let labelsOnPage = 0;
  
    for (let i = 0; i < this.productions.production.length; i++) {

      if(this.productions.production[i].quantity< 12){
        continue;
      }

      if (labelsOnPage >= labelsPerPage) {
        doc.addPage();
        labelsOnPage = 0;
      }

      const x = labelXStart + (labelsOnPage % labelsPerRow) * (labelWidth + spacing);
      const y = labelYStart + Math.floor(labelsOnPage / labelsPerRow) * (labelHeight + spacing);
      // Agregar un cuadro alrededor de la etiqueta
      doc.setLineWidth(0.5); // Grosor de la línea
      doc.rect(x - 4, y - 7, labelWidth, labelHeight + 8);

      // Agregar una línea separadora debajo del código de barras
      doc.setLineWidth(0.5); // Grosor de la línea
      doc.line(labelXStart - 4, 50, labelXStart + 61, 50);

      if( labelsOnPage == 1){
        doc.line(labelXStart + 71, 50, labelXStart + 136, 50);
      } else if (labelsOnPage == 2){
        doc.line(labelXStart -4 , 110, labelXStart + 61, 110 );
      } else if (labelsOnPage == 3){
        doc.line(labelXStart + 71, 110, labelXStart + 136, 110);
      } else if(labelsOnPage == 4){
        doc.line(labelXStart - 4, 170, labelXStart + 61, 170);
      } else if(labelsOnPage == 5){
        doc.line(labelXStart + 71, 170, labelXStart + 136, 170);
      } else if(labelsOnPage == 6){
        doc.line(labelXStart - 4, 230, labelXStart + 61, 230);
      } else if(labelsOnPage == 7){
        doc.line(labelXStart + 71, 230, labelXStart + 136, 230);
      }

      // Agregar título
      doc.setFontSize(10);
      doc.text('Paquete #' + (i + 1), x, y);
  
      // Agregar detalles de producción
      doc.setFontSize(8);
      doc.text(`Producto: ${this.productions.production[i].name}`, x, y + 10);
      doc.text(`Fecha: ${this.productions.production[i].date}`, x, y + 15);
      doc.text(`Empleado: ${this.productions.production[i].employee_name}`, x, y + 20);
      doc.text(`Rol: ${this.productions.production[i].role_name}`, x, y + 25);
      doc.text(`Compensación: ${this.productions.production[i].compensation.toString()}`, x, y + 30);
  
      // Generar y mostrar un código de barras ficticio
      const barcodeValue = this.generateUUID(); // Valor ficticio del código de barras
      const canvas = document.createElement('canvas');
      JsBarcode(canvas, barcodeValue, {
        format: 'CODE128',
        displayValue: true,
      });
  
      // Convertir el código de barras en una imagen y añadirla al PDF
      const barcodeDataURL = canvas.toDataURL('image/png');
      doc.addImage(barcodeDataURL, 'PNG', x + 4, y + 38, 50, 10);
  
      labelsOnPage++;
    }
  
    doc.save('etiquetas.pdf');
  }






}
