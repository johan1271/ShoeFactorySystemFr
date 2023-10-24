import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  loginForm: FormGroup;
  constructor(public _appService: AppService, private cookieService: CookieService, private _router: Router, private snackBar: MatSnackBar) { 
    this.loginForm = new FormGroup({
      userId: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    //this.getLogin()
    if(this.cookieService.check('userToken')){
      this._router.navigate(['/home/users']);
      return
    }
  }

  login(){
    

    if(this.loginForm.invalid){
      // Marca todos los campos como tocados para que se muestren los mensajes de error
      this.loginForm.markAllAsTouched();
      
      this.openSnackBar('El campo es obligatorio');
      return;
    }

    const userId = parseInt(this.loginForm.get('userId')?.value);
    
    this._appService.getLogin(userId).subscribe({
      next: (response: any) => {
        console.log(response);
        this.cookieService.set('userToken', response);
        this._router.navigate(['/home']);
        //despues obtener la cookie y luego verificar el token
      },
      error: (error: any) => {
        console.log(error);

        if(error.status == 404){
          this.openSnackBar('El usuario no existe');
        }
      },
      complete: () => {
        console.log('complete');
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 2000,
    });
  }

}
