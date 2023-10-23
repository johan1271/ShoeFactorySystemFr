import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private cookiesService: CookieService, private _appService: AppService) { }

  ngOnInit(): void {

    if(this.cookiesService.check('userToken')){
      console.log('existe')
      this._appService.getVerifyToken().subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: (error: any) => {
          console.log(error)
          if(error.status == 401){
            alert('El usuario no esta autorizado')
          }
        },
        complete: () => {
          console.log('complete');
        }
      });

      
    }
  }

}
