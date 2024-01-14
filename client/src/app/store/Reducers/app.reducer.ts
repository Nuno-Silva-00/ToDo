import { ActionReducerMap } from '@ngrx/store'
import * as fromToDo from './todo.reducer'
import * as fromAuth from './auth.reducer'

export interface AppState {
    todoList: fromToDo.State,
    auth: fromAuth.State
}

export const appReducer: ActionReducerMap<AppState> = {
    todoList: fromToDo.toDoReducer,
    auth: fromAuth.authReducer
}