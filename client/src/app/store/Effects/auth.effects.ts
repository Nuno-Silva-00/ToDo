import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

import * as AuthActions from '../Actions/auth.actions'
import * as CONSTANTS from '../../shared/Consts/Consts'
import { environment } from "src/environments/environment";
import { User } from "src/app/shared/models/user.model";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth/auth.service";

export interface AuthResponseData {
    accessToken: string,
    expiresIn: number
}

const handleAuthentication = (expiresIn: number, accessToken: string) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    const user = new User(accessToken, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));

    return AuthActions.authenticateSuccess({ accessToken, expirationDate });
};

const handleError = (errorRes: any) => {
    let errorMessage = 'An unknown error ocurred';

    if (!errorRes.error || !errorRes.error.message) {
        return of(AuthActions.authenticateFail({ errorMessage }));
    }

    switch (errorRes.error.message) {
        case 'EMAIL_NOT_FOUND':
            errorMessage = 'Email not Found!';
            break;
        case 'WRONG_PASSWORD':
            errorMessage = 'Wrong Password!';
            break;
        case 'EMAIL_EXISTS':
            errorMessage = 'This Email already exists!';
            break;
    }
    return of(AuthActions.authenticateFail({ errorMessage }));
}

@Injectable()
export class AuthEffects {
    path = environment.API + '/api/user';

    authSignup = createEffect(() => this.actions$.pipe(
        ofType(CONSTANTS.AUTH_SIGNUP_START),
        switchMap((signupData: { name: String, email: String, password: string }) => {
            return this.http.post<AuthResponseData>(
                this.path + '/create',
                {
                    name: signupData.name,
                    email: signupData.email,
                    password: signupData.password
                }
            ).pipe(
                tap(resData => {
                    this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                }),
                map(resData => {
                    return handleAuthentication(+resData.expiresIn, resData.accessToken);
                }),
                catchError(errorRes => {
                    return handleError(errorRes);
                })
            )
        })
    ))

    authLogin = createEffect(() => this.actions$.pipe(
        ofType(CONSTANTS.AUTH_LOGIN_START),
        switchMap((authData: { email: string, password: string }) => {
            return this.http
                .post<AuthResponseData>(
                    this.path + '/login',
                    {
                        email: authData.email,
                        password: authData.password
                    }
                ).pipe(
                    tap(resData => {
                        this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                    }),
                    map(resData => {
                        return handleAuthentication(+resData.expiresIn, resData.accessToken);
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes);
                    })
                )
        }),
    ));

    autoLogin = createEffect(() => this.actions$.pipe(
        ofType(CONSTANTS.AUTH_AUTO_LOGIN),
        map(() => {
            const userData: {
                _token: string,
                _tokenExpirationDate: number
            } = JSON.parse(localStorage.getItem('userData') || "{}");

            if (localStorage.getItem('userData') == null) {
                return { type: 'DUMMY' };
            }

            const loadedUser = new User(userData._token, new Date(userData._tokenExpirationDate));

            if (loadedUser.token) {
                const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.authService.setLogoutTimer(expirationDuration);

                return AuthActions.authenticateSuccess({ accessToken: loadedUser.token, expirationDate: new Date(userData._tokenExpirationDate) });
            }

            return { type: 'DUMMY' };
        })
    ));

    authSuccess = createEffect(() => this.actions$.pipe(
        ofType(CONSTANTS.AUTH_AUTHENTICATE_SUCCESS),
        tap(() => {
            this.router.navigate(['/']);
        })
    ),
        { dispatch: false }
    );

    authLogout = createEffect(() => this.actions$.pipe(
        ofType(CONSTANTS.AUTH_LOGOUT),
        tap(() => {
            this.router.navigate(['/auth']);
            this.authService.clearLogoutTimer();
            localStorage.removeItem('userData');
        })
    ),
        { dispatch: false }
    )

    constructor(private authService: AuthService, private actions$: Actions, private http: HttpClient, private router: Router) { }

}