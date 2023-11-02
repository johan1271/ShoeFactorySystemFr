import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from '../../services/snack-bar.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loading: boolean = false;
  loginForm: FormGroup;
  constructor(public _appService: AppService, private cookieService: CookieService, private _router: Router, private _snackBar: SnackBarService) { 
    this.loginForm = new FormGroup({
      userId: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    //this.getLogin()
    if(this.cookieService.check('userToken')){
      
      this._router.navigate(['/home/productions']);
      return
    }
  }

  login(){
    
    this.loading = true;
    if(this.loginForm.invalid){
      // Marca todos los campos como tocados para que se muestren los mensajes de error
      this.loginForm.markAllAsTouched();
      this.loading = false;
      this._snackBar.openSnackBar('El campo es obligatorio', 'Cerrar', 5000);
      return;
    }

    const userId = parseInt(this.loginForm.get('userId')?.value);
    
    this._appService.getLogin(userId).subscribe({
      next: (response: any) => {
        
        this.loading = false;
        this.cookieService.set('userToken', response);
        this._router.navigate(['/home/productions']);
        //despues obtener la cookie y luego verificar el token
      },
      error: (error: any) => {
        console.log(error);
        if(error.status == 500){
          this._snackBar.openSnackBar('Error en el servidor', 'Cerrar', 5000);
        }
        if(error.status == 404){
          this._snackBar.openSnackBar('El usuario no existe', 'Cerrar', 5000);
        }
      },
      
    });
  }

  

}
