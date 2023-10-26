import { Component,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { AllProductions, Product, Production, User, userProduction } from 'src/app/core/models/interfaces';

@Component({
  selector: 'app-edit-production-dialog',
  templateUrl: './edit-production-dialog.component.html',
  styleUrls: ['./edit-production-dialog.component.scss']
})
export class EditProductionDialogComponent {
  dialogTitle: string;
  isCreating: boolean;
  production: AllProductions;
  productionForm: FormGroup;
  selectedUser: any = 'option2';
  selectedProduct: any;
  users: User[];
  products: Product[];
  constructor( public dialogRef: MatDialogRef<EditProductionDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private _formBuilder: FormBuilder, public _appService: AppService) { 

    this.isCreating = data.isCreating;
    this.production = data.userProduction;
    this.dialogTitle = this.isCreating ? 'Crear producción' : 'Editar producción';
    this.selectedUser = this.production.user_id
    this.selectedProduct = this.production.product_id;
    console.log(this.production)
    this.users = []
    this.products = [];

    this.productionForm = this._formBuilder.group({
      id: [this.production.id,{value: this.production, disabled: true} ],
      date: [this.production.date ? new Date(this.production.date) : new Date(), [Validators.required]],
      user: [!this.isCreating ? this.selectedUser : '', [Validators.required]],
      quantity: [this.production.quantity, [Validators.required]],
      product: [!this.isCreating ? this.selectedProduct : '', [Validators.required]],
    });
    
    if(this._appService.userData.role != 'Administrador'){
      this.productionForm.controls['user'].setValue(this._appService.userData.id);
      console.log(this._appService.userData.id)
      this.productionForm.controls['user'].disable();
    }

    this.productionForm.get('id')?.disable() 
   
    
  }

  ngOnInit(): void {
    this.getUsers();
    this.getProducts();

  }
  
  getUsers(): void {
    this._appService.getUsers().subscribe({
      next: (response: any) => {
        console.log(response)
        //this.loader = false;
        this.users = response;
        
        
        //despues obtener la cookie y luego verificar el token
      },
      error: (error: any) => {
        if(error.status == 500){
          //codigo para recargar la pagina automaticamente
        }
      },
    });
  }

  getProducts(): void {
    this._appService.getProducts().subscribe({
      next: (response: any) => {
        console.log(response)
        //this.loader = false;
        this.products = response;

        if(this._appService.userData.role != 'Administrador'){
          this.products = this.products.filter((product: Product) => product.kind == this._appService.userData.role);
        }
       
        //despues obtener la cookie y luego verificar el token
      },
      error: (error: any) => {
        if(error.status == 500){
          //codigo para recargar la pagina automaticamente
        }
      },
    });
  }


  onSaveClick(): void {
    // Puedes realizar acciones de guardado aquí, por ejemplo, enviar el formulario al servidor
    if(this.productionForm.invalid){
      // Marca todos los campos como tocados para que se muestren los mensajes de error
      this.productionForm.markAllAsTouched();
      return;
    }

    if(this._appService.userData.role == 'Administrador'){

    }

    const formData = this.productionForm.getRawValue();
    console.log(formData)
    // Crea un objeto con los datos del formulario
    

    

    const production = {
      id: this.production.id,
      date: this.formateDate(formData.date),
      product_id: formData.product,
      quantity: formData.quantity,
      user_id: formData.user,
    };
    
    this.dialogRef.close({data: production, isCreating: this.isCreating});
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

    if (this.productionForm) {
      
      return 'Este campo es obligatorio';
      
      
    }
    // Agrega más lógica de validación personalizada aquí según tus requisitos
  
    return '';
  }

  formateDate(date: Date): any{
  
    const formattedDate = date.toISOString().slice(0, 10);
    return formattedDate;
  }
}
