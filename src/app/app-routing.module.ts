import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ToDoComponent } from './todo/todo.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NotesComponent } from './notes/notes.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { canActivate } from './auth-page/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ToDoComponent,
    canActivate: [canActivate]
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
    canActivate: [canActivate]
  },
  {
    path: 'notes',
    component: NotesComponent,
    canActivate: [canActivate]
  },
  {
    path: 'auth',
    component: AuthPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
