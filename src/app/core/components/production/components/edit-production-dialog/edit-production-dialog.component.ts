import { Component,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { Product, Production, User } from 'src/app/core/models/interfaces';

@Component({
  selector: 'app-edit-production-dialog',
  templateUrl: './edit-production-dialog.component.html',
  styleUrls: ['./edit-production-dialog.component.scss']
})
export class EditProductionDialogComponent {
  dialogTitle: string;
  isCreating: boolean;
  production: Production;
  productionForm: FormGroup;
  selectedUser: any = 'option2';
  selectedProduct: any;
  users: User[];
  products: Product[];
  constructor( public dialogRef: MatDialogRef<EditProductionDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private _formBuilder: FormBuilder, public _appService: AppService) { 
    this.isCreating = data.isCreating;
    this.production = data.userProduction;
    this.dialogTitle = this.isCreating ? 'Crear producción' : 'Editar producción';
    this.selectedUser = this.production.user;
    this.selectedProduct = this.production.product;
    this.users = []
    this.products = [];
    console.log(this.selectedUser)
    this.productionForm = this._formBuilder.group({
      date: [this.production.date, [Validators.required]],
      user: [!this.isCreating ? this.selectedUser.id : '', [Validators.required]],
      quantity: [this.production.quantity, [Validators.required]],
      product: [!this.isCreating ? this.selectedProduct.id : 'this.users[0]', [Validators.required]],
      
    });
    this.productionForm.controls['user'].setValue('Seleccionar usuario');
  }

  ngOnInit(): void {
    this.getUsers();
    this.getProducts();
  }
  
  getUsers(): void {
    this._appService.getUsers().subscribe({
      next: (response: any) => {
        console.log(response)
        //this.loader = false;
        this.users = response;
        
        //this.productionForm.controls['user'].setValue(this.users[0].id)
        //despues obtener la cookie y luego verificar el token
      },
      error: (error: any) => {
        if(error.status == 500){
          //codigo para recargar la pagina automaticamente
        }
      },
    });
  }

  getProducts(): void {
    this._appService.getProducts().subscribe({
      next: (response: any) => {
        console.log(response)
        //this.loader = false;
        this.products = response;
        //despues obtener la cookie y luego verificar el token
      },
      error: (error: any) => {
        if(error.status == 500){
          //codigo para recargar la pagina automaticamente
        }
      },
    });
  }


  onSaveClick(): void {
    // Puedes realizar acciones de guardado aquí, por ejemplo, enviar el formulario al servidor
    if(this.productionForm.invalid){
      // Marca todos los campos como tocados para que se muestren los mensajes de error
      this.productionForm.markAllAsTouched();
      return;
    }

    const formData = this.productionForm.value;
    console.log(formData)
    // Crea un objeto con los datos del formulario
    
    const production: Production = {
      id: this.production.id,
      date: formData.date + new Date(),
      product: formData.product,
      quantity: formData.quantity,
      user: formData.user,
    };
    
    this.dialogRef.close({data: production, isCreating: this.isCreating});
  }

  getRoleById(id: number): string {
    switch (id) {
      case 1:
        return 'Administrador';
      case 2:
        return 'Empleado';
      case 3:
        return 'Cliente';
      default:
        return '';
    }
  }

  getErrorMessage() {

    if (this.productionForm) {
      
      return 'Este campo es obligatorio';
      
      
    }
    // Agrega más lógica de validación personalizada aquí según tus requisitos
  
    return '';
  }
}
