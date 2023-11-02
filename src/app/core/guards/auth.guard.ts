import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from 'src/app/app.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService, public _appService: AppService) {}

  canActivate(): boolean {
    // Verifica si el usuario tiene un token de autenticación en las cookies
    const userToken = this.cookieService.get('userToken');

    if (userToken) {
      // Hacer una solicitud asincrónica para verificar el token
      this._appService.getVerifyToken().subscribe({
        next: (response: any) => {

          if (this.router.url === '/home/users' && response.role === 'Administrador' || this.router.url == '/home/products' && response.role === 'Administrador' || this.router.url == '/home/roles' && response.role === 'Administrador' || this.router.url === '/home/search-production') {
            // El usuario tiene permiso, permite el acceso
            
            return true;
          } else {
            // El usuario no tiene permiso, redirige a otra página
            this.router.navigate(['/home/productions']);
            return false;
          }
        },
        error: (error: any) => {
          // Error en la verificación del token, redirige a otra página
          console.log(error);
          this.router.navigate(['/login']);
          return false;
        },
      });

      return true; // Esto se ejecutará antes de que la respuesta de la suscripción esté disponible.
    } else {
      // El usuario no tiene un token, redirige a la página de inicio de sesión
      this.router.navigate(['/login']);
      return false;
    }
  }
}
