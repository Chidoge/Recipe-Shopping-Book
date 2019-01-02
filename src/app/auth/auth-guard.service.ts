import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';


@Injectable()

export class AuthGuardService implements CanActivate {

	constructor(private authService : AuthService, private router : Router) {}
	
	canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) {
		this.router.navigate(['/']);
		return this.authService.isAuthenticated();
	}
}