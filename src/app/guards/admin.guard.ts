import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.userProfileData !== null) {
      if (this.auth.userProfileData[environment.namespace] && this.auth.userProfileData[environment.namespace].includes('admin')) {
        this.auth.admin = true;
        this.auth.user = false;
        return true;
      }
    }
    this.auth.admin = false;
    this.auth.user = false;
    this.router.navigate(['/forbidden']);
    return false;
  }
  
}
