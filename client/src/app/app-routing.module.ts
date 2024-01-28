import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { canActivate } from './auth-page/auth.guard';
import { AuthPageComponent } from './auth-page/auth-page.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule),
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
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
