import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface TodoItem {
	id: string;
	title: string;
	isCompleted: boolean;
}

@Injectable({providedIn: 'root'})
export class DatabaseService {
	constructor(
		private database: AngularFireDatabase,
    private http: HttpClient
  ) {}

	getDbTodos(category: string) : Observable<any> {
		return this.database.list<TodoItem>(category).valueChanges();
	}

	addTodo(title: string, category: string) {
		const newTodo = this.database.list<TodoItem>(category).push({ id: '', title, isCompleted: false }).key;
    this.database.list<TodoItem>(category).update(newTodo, {id: newTodo});
    // Send Email
    // this.http.get(`http://localhost:9999/sendemail?task=${title}`, {responseType: 'text'})
    //   .subscribe((data) => console.log(data));
	}

	updateTodo(item: TodoItem, category: string) {
		this.database.list<TodoItem>(category).update(item.id, {isCompleted: item.isCompleted})
		.catch(
			error => console.log("Something went wrong : ", error)
		);
	}

	deleteTodo(item: TodoItem, category: string) {
		this.database.list<TodoItem>(category).remove(item.id)
		.catch(
			error => console.log("Something went wrong : ", error)
		);
	}
}
