import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()

export class AuthService {

	token : string;

	constructor(private router : Router) {}


	signUpUser(email : string, password : string) {
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(response => {
			console.log(response);
		})
		.catch(
			(error) => {
				console.log(error);
			}
		)
	}

	signInUser(email : string, password : string) {
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(
			(response) => {
				firebase.auth().currentUser.getIdToken()
				.then(
					(token : string) => {
						this.token = token;
					}
				)
				this.router.navigate(['/']);
				
		})
		.catch(
			(error) => {
				console.log(error);
			}
		)
	}

	getToken() {
		firebase.auth().currentUser.getIdToken()
		.then(
			(token : string) => {
				this.token = token;
			}
		);
		return this.token;
	}

	logOut() {
		firebase.auth().signOut();
		this.token = null;
	}

	isAuthenticated() {
		return this.token != null;
	}
}