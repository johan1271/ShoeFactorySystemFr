import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Role } from '../../models/interfaces';
import { EditRoleDialogComponent } from './components/edit-role-dialog/edit-role-dialog.component';
import { AppService } from 'src/app/app.service';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent {
  @ViewChild(MatTable) table: MatTable<any> = {} as MatTable<any>;
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    floatLabel: this.floatLabelControl,
  });
  search:string = '';

  roles: Role[] = [
  ];
  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog, public _appService: AppService) { 
    
  }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(): void {
    this._appService.getRoles().subscribe({
      next: (response: any) => {
        console.log(response);
        this.roles = response;
        //despues obtener la cookie y luego verificar el token
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
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
      console.log(result);
      if(result){
        if(result.isCreating){
          this.roles.push(result.data);
          
        }else{
          console.log("editing")
          const index = this.roles.findIndex(role => role.id === result.data.id);
          this.roles[index] = result.data;
        }
        this.table.renderRows();
      }
      
    });
  }

  searchRoleById(event: Event){
    const id = (event.target as HTMLInputElement).value;
    console.log(id)
  }

  
}
