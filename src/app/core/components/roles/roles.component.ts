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

  openRoleDialog(isCreating: boolean, role?: Role){
    const dialogRef = this.dialog.open(EditRoleDialogComponent, {
      width: '313px',
      data: {
        isCreating, 
        role: role ? role : {} 
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  

  }

  

  
}
