import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userId:string = '';
  constructor(public _appService: AppService, private cookieService: CookieService, private _router: Router) { }

  ngOnInit(): void {
    //this.getLogin()
    if(this.cookieService.check('userToken')){
      this._router.navigate(['/home/users']);
      return
    }
  }

  login(){
    console.log(this.userId)
    
    this._appService.getLogin(parseInt(this.userId)).subscribe({
      next: (response: any) => {
        console.log(response);
        this.cookieService.set('userToken', response);
        this._router.navigate(['/home']);
        //despues obtener la cookie y luego verificar el token
      },
      error: (error: any) => {
        console.log(error);

        if(error.status == 404){
          alert('El usuario no existe')
        }
      },
      complete: () => {
        console.log('complete');
      }
    });
  }

}
