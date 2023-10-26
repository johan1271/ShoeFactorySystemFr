import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Role } from '../../models/interfaces';
import { EditRoleDialogComponent } from './components/edit-role-dialog/edit-role-dialog.component';
import { AppService } from 'src/app/app.service';
import { MatTable } from '@angular/material/table';
import { SnackBarService } from '../../services/snack-bar.service';

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
  loader:boolean;
  roles: Role[] = [
  ];
  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog, public _appService: AppService, private _snackBar: SnackBarService) { 
    this.loader = true;
  }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(): void {
    this._appService.getRoles().subscribe({
      next: (response: any) => {
        console.log(response);
        this.loader = false;
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

          this.createRoles(result.data);
          
        }else{
          console.log("editing")
          this.updateRoles(result.data);
          // const index = this.roles.findIndex(role => role.id === result.data.id);
          // this.roles[index] = result.data;
        }
        
      }
      
    });
  }

  createRoles(result:any){
    console.log(result)
    this._appService.addRoles({name: result.name}).subscribe({
      next: (response: any) => {
        
        this.roles.push(response);
        this._snackBar.openSnackBar('Rol creado', 'Cerrar');
        this.table.renderRows();
      },
      error: (error: any) => {

        if(error.status === 422){
          this._snackBar.openSnackBar('Ya existe este rol', 'Cerrar');
        } 
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      }
    }); 
  }

  updateRoles(result:any){
    console.log(result)
    this._appService.updateRoles(result).subscribe({
      next: (response: any) => {
        console.log(response);
        const index = this.roles.findIndex(role => role.id === response.id);
        this.roles[index] = response;
        this._snackBar.openSnackBar('Rol actualizado', 'Cerrar');
        this.table.renderRows();
      },
      error: (error: any) => {

        if(error.status === 422){
          alert('Ya existe');
        } 
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      }
    }); 
  }

  searchRoleById(event: Event){
    const id = (event.target as HTMLInputElement).value;
    console.log(id)
  }

  
}
