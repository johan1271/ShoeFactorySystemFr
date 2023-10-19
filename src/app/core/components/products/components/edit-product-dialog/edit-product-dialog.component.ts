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
      name: [this.product.name, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      price: [this.product.price, [ Validators.required, Validators.min(0)]],
      unitCompensation: [this.product.unitCompensation,[ Validators.required, Validators.min(0)]],
      packageCompensation: [this.product.packageCompensation, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      kind: [this.product.kind, Validators.required]
    });
    

  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    // Puedes realizar acciones de guardado aquí, por ejemplo, enviar el formulario al servidor
    if(this.productForm.invalid){
      // Marca todos los campos como tocados para que se muestren los mensajes de error
      this.productForm.markAllAsTouched();
      return;
    }

    const formData = this.productForm.value;

    // Crea un objeto con los datos del formulario
    const product: Product = {
      id: this.product.id,
      name: formData.name,
      price: formData.price,
      unitCompensation: formData.unitCompensation,
      packageCompensation: formData.packageCompensation,
      kind: formData.kind
    };

    

    this.dialogRef.close({data: product, isCreating: this.isCreating});
  }

  getErrorMessage() {

    if (this.productForm) {
      
      return 'Este campo es obligatorio';
      
      
    }
    // Agrega más lógica de validación personalizada aquí según tus requisitos
  
    return '';
  }
}
