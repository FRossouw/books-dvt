import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean | UrlTree> | boolean {
    return this.auth.isAuthenticated$.pipe(
      tap(loggedIn => {
        this.auth.admin = false;
        this.auth.user = false;

        if (this.auth.userProfileData[environment.namespace] && this.auth.userProfileData[environment.namespace].includes('admin')) {
          this.auth.admin = true;
        }

        if (this.auth.userProfileData[environment.namespace] && this.auth.userProfileData[environment.namespace].includes('user')) {
          this.auth.user = true;
        }

        if (!loggedIn) {
          this.auth.login(state.url);
        }
      })
    );
  }

}
