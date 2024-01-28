import { NgModule } from "@angular/core";
import { LoadingSpinerComponent } from "./loading-spinner/loading-spinner.component";
import { DeleteDialogComponent } from "./delete-dialog/delete-dialog.component";
import { NoteViewDialogComponent } from "./note-view-dialog/note-view-dialog.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
    declarations: [
        LoadingSpinerComponent,
        DeleteDialogComponent,
        NoteViewDialogComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatDialogModule,
    ],
    exports: [
        LoadingSpinerComponent,
        DeleteDialogComponent,
        NoteViewDialogComponent,
        CommonModule,
        FormsModule
    ]
})
export class SharedModule { }