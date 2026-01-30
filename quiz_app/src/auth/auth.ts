import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) { }

  register(data: { username: string; password: string }): Observable<any> {
    return this.http.post('http://localhost:5000/api/auth/register', data);
  }
  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.api}/login`, data, { withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.api}/logout`, {}, { withCredentials: true });
  }

  me(): Observable<any> {
    return this.http.get(`${this.api}/me`, { withCredentials: true });
  }

  isLoggedIn(): Observable<boolean> {
    return this.me().pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}