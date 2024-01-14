import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/Reducers/app.reducer';
import * as AuthActions from '../store/Actions/auth.actions';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent {
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;
  hide = true;

  private storeSub: Subscription = new Subscription;

  userForm = new FormGroup({
    name: this.isLoginMode ? new FormControl('') : new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private store: Store<fromApp.AppState>, private topMessage: MatSnackBar) { }

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.openTopMessage();
      }
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.userForm.valid) {
      return;
    }

    const name = this.userForm.get('name')!.value;
    const email = this.userForm.get('email')!.value;
    const password = this.userForm.get('password')!.value;

    if (email === null || password === null || name === null) {
      return;
    }

    if (this.isLoginMode) {
      this.store.dispatch(AuthActions.loginStart({ email, password }));
    } else {
      this.store.dispatch(AuthActions.signupStart({ name, email, password }));
    }

    this.userForm.reset();
  }

  openTopMessage() {
    if (this.error) {
      this.topMessage.open((this.error), 'Hide', {
        duration: 3 * 1000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });

      this.store.dispatch(AuthActions.clearError());
    }
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
