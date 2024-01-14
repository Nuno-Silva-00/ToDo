import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";

import { environment } from "src/environments/environment";
import { ToDo } from "src/app/shared/models/ToDo";
import * as fromApp from '../Reducers/app.reducer'
import * as CONSTANTS from '../../shared/Consts/Consts'
import * as TodoActions from '../Actions/todo.actions'

@Injectable()
export class TodoEffects {
    path = environment.API + '/api/todo';

    getTodo = createEffect(() => this.actions$.pipe(
        ofType(CONSTANTS.TODO_GET_TODOS),
        switchMap(() => {
            return this.http.get<ToDo[]>(
                this.path
            );
        }),
        map(todos => {
            return TodoActions.set({ todos });
        })
    ));

    createTodo = createEffect(() => this.actions$.pipe(
        ofType(CONSTANTS.TODO_SEND_TODO),
        switchMap((actionData: { todo: string }) => {
            return this.http.post<{ id: string, toDo: string }>(
                this.path + '/create', { todo: actionData.todo }
            ).pipe(
                map((createdTodo: { id: string, toDo: string }) => {
                    return TodoActions.saveNewToDo({ id: createdTodo.id, todo: createdTodo.toDo });
                })
            )
        })
    ));

    updateToDo = createEffect(() => this.actions$.pipe(
        ofType(CONSTANTS.TODO_UPDATE_TODO),
        switchMap((actionData: { id: string, todo: string }) => {
            return this.http.patch<{ message: string }>(this.path + '/update', { id: actionData.id, toDo: actionData.todo })
                .pipe(
                    map((resData: { message: string }) => {
                        console.log(resData.message);
                        return { type: 'DUMMY' };
                    })
                )
        })
    ));

    updateOrder = createEffect(() => this.actions$.pipe(
        ofType(CONSTANTS.TODO_CHANGE_ORDER),
        switchMap((actionData: { newOrder: ToDo[] }) => {
            return this.http.patch<{ message: string }>(this.path + '/updateOrder', { newOrder: actionData.newOrder })
                .pipe(
                    map((resData: { message: string }) => {
                        console.log(resData.message);
                        return { type: 'DUMMY' };
                    }
                    )
                )
        })
    ));

    deleteTodo = createEffect(() => this.actions$.pipe(
        ofType(CONSTANTS.TODO_REMOVE_TODO),
        switchMap((actionData: { id: string }) => {
            return this.http.delete<{ message: string }>(this.path + '/delete/' + actionData.id)
                .pipe(
                    map((resData: { message: string }) => {
                        console.log(resData.message);
                        return { type: 'DUMMY' };
                    }
                    )
                )
        })
    ));

    constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) { }

}