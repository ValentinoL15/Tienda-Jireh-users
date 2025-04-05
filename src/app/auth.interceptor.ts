import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, throwError } from 'rxjs';
import { SpinnerService } from './spinner.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const spinnerService = inject(SpinnerService)
  const token = localStorage.getItem("st_1892@121");
  const router = inject(Router)

  const authRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authRequest).pipe(
    finalize(() => {
      spinnerService.hide();
    }),
    catchError((error) => {
      if (error.status === 401) {
        // Redirigir a la página de login
        router.navigate(['/dashboard']);
      }
      return throwError(() => error);
    })
  );
}
