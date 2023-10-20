import { Component,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/core/models/interfaces';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent {
  dialogTitle: string;
  isCreating: boolean;
  user: User;
  userForm: FormGroup;
  constructor( public dialogRef: MatDialogRef<EditUserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private _formBuilder: FormBuilder) { 
    this.isCreating = data.isCreating;
    this.user = data.user;
    this.dialogTitle = this.isCreating ? 'Crear usuario' : 'Editar usuario';
    
    this.userForm = this._formBuilder.group({
      id: [this.user.id, [Validators.required]],
      firstName: [this.user.firstName, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      lastName: [this.user.lastName, [ Validators.required, Validators.min(2), Validators.maxLength(50)]],
      role: [ this.user.role ? this.user.role.id.toString(): '2', Validators.required],
      status: [this.user.role ? this.user.active.toString() : 'true', Validators.required],
    });
    

  }

  onSaveClick(): void {
    // Puedes realizar acciones de guardado aquí, por ejemplo, enviar el formulario al servidor
    if(this.userForm.invalid){
      // Marca todos los campos como tocados para que se muestren los mensajes de error
      this.userForm.markAllAsTouched();
      return;
    }

    const formData = this.userForm.value;

    // Crea un objeto con los datos del formulario
    console.log(formData)
    const user: User = {
      id: formData.id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: {
        id: parseInt(formData.role),
        name: this.getRoleById(parseInt(formData.role)),
      },
      active: formData.status === 'true' ? true : false,
    };
    
    this.dialogRef.close({data: user, isCreating: this.isCreating});
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

    if (this.userForm) {
      
      return 'Este campo es obligatorio';
      
      
    }
    // Agrega más lógica de validación personalizada aquí según tus requisitos
  
    return '';
  }
}
