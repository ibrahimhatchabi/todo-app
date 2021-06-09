import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService, TodoItem } from './shared/services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  allTodos: Array<TodoItem> = [];
  activeTodos: Array<TodoItem> = [];
  completedTodos: Array<TodoItem> = [];
  todosListToShow: Array<TodoItem> = [];
  categories: Array<string> = ['Chores (Corvées)', 'Errands (Courses)', 'Work (Bureau)'];
  selectedCategory: string = this.categories[1];
  selectedFilter: string = 'all';

  constructor(private database: DatabaseService) {
    this.updateCategory()
  }

  addTodoItem(title: string) {
    this.database.addTodo(title, this.selectedCategory);
  }

  updateTodoItem(item: TodoItem) {
    this.database.updateTodo(item, this.selectedCategory);
  }

  updateCategory() {
    this.database.getDbTodos(this.selectedCategory).subscribe(
      (data) => {
        this.todosListToShow = [];
        this.activeTodos = [];
        this.completedTodos = [];
        this.allTodos = [];
        this.allTodos = data;
        this.todosListToShow = this.allTodos;
        data.forEach(element => {
          if (!element.isCompleted) {
            this.activeTodos.push(element)
          } else {
            this.completedTodos.push(element)
          }
        });
      }
    );
  }

  filter(type: string) {
    this.todosListToShow = [];
    switch (type) {
      case 'active' :
        this.todosListToShow = this.activeTodos;
        this.selectedFilter = 'active';
        break;
      case 'completed' :
        this.todosListToShow = this.completedTodos;
        this.selectedFilter = 'completed';
        break;
      default :
        this.todosListToShow = this.allTodos;
        this.selectedFilter = 'all';
        break;
    }
  }
}
