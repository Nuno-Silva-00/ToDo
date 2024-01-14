import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';

import * as fromApp from './store/Reducers/app.reducer'
import { autoLogin, loginStart } from './store/Actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    if (environment.production) {
      this.store.dispatch(autoLogin());
    } else {
      this.store.dispatch(loginStart({ email: "teste@teste.com", password: "teste@teste.com" }));
    }
  }
}
