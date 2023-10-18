import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Role } from '../../models/interfaces';
import { EditRoleDialogComponent } from './components/edit-role-dialog/edit-role-dialog.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent {
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    floatLabel: this.floatLabelControl,
  });

  roles: Role[] = [
    {
      "id": 1,
      "name": 'Guarnecedor',
    },
    {
      "id": 2,
      "name": 'Cortador',
    },
    {
      "id": 3,
      "name": 'Ensamblador',
    },
  ];
  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog) {
    
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  editRole(role: any) {
    
    console.log(role);
  }

  openEditDialog(role: Role): void {
    const dialogRef = this.dialog.open(EditRoleDialogComponent, {
      width: '300px', // Personaliza el ancho según tus necesidades
      data: role, // Puedes pasar datos al componente de diálogo
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log(result);
        // Aquí puedes realizar acciones con los datos editados, si es necesario
      }
    });

  }

  openCreateRoleDialog(): void {
    const dialogRef = this.dialog.open(EditRoleDialogComponent, {
      width: '300px', // Personaliza el ancho según tus necesidades
      data: {}, // Puedes pasar datos al componente de diálogo
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log(result);
        // Aquí puedes realizar acciones con los datos editados, si es necesario
      }
    });

  }

  

  
}
