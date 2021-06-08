import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { DatabaseService, TodoItem } from 'src/app/shared/services/database.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() item: TodoItem;

  @Output() completionEvent = new EventEmitter<TodoItem>();

  constructor(private dataBase: DatabaseService) { } 

  ngOnInit(): void {
  }

  completeItem () {
    this.completionEvent.emit(this.item);
  }

  deleteItem (item: TodoItem) {
    this.dataBase.deleteTodo(item)
  }

}
