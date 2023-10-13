import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Role } from 'src/app/core/models/interfaces';

@Component({
  selector: 'app-edit-role-dialog',
  templateUrl: './edit-role-dialog.component.html',
  styleUrls: ['./edit-role-dialog.component.scss']
})
export class EditRoleDialogComponent {
  constructor( public dialogRef: MatDialogRef<EditRoleDialogComponent>, @Inject(MAT_DIALOG_DATA) public role: Role) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    // Puedes realizar acciones de guardado aquí, por ejemplo, enviar el formulario al servidor
    
    this.dialogRef.close(this.role);
  }
}
