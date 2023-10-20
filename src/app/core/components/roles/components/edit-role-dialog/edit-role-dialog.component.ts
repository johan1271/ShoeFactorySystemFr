import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Role } from 'src/app/core/models/interfaces';

@Component({
  selector: 'app-edit-role-dialog',
  templateUrl: './edit-role-dialog.component.html',
  styleUrls: ['./edit-role-dialog.component.scss']
})
export class EditRoleDialogComponent {

  dialogTitle: string;
  isCreating: boolean;
  role: Role;
  roleForm: FormGroup;

  constructor( public dialogRef: MatDialogRef<EditRoleDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder) { 
    this.isCreating = data.isCreating;
    this.role = data.role;
    this.dialogTitle = this.isCreating ? 'Crear rol' : 'Editar rol';
    
    this.roleForm = this._formBuilder.group({
      name: [this.role.name, [ Validators.required, Validators.minLength(3), Validators.maxLength(50) ]],
      
    }); 

  }

  onSaveClick(): void {
    // Puedes realizar acciones de guardado aquí, por ejemplo, enviar el formulario al servidor
    
    if(this.roleForm.invalid){
      // Marca todos los campos como tocados para que se muestren los mensajes de error
      this.roleForm.markAllAsTouched();
      return;
    }

    const formData = this.roleForm.value;

    // Crea un objeto con los datos del formulario
    const role: Role = {
      id: this.role.id,
      name: formData.name,
    };

    this.dialogRef.close({data: role, isCreating: this.isCreating});
  }

  getErrorMessage() {

    if (this.roleForm) {
      return 'Este campo es obligatorio';
    }
    // Agrega más lógica de validación personalizada aquí según tus requisitos
    return '';
  }
}
