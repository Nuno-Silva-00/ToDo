import { NgModule } from "@angular/core";
import { TodoEditComponent } from "./todo-edit/todo-edit.component";
import { ToDoComponent } from "./todo.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { SharedModule } from "../shared/shared.module";
import { ToDoRoutingModule } from "./todo-routing.module";

@NgModule({
    declarations: [
        TodoEditComponent,
        ToDoComponent,
    ],
    imports: [
        SharedModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        DragDropModule,
        ToDoRoutingModule
    ]
})
export class TodoModule { }