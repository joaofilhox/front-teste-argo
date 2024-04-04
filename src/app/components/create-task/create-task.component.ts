import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  standalone: true,
  imports: [FormsModule],
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  id: number = 0;
  title: string = '';
  description: string = '';
  status: string = '';
  loading: boolean = false;

  toaster = inject(ToastrService);

  constructor(
    private taskService: TaskService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {

  }

  createTask(): void {

    if (this.title == '' || this.description == '' || this.status == '') {
      this.toastr.error('Todos os campos são obrigatórios!', 'Erro',
        {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',

        }
      );
      return;
    }

    const newTask: Task = {
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status
    };

    this.loading = true;

    this.taskService.createNewTask(newTask).subscribe({
      next: (createdTask: any) => {
        this.loading = false;
        this.toastr.success('Tarefa criada com sucesso.', 'Sucesso');
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        this.loading = false;
        console.error(err);
        this.toastr.error('Ocorreu um erro ao criar a tarefa. Por favor, tente novamente mais tarde.', 'Erro');
      },
      complete: () => console.info('complete')
    })

  }

  redirection(): void {
    this.router.navigate(['/dashboard']);
  }
}
