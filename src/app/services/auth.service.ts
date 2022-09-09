import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { UserModel } from '../helpers/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private route: Router,
  ) { 
    this.userData$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if(user){
          return this.db.doc<UserModel>(`user/${user.uid}`).valueChanges();
        }else{
          return of(null);
        }
      })
    )
  }

  
}
