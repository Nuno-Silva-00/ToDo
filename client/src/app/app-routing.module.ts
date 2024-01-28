import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ToDoComponent } from './todo/todo.component';
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
    loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule),
    canActivate: [canActivate]
  },
  {
    path: 'notes',
    loadChildren: () => import('./notes/notes.module').then(m => m.NoteModule),
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
