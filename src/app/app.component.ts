import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService, TodoItem } from './shared/services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  allTodos: Observable<TodoItem>;

  constructor(private database: DatabaseService) {
    this.allTodos = database.getDbTodos();
  }

  addTodoItem(title: string) {
    this.database.addTodo(title);
  }

  updateTodoItem(item: TodoItem) {
    this.database.toggleCompletion(item);
  }
}
