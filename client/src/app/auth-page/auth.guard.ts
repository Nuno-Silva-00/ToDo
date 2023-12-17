import { inject } from "@angular/core";
import { ActivatedRouteSnapshot,  Router, RouterStateSnapshot, CanActivateFn, CanActivateChildFn } from "@angular/router";
import { map, take } from "rxjs";
import { AuthService } from "../services/auth/auth.service";

export const canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.user.pipe(
        take(1),
        map(user => {
            const isAuth = !!user;
            if (isAuth) return true;
            return router.createUrlTree(['/auth']);
        }
        ));
};

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => canActivate(route, state);
