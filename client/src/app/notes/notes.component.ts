import { Component } from '@angular/core';
import { Note } from '../shared/models/Note';
import { Subscription } from 'rxjs';
import { NoteService } from '../services/notes/notes.service';
import { MatDialog } from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';

import { DeleteDialogComponent } from '../shared/delete-dialog/delete-dialog.component';
import { NoteViewDialog } from '../shared/note-view-dialog/note-view-dialog.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  notes: Note[] = [];
  private subscription!: Subscription;

  editMode = false;

  constructor(private noteService: NoteService, private deleteMessage: MatDialog, private noteViewDialog: MatDialog) { }

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

  deleteNote(id: number): void {
    const dialogRef = this.deleteMessage.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      result && this.noteService.deleteNote(id);
    });
  }

  onEditNote(id: number): void {
    this.noteService.startedEditing.next(id);
  }

  onViewNote(id: number, index: number): void {
    this.editMode = true;

    const dialogRef = this.noteViewDialog.open(NoteViewDialog,
      {
        data: this.notes[index].note,
      });

    dialogRef.afterClosed().subscribe(result => {
      result && this.noteService.updateNote(id, result);
      this.editMode = false;
    });
  }

  onBlockDelete(block: boolean) {
    this.editMode = block;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
