import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../model/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Crear Proyecto',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'Terminar Url San Remo',
      completed: false,
    },
  ]);


  filter = signal<'all'| 'pending' | 'completed'>("all");
  tasksByFilter = computed(()=>{
    const filter = this.filter();
    const tasks = this.tasks();

    if(filter === "pending"){
      return tasks.filter(task => !task.completed)
    }

    if(filter === "completed"){
      return tasks.filter(task => task.completed)
    }

    return tasks;
  });
  newtaks = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30),
    ],
  });

  changehandler() {
    if (this.newtaks.valid) {
      const value = this.newtaks.value.trim();
      if (value != '') {
        this.addTask(value);
        this.newtaks.setValue('');
      }
    }
  }

  addTask(title: string) {
    const newtask = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newtask]);
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) =>
      tasks.filter((tasks, position) => position !== index)
    );
  }

  updateTask(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((tasks, position) => {
        if (position === index) {
          return {
            ...tasks,
            completed: !tasks.completed,
          };
        }
        return tasks;
      });
    });
  }

  updateTaskEditingMode(index: number) {
    this.tasks.update((prevState) => {
      return prevState.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            editing: true,
          };
        }
        return {
          ...task,
          editing: false,
        };
      });
    });
    console.log('carrro');
  }
  updateTaskEditingModeText(index: number, event: any) {
    const input = event.target as HTMLInputElement;

    this.tasks.update((prevState) => {
      return prevState.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            title: input.value,
            editing:false
          };
        }
        return task;
      });
    });
  }

  changefilter(filter:'all'| 'pending' | 'completed'){
    this.filter.set(filter)
  }
}
