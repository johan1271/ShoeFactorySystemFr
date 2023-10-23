import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';
import { Product } from '../../models/interfaces';
import { EditProductDialogComponent } from './components/edit-product-dialog/edit-product-dialog.component';
import { MatTable } from '@angular/material/table';
import { AppService } from 'src/app/app.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    floatLabel: this.floatLabelControl,
  });
  @ViewChild(MatTable) table: MatTable<any> = {} as MatTable<any>;
  search = '';
  products: Product[] = [];

  displayedColumns: string[] = ['id', 'name', 'unitCompensation', 'price', 'packageCompensation', 'kind', 'edit'];

  constructor(private _formBuilder: FormBuilder, public dialogProduct: MatDialog, public _appService: AppService) { }

  ngOnInit(): void {
    this.getProducts();
  }


  getProducts(): void {
    this._appService.getProducts().subscribe({
      next: (response: any) => {
        console.log(response);
        this.products = response;
        //despues obtener la cookie y luego verificar el token
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }


  openEditDialog(isCreating:boolean,product?: Product): void {
    const dialogRef = this.dialogProduct.open(EditProductDialogComponent, {
      width: '313px', // Personaliza el ancho según tus necesidades
      data: {
        isCreating, 
        product: product ? product : {} 
      }, // Puedes pasar datos al componente de diálogo
      //position: { top: '60px', left: '60px' }
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if (result) {
        

        if(result.isCreating){
          this.products.push(result.data);
          
        } else{
          const index = this.products.findIndex(p => p.id === result.data.id);
          if (index !== -1) {
            // Utiliza el método splice para reemplazar el objeto en esa posición
            this.products.splice(index, 1, result.data);
            // Esto reemplazará el objeto en la posición 'index' con 'result'
          }
        }
        this.table.renderRows();

        
        
        // Aquí puedes realizar acciones con los datos editados, si es necesario
      }
    });
  }


  searchProductById(event: Event){
    const value = (event.target as HTMLInputElement).value;
    console.log(value);
    this.search = value;
  }
  
}
