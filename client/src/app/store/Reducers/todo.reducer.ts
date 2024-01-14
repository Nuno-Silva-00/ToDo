import { createReducer, on } from "@ngrx/store";

import { ToDo } from "src/app/shared/models/ToDo";
import * as ToDoActions from "../Actions/todo.actions";

export interface State {
    toDos: ToDo[];
    editedToDo: ToDo | null;
    editItemId: string | null;
}

const initialState: State = {
    toDos: [],
    editedToDo: null,
    editItemId: null
};

export const toDoReducer = createReducer(initialState,
    on(ToDoActions.set,
        (state, action) => {
            return {
                ...state,
                toDos: action.todos
            }
        }),
    on(ToDoActions.saveNewToDo,
        (state, action) => {
            return {
                ...state,
                toDos: [...(state.toDos || []), { id: action.id, toDo: action.todo }]
            }
        }),
    on(ToDoActions.update,
        (state, action) => {
            if (state.editItemId) {
                const index = state.toDos.map(item => item.id).indexOf(state.editItemId);
                const newList = state.toDos.slice();

                newList.splice(index, 1, { id: state.editItemId, toDo: action.todo });

                return {
                    ...state,
                    toDos: newList,
                    editedToDo: null,
                    editItemId: null
                }
            }
            return { ...state }
        }),
    on(ToDoActions.remove,
        (state, action) => {
            return {
                ...state,
                toDos: state.toDos.filter(item => item.id !== action.id)
            }
        }),
    on(ToDoActions.changeOrder,
        (state, action) => {
            return {
                ...state,
                toDos: action.newOrder
            }
        }),
    on(ToDoActions.startEdit,
        (state, action) => {
            const index = state.toDos.map(item => item.id).indexOf(action.id);

            return {
                ...state,
                editedToDo: state.toDos[index],
                editItemId: action.id
            }
        }),
    on(ToDoActions.stopEdit,
        (state, action) => {
            return {
                ...state,
                editedToDo: null,
                editItemId: null
            }
        })
);

