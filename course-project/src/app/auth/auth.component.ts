import {Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.action';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = false;
  isLoading = false;
  error: string = null;
  private storeSub: Subscription

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(
      authState => {
        this.isLoading = authState.loading;
        this.error = authState.authError;
      }
    )
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const { email, password } = form.value;
    if (this.isLoginMode) {
      this.store.dispatch(new AuthActions.LoginStart({email, password}))
    } else {
      this.store.dispatch(new AuthActions.SignupStart({email, password}))
    }
    form.reset();
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError())
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }
}
