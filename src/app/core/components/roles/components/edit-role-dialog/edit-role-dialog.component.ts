import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      name: [this.role.name],
      
    }); 

  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    // Puedes realizar acciones de guardado aquí, por ejemplo, enviar el formulario al servidor
    
    this.dialogRef.close(this.role);
  }
}
