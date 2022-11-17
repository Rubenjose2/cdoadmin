import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { PermissionService } from '../services/permission.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private permissionService: PermissionService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.userData$.pipe(
      take(1),
      map(user => user && user.status.active),
      tap(loggedIn => {
        if(!loggedIn) {
          this.router.navigate(['/login']);
        }else{
          this.permissionService.checkPermission(['coach']).subscribe(
            res => { if(res) this.router.navigate(['newlife/myassigns']) }
          )
        }
      })
    )
  }

}
