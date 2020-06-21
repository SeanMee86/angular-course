import {
  Actions,
  Effect,
  ofType
} from '@ngrx/effects';
import * as AuthActions from './auth.action';
import {
  catchError,
  map,
  switchMap,
  tap
} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from "../../shared/user.model";
import { AuthService } from "../auth.service";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (resData) => {
  const expirationDate = new Date(
    new Date().getTime() + +resData.expiresIn * 1000
  );
  const user = new User(
    resData.email,
    resData.localId,
    resData.idToken,
    expirationDate
  );
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    email: resData.email,
    userId: resData.localId,
    token: resData.idToken,
    expirationDate: expirationDate,
    redirect: true
  })
}

const handleError = (errorRes) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
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
    case 'TOO_MANY_ATTEMPTS_TRY_LATER : Too many unsuccessful login attempts. Please try again later.':
      errorMessage = 'Too many unsuccessful login attempts please try again later'
      break;
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));
}

@Injectable()
export class AuthEffects {
  fbSignupURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey;
  fbLoginURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey;

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignupStart) => {
      return this.http
        .post<AuthResponseData>(this.fbSignupURL,
          {
            email: signupAction.payload.email,
            password: signupAction.payload.password,
            returnSecureToken: true
          }).
        pipe(
          tap((resData) => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000)
          }),
          map(resData => {
            return handleAuthentication(resData);
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          })
        )
    })
  )

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(this.fbLoginURL,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          }
        ).pipe(
          tap(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000)
          }),
          map(resData => {
            return handleAuthentication(resData);
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          })
        )
    })
  );

  @Effect({dispatch: false})
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap(
      (authSuccessAction: AuthActions.AuthenticateSuccess) => {
        if(authSuccessAction.payload.redirect) {
          this.router.navigate(['/']);
        }
      }
    )
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return { type: 'DUMMY' }
      }
      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );
      if (loadedUser.token) {
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.authService.setLogoutTimer(expirationDuration);
        return new AuthActions.AuthenticateSuccess({
          email: userData.email,
          userId: userData.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate),
          redirect: false
        })
      }
      return { type: 'DUMMY' }
    })
  )

  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
      this.router.navigate(['/authenticate']);
      this.authService.clearLogoutTimer();
    })
  )

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }
}
