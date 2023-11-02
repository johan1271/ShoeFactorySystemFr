import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';
import { MatTable } from '@angular/material/table';
import { AppService } from 'src/app/app.service';
import { AllProductions, Production, User, userProduction } from '../../models/interfaces';
import { EditProductionDialogComponent } from './components/edit-production-dialog/edit-production-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from '../../services/snack-bar.service';

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
  productions: AllProductions[] = [];
  
  displayedColumns: string[] = ['id', 'employeeName', 'rol','productName' ,'quantity', 'date', 'edit'];

  constructor(private _formBuilder: FormBuilder, public dialogProduct: MatDialog, public _appService: AppService, private _snackBar: SnackBarService) { 
    this.loader = true;
  }

  ngOnInit(): void {
    this.getProduction();
  }


  getProduction(): void {

  
    this._appService.getProduction().subscribe({
      next: (response: any) => {
        
        this.loader = false;
        this.productions = response;
      },
      error: (error: any) => {
        console.log(error);

        if(error.status == 500){
          //codigo para recargar la pagina automaticamente
        }

      },
      
  
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
      
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      
      if(!result){
        return
      }

      if (result.isCreating) {
        this.createProduction(result.data);

      } else {

        this.updateProduction(result.data);
      }

    });
  }

  createProduction(result: any){
    let production = result;
    const {id, ...newProduction} = production;
    
    this._appService.addProduction(newProduction).subscribe({
      next: (response: any) => {
        console.log(response)
        this._snackBar.openSnackBar('Produccion creada correctamente', 'Cerrar');
        this.getProduction();
        
        // this.productions.push(response);
        // this.table.renderRows();
      },
      error: (error: any) => {
        console.log(error);

        if(error.status == 500){
          //window.location.reload();
          //codigo para recargar la pagina automaticamente
        }

        if(error.status == 422){
          this._snackBar.openSnackBar('El usuario no puede producir este producto','Cerrar');
        }

      },
      
  
    });      
  }

  updateProduction(result: any){
    
    
    
    this._appService.updateProduction(result).subscribe({
      next: (response: any) => {
        
        this._snackBar.openSnackBar('Produccion actualizada correctamente', 'Cerrar');
        this.getProduction();
        
        // this.productions.push(response);
        // this.table.renderRows();
      },
      error: (error: any) => {
        console.log(error);

        if(error.status == 500){
          window.location.reload();
          //codigo para recargar la pagina automaticamente
        }

        if(error.status == 422){
          this._snackBar.openSnackBar('El usuario no puede producir este producto', 'Cerrar');
        }

      },

    });      
  }

  searchProductionById(event: Event){
    const id = parseInt((event.target as HTMLInputElement).value);
    if(id == null || id == undefined || Number.isNaN(id)){
      return
    }

    if (id) {
      this._appService.getAllProductionsById(id).subscribe({
        next: (response: any) => {
          
          this.productions = [response];
        },
        error: (error: any) => {
          console.log(error);
        },
  
      });
    }
  }

  updateSearch(): void {
    
    if(this.search == ''){
      this.getProduction();
    }
  }
}
