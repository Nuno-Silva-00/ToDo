import { createAction, props } from "@ngrx/store";

import { AUTH_AUTHENTICATE_FAIL, AUTH_AUTHENTICATE_SUCCESS, AUTH_AUTO_LOGIN, AUTH_CLEAR_ERROR, AUTH_LOGIN_START, AUTH_LOGOUT, AUTH_SIGNUP_START } from "src/app/shared/Consts/Consts";

export const signupStart = createAction(
    AUTH_SIGNUP_START,
    props<{ name: string, email: string, password: string }>()
);

export const loginStart = createAction(
    AUTH_LOGIN_START,
    props<{ email: string, password: string }>()
);

export const autoLogin = createAction(
    AUTH_AUTO_LOGIN
);

export const authenticateSuccess = createAction(
    AUTH_AUTHENTICATE_SUCCESS,
    props<{ accessToken: string, expirationDate: Date }>()
);


export const authenticateFail = createAction(
    AUTH_AUTHENTICATE_FAIL,
    props<{ errorMessage: string }>()
);

export const logout = createAction(
    AUTH_LOGOUT
);

export const clearError = createAction(
    AUTH_CLEAR_ERROR
);
