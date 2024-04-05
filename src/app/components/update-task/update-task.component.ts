import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  standalone: true,
  imports: [FormsModule],
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  id: number = 0;
  title: string = "";
  description: string = "";
  status: string = "";
  loading: boolean = false;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    } else {
    this.route.params.subscribe(params => {
      this.id = params['id']
    })

    this.taskService.getTaskById(this.id).subscribe({
      next: (result) => {
        this.loading = false;
        this.title = result.title
        this.description = result.description
        this.status = result.status

      }

    });
  }

  }

  updateTask(): void {

    this.route.params.subscribe(params => {
      this.id = params['id']
    })


    if (this.title == '' || this.description == '' || this.status == '') {
      this.toastr.error('Todos os campos são obrigatórios!', 'Erro',
        {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',

        }
      );
      return;
    }



    const updatedTask: Task = {
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status
    };

    this.loading = true;

    this.taskService.updateTask(updatedTask).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success('Tarefa atualizada com sucesso.', 'Sucesso');
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        this.loading = false;
        console.error(err);
        this.toastr.error('Ocorreu um erro ao atualizar a tarefa. Por favor, tente novamente mais tarde.', 'Erro');
      },

    });

  }
  redirection(): void {
    this.router.navigate(['/dashboard']);
  }
}
