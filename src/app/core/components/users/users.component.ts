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
  //dataSource = new MatTableDataSource(users);


  users: User[] = [

    {
      "id": 1,
      "role": {
        "id": 1,
        "name": 'Administrador'
      },
      "firstName": 'Maicol',
      "lastName": 'Reproductor',
      "active": true,

    },

    {
      "id": 2,
      "role": {
        "id": 2,
        "name": 'Empleado'
      },
      "firstName": 'Daniel',
      "lastName": 'Lopez',
      "active": false,

    },
  ];

  displayedColumns: string[] = ['id', 'roleName', 'firstName', 'lastName', 'active', 'edit'];

  constructor(private _formBuilder: FormBuilder, public dialogProduct: MatDialog, public _appService: AppService) { }

  ngOnInit(): void {
    //this.getUsers();
  }


  getUsers(): void {
    this._appService.getUsers().subscribe((response: any) => {
      console.log(response);
      //this.products = response;
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
        this.users.push(result.data);
        this.table.renderRows();
        
      } else {
        const index = this.users.findIndex(p => p.id === result.data.id);
        if (index !== -1) {
          // Utiliza el método splice para reemplazar el objeto en esa posición
          this.users.splice(index, 1, result.data);

          // Esto reemplazará el objeto en la posición 'index' con 'result'
        }
        this.table.renderRows();
        // Aquí puedes realizar acciones con los datos editados, si es necesario
      }

      

    });
    
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
