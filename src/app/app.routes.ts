import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './utils/auth.guard';
import { UpdateTaskComponent } from './components/update-task/update-task.component'
import { CreateTaskComponent } from './components/create-task/create-task.component'

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signIn', component: SignInComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'update-task/:id', component: UpdateTaskComponent, canActivate: [authGuard] },
  { path: 'create-task', component: CreateTaskComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
