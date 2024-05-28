import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivate,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = localStorage.getItem('token');
    console.log("$$$$$$$$")
    if (token) {
      this.authService.decodeTokenAfterLogin().subscribe(res=>{
        console.log("^^^^^^^^^^^^")
        this.router.navigateByUrl('taches')
        return false;
      },err=>{
        return true;
      })
    } else {

      return true;
    }
  }


}
