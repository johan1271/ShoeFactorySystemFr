import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from 'src/app/app.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService, public _appService:AppService) {}

  canActivate(): boolean {
    // Verifica si el usuario tiene un token de autenticación en las cookies
    const userToken = this.cookieService.get('userToken');
    console.log('userToken', userToken)
    if (userToken) {
      
      return true; // Permite el acceso a la ruta protegida
    } else {
      this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión si no está autenticado
      return false; // No permite el acceso a la ruta protegida
    }
  }
}
