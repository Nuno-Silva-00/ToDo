import { Component } from '@angular/core';
import { Note } from '../shared/models/Note';
import { Subscription } from 'rxjs';
import { NoteService } from '../services/notes/notes.service';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DeleteDialogComponent } from '../shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  notes: Note[] = [];
  private subscription!: Subscription;

  editMode = false;

  constructor(private noteService: NoteService, private deleteMessage: MatDialog) { }


  ngOnInit() {
    this.subscription = this.noteService.getAll()
      .subscribe((notes: Note[]) => {
        this.notes = notes;
      });

    this.subscription.add(
      this.noteService.notesChanged.subscribe((notes: Note[]) => {
        this.notes = notes;
      }));

  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.notes, event.previousIndex, event.currentIndex);
    this.noteService.changeOrder(this.notes);
  }

  deleteNote(id: number): void {
    const dialogRef = this.deleteMessage.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      result && this.noteService.deleteNote(id);
    });
  }

  onEditNote(id: number): void {
    this.noteService.startedEditing.next(id);
  }

  onBlockDelete(block: boolean) {
    this.editMode = block;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
