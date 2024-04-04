import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';
import { inject } from '@angular/core';


export const addTokenInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn) => {
  let _errorService: ErrorService;
  const errorService = inject(ErrorService);
  const router = inject(Router)
  

  const token = localStorage.getItem('token');  
  
    if(token){
      request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` }})

    }      
  
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      const CODE = [401, 500];

      if(error.status === 401) {
        errorService.msjError(error)
        router.navigate(['/login'])
      }

      return throwError(() => error)
    })
    )
  
}
