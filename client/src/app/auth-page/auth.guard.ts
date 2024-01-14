import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivateFn, CanActivateChildFn } from "@angular/router";
import { map, take } from "rxjs";
import { Store } from "@ngrx/store";

import * as fromApp from '../store/Reducers/app.reducer';

export const canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const router = inject(Router);
    const store = inject(Store<fromApp.AppState>);

    return store.select('auth').pipe(
        take(1),
        map(authState => {
            return authState.user
        }),
        map(user => {
            const isAuth = !!user;
            if (isAuth) return true;
            return router.createUrlTree(['/auth']);
        }
        ));
};

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => canActivate(route, state);
