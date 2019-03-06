import * as AuthActions from './auth.actions';
import { StartEdit } from 'src/app/shopping-list/store/shopping-list.actions';

export interface State {
    token: string;
    authenticated: boolean;
}

const initialState = {
    token: null,
    authenticated: false
}

export function authReducer(state = initialState, action: AuthActions.AuthActions) {


    switch (action.type) {
        
        case AuthActions.SIGN_IN:
        case AuthActions.SIGN_UP:
            return {
                ...state,
                authenticated: true
            }
        case AuthActions.LOG_OUT:
            return {
                ...state,
                token: null,
                authenticated: false
            }
        case AuthActions.SET_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        default: 
            return state;
    }
}