import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DeleteDialogComponent } from '../shared/delete-dialog/delete-dialog.component';
import { Subscription, map } from 'rxjs';
import { Store } from '@ngrx/store';

import { ToDo } from '../shared/models/ToDo';
import * as ToDoActions from "../store/Actions/todo.actions"
import * as fromApp from '../store/Reducers/app.reducer'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class ToDoComponent {
  todos: ToDo[] = [];
  editMode = false;

  private subscription!: Subscription;

  constructor(private deleteMessage: MatDialog, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store
      .select('todoList')
      .pipe(map(dataState => dataState.toDos))
      .subscribe((todos: ToDo[]) => {
        this.todos = todos
      });

    this.store.dispatch(ToDoActions.get());
  }

  drop(event: CdkDragDrop<string[]>) {
    let newarr = this.todos.slice();
    moveItemInArray(newarr, event.previousIndex, event.currentIndex);
    this.store.dispatch(ToDoActions.changeOrder({ newOrder: newarr }));
  }

  deleteToDo(id: string): void {
    const dialogRef = this.deleteMessage.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      result && this.store.dispatch(ToDoActions.remove({ id }));
    });
  }

  onEditToDo(id: string): void {
    this.store.dispatch(ToDoActions.startEdit({ id }));
  }

  onBlockDelete(block: boolean) {
    this.editMode = block;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
