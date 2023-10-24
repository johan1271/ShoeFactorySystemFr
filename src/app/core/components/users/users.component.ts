import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { User } from '../../models/interfaces';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FloatLabelType } from '@angular/material/form-field';
import { EditUserDialogComponent } from './components/edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    floatLabel: this.floatLabelControl,
  });
  @ViewChild(MatTable) table: MatTable<any> = {} as MatTable<any>;
  @ViewChild('edit-btn') editBtn: ElementRef = {} as ElementRef;
  search = '';
  loader:boolean;
  //dataSource = new MatTableDataSource(users);


  users: User[] = [];

  displayedColumns: string[] = ['id', 'roleName', 'firstName', 'lastName', 'active', 'edit'];

  constructor(private _formBuilder: FormBuilder, public dialogProduct: MatDialog, public _appService: AppService) {
    this.loader = true;
  }

  ngOnInit(): void {
    //this.loader = true;
    this.getUsers();
    //this.getLogin();
  }


  getUsers(): void {
    this._appService.getUsers().subscribe({
      next: (response: any) => {
        console.log(response)
        this.loader = false;
        this.users = response;
        //despues obtener la cookie y luego verificar el token
      },
      error: (error: any) => {
        console.log(error);

        if(error.status == 500){
          //codigo para recargar la pagina automaticamente


        }
      },
      complete: () => {
        console.log('complete');
      }
    });
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }


  openDialog(isCreating: boolean, event: Event, user?: User): void {
    const dialogRef = this.dialogProduct.open(EditUserDialogComponent, {
      width: '313px', // Personaliza el ancho según tus necesidades
      data: {
        isCreating,
        user: user ? user : {}
      }, // Puedes pasar datos al componente de diálogo
      //position: { top: '60px', left: '60px' }
    });

    dialogRef.afterClosed().subscribe((result: any) => {

      if (!result) {
        return
      }

      if (result.isCreating) {
        this.createUser(result);

      } else {

        this.updateUser(result);
      
        // Aquí puedes realizar acciones con los datos editados, si es necesario
      }

    });
    
  }

  createUser(result: any): void {
    let user = result.data;
    const { role, active, ...newUser } = user;
    console.log(newUser)
    this._appService.addUsers(newUser).subscribe({
      next: (response: any) => {
        console.log(response)
        response.role = this.getRoleById(response.role_id);
        this.users = [...this.users, response];
        //despues obtener la cookie y luego verificar el token
      },
      error: (error: any) => {
        console.log(error);

        if(error.status == 500){
          //codigo para recargar la pagina automaticamente
        }

      },
      complete: () => {
        console.log('complete');
      }
    });
  }

  updateUser(result: any): void {
    let user = result.data;
    const { role, ...newUser } = user;
    this._appService.putUsers(newUser).subscribe({
      next: (response: any) => {
        console.log(response)
        response.role = this.getRoleById(response.role_id);
        const index = this.users.findIndex(role => role.id === response.id);
        this.users[index] = response;
        this.table.renderRows();
      },
      error: (error: any) => {
        console.log(error);

        if(error.status == 500){
          //codigo para recargar la pagina automaticamente
        }

      },
      complete: () => {
        console.log('complete');
      }
    });
    console.log(result)
  }


  getRoleById(id: number): string {
    switch (id) {
      case 1:
        return 'Guarnecedor';
      case 2:
        return 'Cortador';
      case 3:
        return 'Ensamblador';
      default:
        return '';
    }
  }

  searchUserById(event: Event): void {
    const id = (event.target as HTMLInputElement).value;
    console.log(id)
    if (id) {
      //this.users = this.users.filter(p => p.id === Number(id));

      // this._appService.getUserById(id).subscribe((response: any) => {
      //   console.log(response);
      //   //this.products = response;
      // });
    }
  }
}
