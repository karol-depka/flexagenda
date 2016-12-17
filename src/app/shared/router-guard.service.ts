import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { FirebaseAuth, FirebaseAuthState } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

@Injectable()
export class RouterGuardService implements CanActivate {

  constructor (public authService: AuthService,
               private auth: FirebaseAuth,
               private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let url: string = state.url;
    this.authService.redirectUrl = url;
    console.log("Original URL: "+url);
    return this.isLoggedIn();
  }
  isLoggedIn(): Observable<boolean> {
    return this.auth
      .take(1)
      .map((authState: FirebaseAuthState) => !!authState)
      .do(authenticated => {
        if (!authenticated) {
          console.log("Not authenticated!");
          this.router.navigate(['/login'])}; //login page
      })
  }

}