import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toaster: ToastrService) { }

  msjError(e: HttpErrorResponse){
    if(e.error.msg){
      this.toaster.error(e.error.msg, "Error");
    } else {
      this.toaster.error('Oops! Um erro ocorreu. Por favor, entre em contato com o administrador.', 'Error')
    }
  }
}
