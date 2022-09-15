import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {

  private userInfo:any = localStorage.getItem('user');
  constructor(private auth: AuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let authorized = false
      let roleArray = route.data['role'];
      let userRoleArray = JSON.parse(this.userInfo);
      if(userRoleArray['role']){
        roleArray.forEach((element:string) => {
          userRoleArray['role'].forEach((rol:string) =>{
            if(element === rol) authorized = true;
          })
        });
      }else{
        return false;
      }
    return authorized;
  }
  
}
