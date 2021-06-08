import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

export interface TodoItem {
	id: string;
	title: string;
	isCompleted: boolean;
}

@Injectable({providedIn: 'root'})
export class DatabaseService {
	constructor(private database: AngularFireDatabase) {}

	getDbTodos() : Observable<any> {
		return this.database.list<TodoItem>('todos').valueChanges();
	}

	addTodo(title: string) {
		const newTodo = this.database.list<TodoItem>('todos').push({ id: '', title, isCompleted: false }).key;
		this.database.list<TodoItem>('todos').update(newTodo, {id: newTodo});
	}

	toggleCompletion(item: TodoItem) {
		this.database.list<TodoItem>('todos').update(item.id, {isCompleted: item.isCompleted})
		.catch(
			error => console.log("Something went wrong. Here is the reason : ", error)
		);
	}

	deleteTodo(item: TodoItem) {
		this.database.list<TodoItem>('todos').remove(item.id)
		.catch(
			error => console.log("Something went wrong. Here is the reason : ", error)
		);
	}
}
