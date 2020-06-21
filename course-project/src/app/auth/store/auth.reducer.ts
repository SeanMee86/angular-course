import {User} from '../../shared/user.model';
import * as AuthActions from './auth.action';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false
}

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const { email, userId, token, expirationDate } = action.payload
      const user = new User(email, userId, token, expirationDate)
      return {
        ...state,
        authError: null,
        user,
        loading: false
      }
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      }
    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
        loading: true
      }
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      }
    default:
      return state;
  }
}
