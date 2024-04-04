import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.myAppUrl = environment.apiEnd;
    this.myApiUrl = 'api/tasks';
  }

  getTasks(): Observable<Task[]> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.httpClient.get<Task[]>(`${this.myAppUrl}${this.myApiUrl}`, { headers });
  }

  getTaskById(taskId: number): Observable<Task> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.httpClient.get<Task>(`${this.myAppUrl}${this.myApiUrl}/${taskId}/`, { headers });
  }

  createNewTask(task: Task): Observable<Task> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    
    return this.httpClient.post<Task>(`${this.myAppUrl}${this.myApiUrl}/`, task, { headers });
  }

  updateTask(task: Task): Observable<Task> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.httpClient.put<Task>(`${this.myAppUrl}${this.myApiUrl}/${task.id}/`, task, { headers });
  }

  deleteTask(taskId: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.httpClient.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${taskId}`, { headers });
  }

  importTasks(fileData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.httpClient.post<any>(`${this.myAppUrl}${this.myApiUrl}/import/`, fileData, { headers });
  }
}
