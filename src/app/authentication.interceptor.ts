  import { HttpInterceptorFn } from '@angular/common/http';
  import { inject } from '@angular/core';
  import { Router } from '@angular/router';
  import { catchError, finalize, throwError } from 'rxjs';
  import { SpinnerService } from './spinner.service';
  import { AuthService } from './auth/services/auth.service';
  import { ToastrService } from 'ngx-toastr';

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
    const authService = inject(AuthService)
    const toastr = inject(ToastrService);
    const token = localStorage.getItem("st_1892@121");
    const router = inject(Router)

    if (!token) {
      router.navigate(['/dashboard']);
      return throwError(() => new Error('No authentication token found'));
    }
  
    const authRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  
    return next(authRequest).pipe(
      finalize(() => spinnerService.hide()),
      catchError((error) => {
        if (error.status === 401) {
          toastr.error('Sesión expirada, por favor inicie sesión', 'Error de autenticación');
          authService.logOut();
          router.navigate(['/dashboard']);
        }
        return throwError(() => error);
      })
    );
  }