import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskList: Task[] = [];
  loading: boolean = false;
  selectedFile: File | null = null;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    } else {
      this.getTasks();
    }
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (result) => {
        this.taskList = result;
      },
      error: (err) => {
        console.log(err);
        this.router.navigate(['/login']);
      }
    });
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.taskList = this.taskList.filter(task => task.id !== taskId);
        this.toastr.success('Tarefa excluída com sucesso.', 'Sucesso');
      },
      error: (err: any) => {
        this.toastr.error('Ocorreu um erro ao excluir a tarefa. Por favor, tente novamente mais tarde.', 'Erro');
      }
    });
  }

  updateTask(taskId: number): void {
    this.router.navigate(['/update-task', taskId]);
  }

  createTask(): void {
    this.router.navigate(['/create-task']);
  }


  onFileSelected(event: any): void {
    if (event.target && event.target.files && event.target.files.length > 0) {

      this.selectedFile = event.target.files[0];
    }
  }

  uploadTasks(): void {
    if (!this.selectedFile) {

      this.toastr.error('Selecione um arquivo para fazer upload.', 'Erro');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.taskService.importTasks(formData).subscribe({
      next: (response) => {
        this.toastr.success(response.message, 'Sucesso');
        this.getTasks();
      },
      error: (err: any) => {
        console.error(err);
        this.toastr.error('Ocorreu um erro ao importar as tarefas.', 'Erro');
      }
    });
  }

  formatDate(date: string | undefined): string {
    if (date) {
      return new Date(date).toLocaleString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } else {
      return 'N/A';
    }
  }
}