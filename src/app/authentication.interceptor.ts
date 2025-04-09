  import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
  import { inject } from '@angular/core';
  import { Router } from '@angular/router';
  import { catchError, finalize, throwError } from 'rxjs';
  import { SpinnerService } from './spinner.service';

  export const authInterceptor: HttpInterceptorFn = (req, next) => {

    const publicUrls = [
      '/get_products',
      '/get_product/:id',
      '/get_products_by_gender/:brand/:gender',
    ];
  
    if (publicUrls.some(url => req.url.includes(url))) {
      return next(req);
    }

    const spinnerService = inject(SpinnerService)
    const token = localStorage.getItem("st_1892@121");
    const router = inject(Router)
  
    spinnerService.show();

    if (!token) {
      router.navigate(['/login']);
      return next(req); // Continúa la petición original (fallará, pero no bloqueará UI)
    }

    const authRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  
    return next(authRequest).pipe(
      finalize(() => spinnerService.hide()),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Redirigir a la página de login
          router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }