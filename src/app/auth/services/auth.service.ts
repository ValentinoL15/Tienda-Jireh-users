import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = 'http://localhost:4000/api/userJireh'
  private tokenKey = 'st_1892@121';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  private http = inject(HttpClient)
  private router = inject(Router)
  

/***********************************************LOGIN****************************************************/ 

getToken(): string | null {
  return localStorage.getItem(this.tokenKey); // ✅ usa la misma clave con la que se guarda
}

setToken(token: string): void {
  if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem(this.tokenKey, token);
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
    localStorage.clear();
  }
  this.router.navigate(['/dashboard']);
}
}
