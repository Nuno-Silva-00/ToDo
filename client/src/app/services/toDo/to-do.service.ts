
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

import { environment } from 'src/environments/environment';
import { ToDo } from 'src/app/shared/models/ToDo';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  toDoChanged = new Subject<ToDo[]>();
  startedEditing = new Subject<number>();
  path = environment.API + '/api/todo';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private toDo: ToDo[] = [];

  getToDo(id: number): ToDo {
    return this.toDo.filter(item => item.id === id)[0] || null;
  }

  getAll() {
    return this.http.get<ToDo[]>(this.path).pipe(tap((resData: ToDo[]) => {
      this.toDo = resData;
    }));
  }

  addToDo(newToDo: string): void {
    this.http.post<ToDo>(this.path + '/create', {
      todo: newToDo
    }).subscribe(
      {
        next: (response) => {
          this.toDo.push(response);
          this.toDoChanged.next(this.toDo.slice());
        },
        error: (e) => {
          console.log('An Error occurred ', e.message);
        },
        complete: () => { console.info('To Do Created!'); }
      }
    );
  }

  deleteToDo(id: number): void {
    this.http.delete(this.path + '/delete/' + id).subscribe(
      {
        next: (response) => {
          const index = this.toDo.findIndex(todo => todo.id === id);

          this.toDo.splice(index, 1);
          this.toDoChanged.next(this.toDo.slice());
        },
        error: (e) => {
          console.log('An Error occurred ', e.message);
        },
        complete: () => { console.info('To Do Deleted!'); }
      }
    );

  }

  updateToDo(id: number, newToDo: string) {
    this.http.patch(this.path + '/update', { id: id, toDo: newToDo }).subscribe(
      {
        next: (response) => {
          const Index = this.toDo.findIndex(item => item.id === id);
          this.toDo[Index] = { id: this.toDo[Index].id, toDo: newToDo };
          this.toDoChanged.next(this.toDo.slice());
        },
        error: (e) => {
          console.log('An Error occurred ', e.message);
        },
        complete: () => { console.info('To Do Updated!'); }
      }
    );
  }

  changeOrder(newOrder: ToDo[]): void {
    this.http.patch(this.path + '/updateOrder', { newOrder }).subscribe(
      {
        next: (response) => {
        },
        error: (e) => {
          console.log('An Error occurred ', e.message);
        },
        complete: () => { console.info('Order Updated!'); }
      }
    );
  }
}