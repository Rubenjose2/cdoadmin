import { Injectable } from '@angular/core';
import { map, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private auth: AuthService) { }

  checkPermission(roles:string[]){
    return this.auth.userData$.pipe(
      map(user => {
        if(user){
          return (user.role.filter((val:any) => roles.includes(val))).length>0
        }else{
          return false;
        }

      })
    )
  }
}
