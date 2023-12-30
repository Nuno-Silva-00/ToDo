import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

interface DialogData {
  note: string
}


@Component({
  selector: 'app-note-view-dialog',
  templateUrl: './note-view-dialog.component.html',
  styleUrls: ['./note-view-dialog.component.css']
})
export class NoteViewDialog {

  constructor(
    public dialogRef: MatDialogRef<NoteViewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
