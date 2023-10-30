import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';
import { Product } from '../../models/interfaces';
import { EditProductDialogComponent } from './components/edit-product-dialog/edit-product-dialog.component';
import { MatTable } from '@angular/material/table';
import { AppService } from 'src/app/app.service';
import { SnackBarService } from '../../services/snack-bar.service';


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
  loader: boolean;
  displayedColumns: string[] = ['id', 'name', 'unitCompensation', 'price', 'packageCompensation', 'kind', 'edit'];

  constructor(private _formBuilder: FormBuilder, public dialogProduct: MatDialog, public _appService: AppService, private _snackBar: SnackBarService) { 
    this.loader = true;
  }

  ngOnInit(): void {
    this.getProducts();
  }


  getProducts(): void {
    this._appService.getProducts().subscribe({
      next: (response: any) => {
        console.log(response);
        this.loader = false;
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
          this.createProduct(result.data);
          
          
        } else{

          this.updateProduct(result.data);
        }
        // Aquí puedes realizar acciones con los datos editados, si es necesario
      }
    });
  }

  createProduct(result: any): void {
    let product = result;
    const {id, ...newProduct} = product;
    
    this._appService.addProducts(product).subscribe({
      next: (response: any) => {
        console.log(response)
       //response.role = this.getRoleById(response.role_id);
        this.products = [...this.products, response];
        this._snackBar.openSnackBar('Producto creado correctamente', 'Cerrar', 5000);
        this.table.renderRows();
      },
      error: (error: any) => {
        

        if(error.status == 500){
          window.location.reload();
        }

      },
      complete: () => {
        console.log('complete');
      }
    });
  }

  updateProduct(result: any): void {
    let product = result;
    
    this._appService.putProducts(product).subscribe({
      next: (response: any) => {
        console.log(response)
        //response.role = this.getRoleById(response.role_id);
        const index = this.products.findIndex(p => p.id === response.id);
        
        this.products[index] = response;

        this._snackBar.openSnackBar('Producto actualizado correctamente', 'Cerrar', 5000);
        this.table.renderRows();
      },
      error: (error: any) => {
        console.log(error);

        if(error.status == 500){
          window.location.reload();
        }

      },
      complete: () => {
        console.log('complete');
      }
    });
  }

  searchProductById(event: Event){
    const id = parseInt((event.target as HTMLInputElement).value);

    if(id == null || id == undefined || Number.isNaN(id)){
      return
    }

    if (id) {
      this._appService.getProductById(id).subscribe({
        next: (response: any) => {
          console.log(response);
          this.products = [response];
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

  }
  
  updateSearch(): void {
    
    if(this.search == ''){
      this.getProducts();
    }
  }
}
