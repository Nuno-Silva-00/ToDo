import { Injectable } from "@angular/core";
import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { exhaustMap, map, take } from "rxjs";
import { Store } from "@ngrx/store";

import * as fromApp from '../../store/Reducers/app.reducer'

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private store: Store<fromApp.AppState>) { };

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.store.select('auth').pipe(
            take(1),
            map(authState => {
                return authState.user
            }),
            exhaustMap(user => {
                if (!user) {
                    return next.handle(req)
                } else {
                    const modifiedReq = req.clone({
                        headers: new HttpHeaders().set('x-access-token', user!.token || '')
                    });
                    return next.handle(modifiedReq)
                }
            }));
    }
}