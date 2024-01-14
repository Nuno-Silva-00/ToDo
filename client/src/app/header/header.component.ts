import { Component } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/Reducers/app.reducer';
import * as AuthActions from '../store/Actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAuthenticated = false;
  private userSub!: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.userSub = this.store.select('auth').pipe(
      map(
        authState => {
          return authState.user
        }
      )).subscribe(user => {
        this.isAuthenticated = !!user;
      });
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
