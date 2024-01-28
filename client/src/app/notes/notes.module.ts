import { NgModule } from "@angular/core";
import { NoteEditComponent } from "./notes-edit/notes-edit.component";
import { NotesComponent } from "./notes.component";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatInputModule } from "@angular/material/input";
import { SharedModule } from "../shared/shared.module";
import { MatButtonModule } from "@angular/material/button";
import { NotesRoutingModule } from "./notes-routing.module";

@NgModule({
    declarations: [
        NotesComponent,
        NoteEditComponent
    ],
    imports: [
        SharedModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatGridListModule,
        NotesRoutingModule
    ]
})
export class NoteModule { }