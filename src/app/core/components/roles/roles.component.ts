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
        
        this.loader = false;
        this.roles = response;
        //despues obtener la cookie y luego verificar el token
      },
      error: (error: any) => {
        console.log(error);
      },
      
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
      
      if(result){
        if(result.isCreating){

          this.createRoles(result.data);
          
        }else{
          
          this.updateRoles(result.data);
          
        }
        
      }
      
    });
  }

  createRoles(result:any){
    
    this._appService.addRoles({name: result.name}).subscribe({
      next: (response: any) => {
        
        this.roles.push(response);
        this._snackBar.openSnackBar('Rol creado', 'Cerrar');
        this.table.renderRows();
      },
      error: (error: any) => {
        if(error.status == 500){
          this._snackBar.openSnackBar('Error en el servidor', 'Cerrar', 5000);
        }
        if(error.status === 422){
          this._snackBar.openSnackBar('Ya existe este rol', 'Cerrar');
        } 
        
      },
      
    }); 
  }

  updateRoles(result:any){
    
    this._appService.updateRoles(result).subscribe({
      next: (response: any) => {
        
        const index = this.roles.findIndex(role => role.id === response.id);
        this.roles[index] = response;
        this._snackBar.openSnackBar('Rol actualizado', 'Cerrar');
        this.table.renderRows();
      },
      error: (error: any) => {

        if(error.status === 422){
          alert('Ya existe');
        } 
        if(error.status == 500){
          this._snackBar.openSnackBar('Error en el servidor', 'Cerrar', 5000);
        }
        console.log(error);
      },
      
    }); 
  }

  searchRoleById(event: Event){
    const id = parseInt((event.target as HTMLInputElement).value);
    if(id == null || id == undefined || Number.isNaN(id)){
      return
    }

    if (id) {
      this._appService.getRoleById(id).subscribe({
        next: (response: any) => {
          
          this.roles = [response];
        },
        error: (error: any) => {
          console.log(error);
          if(error.status == 500){
            this._snackBar.openSnackBar('Error en el servidor', 'Cerrar', 5000);
          }
        },
        
      });
    }
  }


  updateSearch(){
    if(this.search === ''){
      this.getRoles(); 
    }
  }
  
}
