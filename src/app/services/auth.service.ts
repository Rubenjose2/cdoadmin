import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { UserModel,Roles } from '../helpers/user.model';
import { UsersService } from './users.service';
import { QuerySnapshot } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData$: Observable<any>;
  private eventAuthError = new BehaviorSubject<string>("");
  eventAutError$ = this.eventAuthError.asObservable();
  private newUser!: UserModel;
  private userInfo:any = '';

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

    async login( email:string, password: string  ) {
      await this.afAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(()=>{
      });
      this.afAuth.signInWithEmailAndPassword(email,password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredential => {
        if(userCredential){
          this.setCurrenUserInfo(); // <- Saving into the Local Storage
          this.autlogOut(60*60000);
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
          //this.insertUserData(userCredential).then(() => this.route.navigate(['']));
          this.insertUserData(userCredential).then((response:any) => {
            console.log(user.email);
            this.searchForUserProfile(user.email).subscribe((val:any) => {
              // If i got result from the people table I can associate with
              if(val.size === 1){
                //linkging the user information and the people table
                const userCollection = this.db.firestore.collection("users")
                userCollection.where('email','==',user.email)
                .limit(1)
                .get()
                .then(query => {
                  const data = query.docs[0];
                  data.ref.update({user_id: val.docs[0].id})
                });
              }
            });
          });
        }
      )
    }

    private insertUserData(userCredential: any) {
      let rolesModel = new Roles;

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

    private searchForUserProfile(userEmail:string){
      return this.db.collection('people',ref => ref.where('email','==',userEmail)).get();
    }

    logout() {
      localStorage.removeItem('user');
      return this.afAuth.signOut();
    }

    isLoggedIn():boolean{
      return this.afAuth.authState !=null;
    }

    autlogOut(expirationTime:number){
      setTimeout(() => {
        this.logout().then(() => this.route.navigate(['login']));
      },expirationTime)
    }

    // This function is in chage to save the user Information on the local Storage
    setCurrenUserInfo(){
      this.afAuth.authState.subscribe(user =>{
        this.userService.getUser(user?.uid).subscribe((data:any) => {
          localStorage.setItem('user',JSON.stringify(data));
        })
      })
    }

    hasRole(role:string){

      this.afAuth.authState.subscribe(user =>{
        this.userService.getUser(user?.uid).subscribe()
      })
    }

}
