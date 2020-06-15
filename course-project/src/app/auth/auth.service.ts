import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  fbSignupURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCKNH-KPfiohJQmNrbR8coCsOSldEx-vvM';
  fbLoginURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCKNH-KPfiohJQmNrbR8coCsOSldEx-vvM';

  constructor(private http: HttpClient) { }

  static handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is incorrect.';
        break;
    }
    return throwError(errorMessage);
  }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.fbSignupURL,
        {
          email,
          password,
          returnSecureToken: true
        })
      .pipe(
        catchError(AuthService.handleError)
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.fbLoginURL,
        {
          email,
          password,
          returnSecureToken: true
        })
      .pipe(
        catchError(AuthService.handleError)
      );
  }
}
