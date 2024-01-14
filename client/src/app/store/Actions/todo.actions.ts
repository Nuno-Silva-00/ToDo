import { createAction, props } from "@ngrx/store";

import { ToDo } from "src/app/shared/models/ToDo";
import { TODO_ADD_TODO, TODO_REMOVE_TODO, TODO_UPDATE_TODO, TODO_CHANGE_ORDER, TODO_START_EDIT, TODO_STOP_EDIT, TODO_GET_TODOS, TODO_SET_TODOS, TODO_SEND_TODO } from "src/app/shared/Consts/Consts";

export const get = createAction(
    TODO_GET_TODOS,
)

export const set = createAction(
    TODO_SET_TODOS,
    props<{ todos: ToDo[] }>()
)

export const add = createAction(
    TODO_SEND_TODO,
    props<{ todo: string }>()
);

export const saveNewToDo = createAction(
    TODO_ADD_TODO,
    props<{ id: string, todo: string }>()
);

export const update = createAction(
    TODO_UPDATE_TODO,
    props<{ id: string, todo: string }>()
);

export const remove = createAction(
    TODO_REMOVE_TODO,
    props<{ id: string }>()
);

export const changeOrder = createAction(
    TODO_CHANGE_ORDER,
    props<{ newOrder: ToDo[] }>()
);

export const startEdit = createAction(
    TODO_START_EDIT,
    props<{ id: string }>()
);

export const stopEdit = createAction(
    TODO_STOP_EDIT,
);