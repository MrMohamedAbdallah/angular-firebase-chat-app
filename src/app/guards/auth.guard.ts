import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  // Inject auth service & Router
  constructor(private authService: AuthService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{

    // Get auth state
    let state = this.authService.getUserState();

    if(state === null){
      return this.authService.userStateSubject.pipe(map( (value) : boolean => {
        if(!value){
          this.router.navigate(['/login']);
        }
        return value;
      }));
    } else if(state === true){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false; 
    }

  }

}
