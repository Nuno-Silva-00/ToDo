import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

import { ToDo } from '../shared/models/ToDo';
import { ToDoService } from '../services/toDo/to-do.service';
import { DeleteDialogComponent } from '../shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class ToDoComponent {
  toDos: ToDo[] = [];
  private subscription!: Subscription;

  editMode = false;

  constructor(private toDoService: ToDoService, private deleteMessage: MatDialog) { }


  ngOnInit() {
    this.subscription = this.toDoService.getAll()
      .subscribe((toDos: ToDo[]) => {
        this.toDos = toDos;
      });

    this.subscription.add(
      this.toDoService.toDoChanged.subscribe((toDos: ToDo[]) => {
        this.toDos = toDos;
      }));

  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.toDos, event.previousIndex, event.currentIndex);
    this.toDoService.changeOrder(this.toDos);
  }

  deleteToDo(id: number): void {
    const dialogRef = this.deleteMessage.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      result && this.toDoService.deleteToDo(id);
    });
  }

  onEditToDo(id: number): void {
    this.toDoService.startedEditing.next(id);
  }

  onBlockDelete(block: boolean) {
    this.editMode = block;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
