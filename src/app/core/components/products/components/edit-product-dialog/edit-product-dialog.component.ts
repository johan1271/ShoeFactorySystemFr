import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/core/models/interfaces';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.scss']
})
export class EditProductDialogComponent {

  dialogTitle: string;
  isCreating: boolean;
  product: Product;
  productForm: FormGroup;
  constructor( public dialogRef: MatDialogRef<EditProductDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private _formBuilder: FormBuilder) { 
    this.isCreating = data.isCreating;
    
    this.product = data.product;
    this.dialogTitle = this.isCreating ? 'Crear producto' : 'Editar producto';
    
    this.productForm = this._formBuilder.group({
      name: [this.product.name, Validators.required],
      price: [this.product.price, Validators.required],
      unitCompensation: [this.product.unitCompensation, Validators.required],
      packageCompensation: [this.product.packageCompensation, Validators.required],
      kind: [this.product.kind, Validators.required]
    });
    
    

  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    // Puedes realizar acciones de guardado aquí, por ejemplo, enviar el formulario al servidor
    if(this.productForm.invalid){
      return;
    }
    const formData = this.productForm.value;

    // Accede a los valores de los campos
    const name = formData.name;
    const price = formData.price;
    const unitCompensation = formData.unitCompensation;
    const packageCompensation = formData.packageCompensation;
    const kind = formData.kind;
    console.log('Nombre:', name);
    console.log('Precio:', price);
    console.log('Compensación unitaria:', unitCompensation);
    console.log('Compensación de paquete:', packageCompensation);
    console.log('Tipo:', kind);

    this.dialogRef.close(this.product);
  }
}
