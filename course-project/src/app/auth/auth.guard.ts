import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {
  map,
  take,
  tap
} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | Promise<boolean>
    | Observable<boolean> {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => authState.user),
      map(user => !!user),
      tap(isAuth => {
        if (!isAuth) {
          this.router.navigate(['/authenticate']);
        }
      })
    );
  }
}
