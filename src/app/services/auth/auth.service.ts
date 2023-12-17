import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  accessToken: string,
  expiresIn: number
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User | null>(null);
  path = environment.API + '/api/user';
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  signup(name: string, email: string, password: string) {
    return this.http.post<AuthResponseData>(
      this.path + '/create',
      {
        name,
        email,
        password
      }
    ).pipe(catchError(this.handleError),
      tap((resData: any) => {
        this.handleAuthentication(resData.accessToken, +resData.expiresIn)
      }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      this.path + '/login',
      {
        email,
        password
      }
    ).pipe(catchError(this.handleError),
      tap((resData: any) => {
        this.handleAuthentication(resData.accessToken, +resData.expiresIn)
      }));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const userData: {
      _token: string,
      _tokenExpirationDate: number
    } = JSON.parse(localStorage.getItem('userData') || "{}");

    if (!userData) {
      return;
    }

    const loadedUser = new User(userData._token, new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration * 1000);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }


  private handleAuthentication(accessToken: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(accessToken, expirationDate);

    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(expiresIn * 1000);
  };

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error ocurred';
    if (!errorRes.error || !errorRes.error.message) {
      return throwError(() => errorMessage);
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
    return throwError(() => errorMessage);
  }
}
