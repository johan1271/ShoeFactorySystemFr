import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';
import { MatTable } from '@angular/material/table';
import { AppService } from 'src/app/app.service';
import { Production, userProduction } from '../../models/interfaces';
import { EditProductionDialogComponent } from './components/edit-production-dialog/edit-production-dialog.component';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss']
})
export class ProductionComponent {
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    floatLabel: this.floatLabelControl,
  });
  @ViewChild(MatTable) table: MatTable<any> = {} as MatTable<any>;
  search:string = '';
  loader:boolean;
  productions: userProduction[] = [
  ];
  
  displayedColumns: string[] = ['employeeName', 'productName', 'quantity','unit_price' ,'percentage', 'price', 'compensation', 'edit'];

  constructor(private _formBuilder: FormBuilder, public dialogProduct: MatDialog, public _appService: AppService) { 
    this.loader = true;
  }

  ngOnInit(): void {
    this.getProduction();
  }


  getProduction(): void {

  
    this._appService.getProduction().subscribe({
      next: (response: any) => {
        console.log(response)
        this.loader = false;
        this.productions = response.production;
        //despues obtener la cookie y luego verificar el token
      },
      error: (error: any) => {
        console.log(error);

        if(error.status == 500){
          //codigo para recargar la pagina automaticamente
        }

      },
      complete: () => {
        console.log('complete');
      }
  
    });      
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }


  openEditDialog(isCreating:boolean,userProduction?: userProduction): void {
    const dialogRef = this.dialogProduct.open(EditProductionDialogComponent, {
      width: '313px', // Personaliza el ancho según tus necesidades
      data: {
        isCreating, 
        userProduction: userProduction ? userProduction : {} 
      }, // Puedes pasar datos al componente de diálogo
      //position: { top: '60px', left: '60px' }
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // console.log(result);

        // if(result.isCreating){
        //   this.productions.push(result.data);
          
        //   return;
        // }

        // const index = this.productions.findIndex(p => p. === result.data.id);
        // if (index !== -1) {
        //   // Utiliza el método splice para reemplazar el objeto en esa posición
        //   this.productions.splice(index, 1, result.data);
          
        //   // Esto reemplazará el objeto en la posición 'index' con 'result'
        // }
        this.table.renderRows();
        // Aquí puedes realizar acciones con los datos editados, si es necesario
      }
    });
  }
}
