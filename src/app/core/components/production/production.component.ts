import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';
import { MatTable } from '@angular/material/table';
import { AppService } from 'src/app/app.service';
import { Production } from '../../models/interfaces';
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
  
  productions: Production[] = [

    {
      "id": 1,
      "date": '2021-05-05T00:00:00Z',
      "product": {
        "id": 1,
        "name": 'Cordones',
        "unitCompensation": 2,
        "price": 2,
        "packageCompensation": 2,
        "kind": 'Guarnecedor'
      },
      "quantity": 2,
      "user": {
        "id": 1,
        "role": {
          "id": 1,
          "name": 'Empleado'
        },
        "firstName": 'Juan',
        "lastName": 'Perez',
        "active": true,
        
      }
    },
    {
      "id": 2,
      "date": '2021-05-05T00:00:00Z',
      "product": {
        "id": 1,
        "name": 'Suela',
        "unitCompensation": 2,
        "price": 2,
        "packageCompensation": 2,
        "kind": 'Guarnecedor'
      },
      "quantity": 2,
      "user": {
        "id": 1,
        "role": {
          "id": 1,
          "name": 'Administrador'
        },
        "firstName": 'Morelia',
        "lastName": 'MArtine',
        "active": true,
      }
    },
  ];
  
  displayedColumns: string[] = ['id', 'date', 'nameProduct', 'quantity', 'userName', 'edit'];

  constructor(private _formBuilder: FormBuilder, public dialogProduct: MatDialog, public _appService: AppService) { }

  ngOnInit(): void {
    //this.getUsers();
  }


  getUsers(): void {
    this._appService.getUsers().subscribe((response: any) => {
      console.log(response);
      //this.products = response;
    });
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }


  openEditDialog(isCreating:boolean,production?: Production): void {
    const dialogRef = this.dialogProduct.open(EditProductionDialogComponent, {
      width: '313px', // Personaliza el ancho según tus necesidades
      data: {
        isCreating, 
        production: production ? production : {} 
      }, // Puedes pasar datos al componente de diálogo
      //position: { top: '60px', left: '60px' }
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log(result);

        if(result.isCreating){
          this.productions.push(result.data);
          
          return;
        }

        const index = this.productions.findIndex(p => p.id === result.data.id);
        if (index !== -1) {
          // Utiliza el método splice para reemplazar el objeto en esa posición
          this.productions.splice(index, 1, result.data);
          
          // Esto reemplazará el objeto en la posición 'index' con 'result'
        }
        this.table.renderRows();
        // Aquí puedes realizar acciones con los datos editados, si es necesario
      }
    });
  }
}
