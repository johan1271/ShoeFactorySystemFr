import { Component,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Production } from 'src/app/core/models/interfaces';

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
  constructor( public dialogRef: MatDialogRef<EditProductionDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private _formBuilder: FormBuilder) { 
    this.isCreating = data.isCreating;
    this.production = data.production;
    this.dialogTitle = this.isCreating ? 'Crear usuario' : 'Editar usuario';
    
    this.productionForm = this._formBuilder.group({
      date: [this.production.date, [Validators.required]],
      product: [this.production.product, [Validators.required]],
      quantity: [this.production.quantity, [Validators.required]],
      user: [this.production.user, [Validators.required]],
      
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
