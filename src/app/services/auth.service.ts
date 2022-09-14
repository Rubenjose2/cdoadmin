import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { UserModel,Roles } from '../helpers/user.model';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData$: Observable<any>;
  private eventAuthError = new BehaviorSubject<string>("");
  eventAutError$ = this.eventAuthError.asObservable();
  private newUser!: UserModel;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private route: Router,
    private userService: UsersService
  ) { 
    this.userData$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if(user){
          return this.db.doc<UserModel>(`users/${user.uid}`).valueChanges();
        }else{
          return of(null);
        }
      })
    )
  }

   /**
   * Function to use Regular login with Email and password
   * @param email
   * @param password
   */

    login( email:string, password: string  ) {
      this.afAuth.signInWithEmailAndPassword(email,password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredential => {
        if(userCredential){
          this.route.navigate(['']);
        }
        
      })
    }

    createUser(user:any){
      this.afAuth.createUserWithEmailAndPassword(user.email,user.password).then(
        userCredential => {
          this.newUser = user
          userCredential.user?.updateProfile({
            displayName: user.firstName + ' ' + user.lastName
          })
          this.insertUserData(userCredential).then(() => this.route.navigate(['']));

        }
      )

    }

    private insertUserData(userCredential: any) {
      let rolesModel = new Roles;
      console.log(userCredential);
      console.log(this.newUser);
      return this.db.doc(`users/${userCredential.user.uid}`).set({
        email: this.newUser.email,
        firstName: this.newUser.firstName,
        lastName: this.newUser.lastName,
        status: {
          pending: true
        },
        roles: Object.assign({},rolesModel)
      })
    }

    logout() {
      return this.afAuth.signOut();
    }

    isLoggedIn():boolean{
      return this.afAuth.authState !=null;
    }

    hasRole(role:string){

      this.afAuth.authState.subscribe(user =>{
        this.userService.getUser(user?.uid).subscribe((response:any) =>{
          let userData = response.payload.data();
          console.log(userData);
          userData.role.every((element: any) => {
            if(element && element.indexOf(role) === -1){
              console.log('have the role');
            }
          });
        })
      })
      return true;
}
    
}
