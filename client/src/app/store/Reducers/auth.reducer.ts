import { createReducer, on } from "@ngrx/store";

import { User } from "src/app/shared/models/user.model";
import * as AuthActions from "../Actions/auth.actions";

export interface State {
    user: User | null;
    authError: string | null;
    loading: boolean;
}

const initialState: State = {
    user: null,
    authError: null,
    loading: false
}

export const authReducer = createReducer(
    initialState,
    on(AuthActions.signupStart,
        (state, action) => {
            return {
                ...state,
                authError: null,
                loading: true
            }
        }),
    on(AuthActions.loginStart,
        (state, action) => {
            return {
                ...state,
                authError: null,
                loading: true
            }
        }),
    on(AuthActions.authenticateSuccess,
        (state, action) => {
            const user = new User(action.accessToken, action.expirationDate);

            return {
                ...state,
                user,
                authError: null,
                loading: false
            }
        }),
    on(AuthActions.authenticateFail,
        (state, action) => {
            return {
                ...state,
                user: null,
                authError: action.errorMessage,
                loading: false
            }
        }),
    on(AuthActions.logout,
        (state, action) => {
            return {
                ...state,
                user: null,
                authError: null,
            }
        }),
    on(AuthActions.clearError,
        (state, action) => {
            return {
                ...state,
                authError: null
            }
        })
)