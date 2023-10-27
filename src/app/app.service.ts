import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  private apiUrl = 'https://johan1271.pythonanywhere.com/'; // Reemplaza con la URL de tu API
  public userData: any = undefined;
  constructor(private http: HttpClient, public cookieService: CookieService) { }

  getProducts(): Observable<any> {
    const httpOptions = this.getHeaders();
    return this.http.get(this.getUrl('products'), httpOptions);
  }

  addProducts(product: any): Observable<any> {
    const httpOptions = this.getHeaders();
    return this.http.post(this.getUrl('products'), JSON.stringify(product), httpOptions);
  }

  putProducts(product: any): Observable<any> {
    const httpOptions = this.getHeaders();
    return this.http.put(this.getPutUrl('products', product.id), JSON.stringify(product), httpOptions);
  }


  getUrl(any: string): string {
    let str = `${this.apiUrl}${any}?Authorization=Bearer ${this.cookieService.get('userToken')}`

    return str
  }

  getPutUrl(any: string, id?: any): string {
    let str = `${this.apiUrl}${any}/${id}?Authorization=Bearer ${this.cookieService.get('userToken')}`
    return str
  }

  getUsers(): Observable<any> {
    const httpOptions = this.getHeaders();
    return this.http.get(this.getUrl('users'), httpOptions);
  }

  getUserById(id: number): Observable<any> {
    const httpOptions = this.getHeaders();
    return this.http.get(this.getUrl(`users/${id}`), httpOptions);
  }

  addUsers(user: any): Observable<any> {
    const httpOptions = this.getHeaders();
    return this.http.post(this.getUrl('users'), JSON.stringify(user), httpOptions);
  }

  putUsers(user: any): Observable<any> {
    const httpOptions = this.getHeaders();
    return this.http.put(this.getPutUrl('users', user.id), JSON.stringify(user), httpOptions);
  }

  getRoles(): Observable<any> {
    const httpOptions = this.getHeaders();
    return this.http.get(this.getUrl('roles'), httpOptions);
  }

  addRoles(role: any): Observable<any> {
    const httpOptions = this.getHeaders();
    return this.http.post(this.getUrl('roles'), JSON.stringify(role), httpOptions);
  }

  updateRoles(role: any): Observable<any> {
    const httpOptions = this.getHeaders();
    return this.http.put(this.getPutUrl('roles', role.id), JSON.stringify(role), httpOptions);
  }

  getProduction(): Observable<any> {
    const httpOptions = this.getHeaders();
    return this.http.get(this.getUrl('all_productions'), httpOptions);
  }

  addProduction(production: any): Observable<any> {
    const httpOptions = this.getHeaders();
    return this.http.post(this.getUrl('productions'), JSON.stringify(production), httpOptions);
  }

  updateProduction(production: any): Observable<any> {
    const httpOptions = this.getHeaders();
    return this.http.put(this.getPutUrl('productions', production.id), JSON.stringify(production), httpOptions);
  }

  getAllProductions(): Observable<any> {
    const httpOptions = this.getHeaders();
    return this.http.get(this.getUrl('productions'), httpOptions);
  }

  getProductionById(id: number): Observable<any> {
    const httpOptions = this.getHeaders();
    return this.http.get(this.getUrl(`productions/${id}`), httpOptions);
  }

  getProductionByDate(id:number,startDate: string, endDate: string): Observable<any> {
    const httpOptions = this.getHeaders();
    return this.http.get(`${this.apiUrl}productions/${id}?start_date=${startDate}&end_date=${endDate}&Authorization=Bearer ${this.cookieService.get('userToken')}`, httpOptions);
  }

  getLogin(id: number): Observable<any> {
    const httpOptions = this.getHeaders();

    return this.http.post(`${this.apiUrl}login`, JSON.stringify({ id: id }), httpOptions);
  }

  getVerifyToken(): Observable<any> {
    const httpOptions = this.getHeaders();

    let userVerified = this.http.get(`${this.apiUrl}verify/token`, httpOptions).pipe(
      map((response: any) => {
        console.log(response);
        this.userData = response;
        return response;
      }),
      catchError((error: any) => {

        return error;
      })
    );

    return userVerified;

  }

  public getHeaders(token?: string): any {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${this.cookieService.get('userToken')}`
    })

    return ({ headers: headers });
  }
}
