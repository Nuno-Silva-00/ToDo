
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

import { Note } from 'src/app/shared/models/Note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  notesChanged = new Subject<Note[]>();
  startedEditing = new Subject<number>();
  path = process.env['API_URL'] + '/api/note';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private notes: Note[] = [];

  getNote(id: number): Note {
    return this.notes.filter(item => item.id === id)[0] || null;
  }

  getAll() {
    return this.http.get<Note[]>(this.path).pipe(tap((resData: Note[]) => {
      this.notes = resData;
    }));
  }

  addNote(newNote: string): void {
    this.http.post<Note>(this.path + '/create', {
      note: newNote
    }).subscribe(
      {
        next: (response) => {
          this.notes.push(response);
          this.notesChanged.next(this.notes.slice());
        },
        error: (e) => {
          console.log('An Error occurred ', e.message);
        },
        complete: () => { console.info('Note Created!'); }
      }
    );
  }

  deleteNote(id: number): void {
    this.http.delete(this.path + '/delete/' + id).subscribe(
      {
        next: (response) => {
          const index = this.notes.findIndex(note => note.id === id);

          this.notes.splice(index, 1);
          this.notesChanged.next(this.notes.slice());
        },
        error: (e) => {
          console.log('An Error occurred ', e.message);
        },
        complete: () => { console.info('Note Deleted!'); }
      }
    );

  }

  updateNote(id: number, newNote: string) {
    this.http.patch(this.path + '/update', { id: id, note: newNote }).subscribe(
      {
        next: (response) => {
          const Index = this.notes.findIndex(item => item.id === id);
          this.notes[Index] = { id: this.notes[Index].id, note: newNote };
          this.notesChanged.next(this.notes.slice());
        },
        error: (e) => {
          console.log('An Error occurred ', e.message);
        },
        complete: () => { console.info('Note Updated!'); }
      }
    );
  }

  changeOrder(newOrder: Note[]): void {
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