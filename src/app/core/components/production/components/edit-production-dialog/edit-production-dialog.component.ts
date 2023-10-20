import { Component,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  constructor( public dialogRef: MatDialogRef<EditProductionDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private _formBuilder: FormBuilder) { 
    this.isCreating = data.isCreating;
    this.production = data.production;
    this.dialogTitle = this.isCreating ? 'Crear producción' : 'Editar producción';
    this.selectedUser = this.production.user;
    this.selectedProduct = this.production.product;
    console.log(this.selectedUser)
    this.productionForm = this._formBuilder.group({
      date: [this.production.date, [Validators.required]],
      user: [!this.isCreating ? this.selectedUser.id : '', [Validators.required]],
      quantity: [this.production.quantity, [Validators.required]],
      product: [!this.isCreating ? this.selectedProduct.id : '', [Validators.required]],
      
    });
    this.users = [
      {
        id: 1,
        firstName: 'Juan',
        lastName: 'Perez',
        role: {
          id: 1,
          name: 'Administrador'
        },
        active: true,

      },

      {
        id: 2,
        firstName: 'Morelia',
        lastName: 'Martinez',
        role: {
          id: 2,
          name: 'Empleado'
        },
        active: true,

      },
    ]
    this.products = [
      {
        "id": 1,
        "name": 'Zapato',
        "unitCompensation": 5,
        "price": 100,
        "packageCompensation": 400,
        "kind": 'Calzado'
      },
      {
        "id": 2,
        "name": 'Bota',
        "unitCompensation": 7,
        "price": 150,
        "packageCompensation": 300,
        "kind": 'Calzado'
      },
      {
        "id": 3,
        "name": 'Sandalias',
        "unitCompensation": 3,
        "price": 50,
        "packageCompensation": 200,
        "kind": 'Calzado'
      },
      {
        "id": 4,
        "name": 'Sandalias',
        "unitCompensation": 3,
        "price": 50,
        "packageCompensation": 200,
        "kind": 'Calzado'
      },
      {
        "id": 5,
        "name": 'Sandalias',
        "unitCompensation": 3,
        "price": 50,
        "packageCompensation": 200,
        "kind": 'Calzado'
      },
      {
        "id": 6,
        "name": 'Sandalias',
        "unitCompensation": 3,
        "price": 50,
        "packageCompensation": 200,
        "kind": 'Calzado'
      },
      {
        "id": 7,
        "name": 'Sandalias',
        "unitCompensation": 3,
        "price": 50,
        "packageCompensation": 200,
        "kind": 'Calzado'
      },
      {
        "id": 8,
        "name": 'Sandalias',
        "unitCompensation": 3,
        "price": 50,
        "packageCompensation": 200,
        "kind": 'Calzado'
      },
      {
        "id": 9,
        "name": 'Sandalias',
        "unitCompensation": 3,
        "price": 50,
        "packageCompensation": 200,
        "kind": 'Calzado'
      },
    ];
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
