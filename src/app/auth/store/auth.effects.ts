import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as AuthActions from './auth.actions';
import { map, switchMap } from "rxjs/operators";
import * as firebase from 'firebase';
import { fromPromise } from "rxjs/internal-compatibility";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {

    @Effect()
    authSignUp = this.actions$.
                    pipe(ofType(AuthActions.TRY_SIGN_UP))
                    .map((action: AuthActions.TrySignUp) => {
                        return action.payload;
                    })
                    .switchMap((authData: {username: string, password: string}) => {
                        return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
                    })
                    .switchMap(() => {
                        return fromPromise(firebase.auth().currentUser.getIdToken());
                    })
                    .mergeMap((token: string) => {
                        this.router.navigate(['/']);
                        return [
                            {
                                type: AuthActions.SIGN_UP
                            },
                            {
                                type: AuthActions.SET_TOKEN,
                                payload: token
                            }
                        ]
                    });
                    
    
    @Effect()
    authSignIn = this.actions$.
                pipe(ofType(AuthActions.TRY_SIGN_IN))
                .map((action: AuthActions.TrySignUp) => {
                    return action.payload;
                })
                .switchMap((authData: {username: string, password: string}) => {
                    return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
                })
                .switchMap(() => {
                    return fromPromise(firebase.auth().currentUser.getIdToken());
                })
                .mergeMap((token: string) => {
                    this.router.navigate(['/']);
                    return [
                        {
                            type: AuthActions.SIGN_IN
                        },
                        {
                            type: AuthActions.SET_TOKEN,
                            payload: token
                        }
                    ]
                });
    
    @Effect({dispatch: false})
    authLogOut = this.actions$.
                pipe(ofType(AuthActions.LOG_OUT))
                .do(() => {
                    this.router.navigate(['/']);
                })

    constructor(private actions$: Actions, private router: Router) {

    }
}