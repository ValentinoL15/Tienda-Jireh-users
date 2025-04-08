import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = 'https://tienda-jireh-service-production.up.railway.app/api/userJireh'
  //API_URL = 'http://localhost:4000/api/userJireh'
  private tokenKey = 'st_1892@121';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  private http = inject(HttpClient)
  private router = inject(Router)
  private tokenChangedSubject = new Subject<string | null>();
  public tokenChanged$ = this.tokenChangedSubject.asObservable();
  
  

/***********************************************LOGIN****************************************************/ 

getToken(): string | null {
  if (isPlatformBrowser(this.platformId)) {
    return localStorage.getItem(this.tokenKey);
  }
  return null;
}

setToken(token: string): void {
  if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem(this.tokenKey, token);
    this.tokenChangedSubject.next(token);
  }
}
logIn(form: any) {
  return this.http.post(`${this.API_URL}/login`, form).pipe(
    tap((response: any) => {
      const token = response.token;
      if (token) {
        this.setToken(token);
      }
    }),
    catchError((error) => {
      // Propaga el error HTTP completo
      return throwError(() => error);
    })
  );
}

logOut(): void {
  if (isPlatformBrowser(this.platformId)) {
    localStorage.removeItem(this.tokenKey);
    this.tokenChangedSubject.next(null);
  }
  this.router.navigate(['/dashboard']);
}

register(form: any): Observable<any>{
  return this.http.post(`${this.API_URL}/register`, form)
}
}
