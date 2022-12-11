import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { UserModel,Roles } from '../helpers/user.model';
import { UsersService } from './users.service';
import { QuerySnapshot } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { PeopleService } from './people.service';
import { E } from '@angular/cdk/keycodes';

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
    private userService: UsersService,
    private peopleService: PeopleService
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

    getAuth(){
      return this.afAuth;
    }

    createUser(user:any){
      this.afAuth.createUserWithEmailAndPassword(user.email,user.password).then(
        userCredential => {
          this.newUser = user
          userCredential.user?.updateProfile({
            displayName: user.firstName + ' ' + user.lastName
          })
          this.insertUserData(userCredential).then((response:any) => {
            console.log(user.email);
            this.searchForUserProfile(user.email).subscribe((val:any) => {
              // If i got result from the people table I can associate with
              if(val.size === 1){

                //linkging the user information and the people table
                this.linkUserWithPeople(user.email,val.docs[0].id);

              }else{
                // would need to add the information into the People Table
                const newPeople = this.peopleService.setNewPeople(user)
                newPeople.then(val => {
                  this.linkUserWithPeople(user.email,val.id);
                })
              }
              this.route.navigate(['thanks']);
            });
          });
        }
      ).catch((error:FirebaseError) => {
        this.eventAuthError.next(error.message);
      });
    }

    resetPasswordInit(email:string){
      this.afAuth.sendPasswordResetEmail(email,
        {url:'http://cdopeople.com/password_management'})
        .catch(error=> console.log(error));
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
    private linkUserWithPeople(email:string, userId:string) {
      const userCollection = this.db.firestore.collection("users")
      userCollection.where('email','==',email)
      .limit(1)
      .get()
      .then(query => {
        const data = query.docs[0];
        data.ref.update({user_id: userId})
      });
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

    GoogleAuth(){
      return this.AuthLogin(new firebase.auth.GoogleAuthProvider)
    }

    AuthLogin(provider:any){
      return this.afAuth
      .signInWithPopup(provider)
      .then((userCredential)=> {
        console.log(userCredential);
        this.route.navigate(['']);
      })
      .catch(error => console.log(error))
    }

}
