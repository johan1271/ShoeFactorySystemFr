import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private apiUrl = 'https://johan1271.pythonanywhere.com/'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    const httpOptions = this.getHeaders();
    return this.http.get(`${this.apiUrl}products/`,httpOptions);
  }

  getUsers(): Observable<any> {
    const httpOptions = this.getHeaders();
    return this.http.get(`${this.apiUrl}users/`,httpOptions);
  }

  getRoles(): Observable<any> {
    const httpOptions = this.getHeaders();
    return this.http.get(`${this.apiUrl}roles/`,httpOptions);
  }

  public getHeaders(): any {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
    })

    return ({ headers: headers });
  }
}
