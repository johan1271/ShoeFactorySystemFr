import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  currentDateTime: string;

  constructor(public _appService: AppService, public cookieService: CookieService, private _router: Router) {
    const now = new Date();
    this.currentDateTime = now.toLocaleString();;
  }

  ngOnInit() {
    
    // Llamada inicial para establecer la fecha.
    this.updateDateTime();
    
    // Actualizar la fecha cada segundo (1000 ms).
    setInterval(() => {
      this.updateDateTime();
    }, 1000);
  }

  updateDateTime() {
    const now = new Date();
    this.currentDateTime = now.toLocaleString();
  }

  logOut(){
    console.log('logOut')
    this.cookieService.delete('userToken');
    
    window.location.reload();
    // setTimeout(() => {
    //   this._router.navigate(['/login']);
    // }, 1000);
    
    
  }
}
