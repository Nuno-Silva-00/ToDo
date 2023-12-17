import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  MatSnackBar
} from '@angular/material/snack-bar';

import { AuthResponseData, AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = '';
  hide = true;

  userForm = new FormGroup({
    name: this.isLoginMode ? new FormControl('') : new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private authService: AuthService, private router: Router, private topMessage: MatSnackBar) { }

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

    this.isLoading = true;

    let authObs: Observable<AuthResponseData>

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(name, email, password);
    }

    authObs.subscribe({
      next: (v) => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error: (errorMessage) => {
        this.isLoading = false;
        this.error = errorMessage;
        this.openTopMessage();
      }
    });

    this.userForm.reset();
  }

  openTopMessage() {
    this.topMessage.open(this.error, 'Hide', {
      duration: 3 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
