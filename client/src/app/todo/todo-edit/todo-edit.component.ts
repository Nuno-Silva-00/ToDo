import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import * as ToDoActions from "../../store/Actions/todo.actions"
import * as fromApp from '../../store/Reducers/app.reducer'

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent {
  subscription!: Subscription;

  @ViewChild('f') toDoForm!: NgForm;
  @Output() blockDelete = new EventEmitter<boolean>();

  editMode = false;
  editItemId: string | null = null;

  constructor(private store: Store<fromApp.AppState>) { }

  onSubmit(form: NgForm) {
    const value = form.value;

    if (this.editMode) {
      this.store.select('todoList').pipe(select('editItemId')).subscribe(
        (editItemId: string | null) => {
          this.editItemId = editItemId;
        }
      );

      this.store.dispatch(ToDoActions.update({ id: (this.editItemId as string), todo: value.toDo }));
    } else {
      this.store.dispatch(ToDoActions.add({ todo: value.toDo }));
    }
    this.resetForm();
  }

  resetForm() {
    this.toDoForm.resetForm();

    this.toDoForm.form.markAsPristine();
    this.toDoForm.form.markAsUntouched();

    this.editMode = false;
    this.blockDelete.emit(false);

    this.store.dispatch(ToDoActions.stopEdit());
  }

  ngOnInit() {
    this.subscription = this.store.select('todoList').subscribe(stateData => {
      if (stateData.editItemId !== null) {
        this.editMode = true;
        this.blockDelete.emit(true);

        this.toDoForm.setValue({
          toDo: stateData.editedToDo?.toDo
        })

      } else {
        this.editMode = false;
        this.blockDelete.emit(false);
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(ToDoActions.stopEdit());
  }
}
