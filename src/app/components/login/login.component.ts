import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import {NgIf} from '@angular/common';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { ErrorService } from '../../services/error.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterModule, FormsModule, SpinnerComponent, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  username: string = "";
  password: string = "";
  loading: boolean = false;

  toaster=inject(ToastrService);

  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService){

  }

  ngOnInit(): void {
      
  }

  login(){
    
    console.log(this.username);
    
    if(this.username == '' || this.password == ''){
      this.toastr.error('Preencha todos os campos!', 'Error');
      return
    }

    const user: User = {
      username: this.username,
      password: this.password,
    }

    this.loading = true;

    this._userService.login(user).subscribe({
      next: () => {
        this.router.navigate(['/dashboard'])
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
        this.loading = false;
      }
    })
    
  }

}
