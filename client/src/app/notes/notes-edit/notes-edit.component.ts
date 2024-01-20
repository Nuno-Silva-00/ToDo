import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NoteService } from 'src/app/services/notes/notes.service';
import { Note } from 'src/app/shared/models/Note';


@Component({
  selector: 'app-notes-edit',
  templateUrl: './notes-edit.component.html',
  styleUrls: ['./notes-edit.component.css']
})
export class NoteEditComponent {
  @ViewChild('f') noteForm!: NgForm;
  subscription!: Subscription;
  editMode = false;
  @Output() blockDelete = new EventEmitter<boolean>();
  editItemId: string | null = null;
  editedNote!: Note;

  constructor(private noteService: NoteService) { }

  onSubmit(form: NgForm) {
    const value = form.value;

    if (this.editMode) {
      if (this.editItemId)
        this.noteService.updateNote(this.editItemId, value.note.trim());
    } else {
      this.noteService.addNote(value.note.trim());
    }

    this.resetForm();
  }

  resetForm() {
    this.noteForm.resetForm();

    const inputElement = document.getElementById('note');
    if (inputElement) {
      inputElement.blur();
    }

    this.noteForm.form.markAsPristine();
    this.noteForm.form.markAsUntouched();

    this.editMode = false;
    this.blockDelete.emit(false);
  }

  ngOnInit() {
    this.subscription = this.noteService.startedEditing.subscribe((id: string) => {
      this.editItemId = id;
      this.editMode = true;
      this.blockDelete.emit(true);
      this.editedNote = this.noteService.getNote(id);
      this.noteForm.setValue({
        note: this.editedNote.note
      })
    })
  }
}
