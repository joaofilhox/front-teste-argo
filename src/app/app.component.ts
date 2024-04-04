import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';


@Component({
  selector: 'app-root',
  standalone: true,  
  imports: [CommonModule, RouterOutlet, LoginComponent, SignInComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  template: `<div *ngIf="visible">Hi</div>`, 
})
export class AppComponent {
  title = 'frontend';
}
