import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToDoComponent } from './todo.component';

const routes: Routes = [
    {
        path: '',
        component: ToDoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ToDoRoutingModule { }