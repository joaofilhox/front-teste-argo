import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private MyAppUrl: string;
  private MyApiUrl: string;

  constructor(private http: HttpClient) { 
    this.MyAppUrl = environment.apiEnd;
    this.MyApiUrl ='api/';
  }

  signIn(user:User):Observable<any>{
    return this.http.post(`${this.MyAppUrl}${this.MyApiUrl}accounts/`, user)
  }
  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.MyAppUrl}${this.MyApiUrl}login/`, user).pipe(
      tap(response => {
        if (response && response.access) {
          localStorage.setItem('token', response.access);
        }
      })
    );
  }
}
