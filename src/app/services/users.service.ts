import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserModel } from '../helpers/user.model';


@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private basePath: string = '/users';
  
  constructor(private db: AngularFirestore) { }

  public getUsersList() {
    return this.db.collection(this.basePath).snapshotChanges();
  }

  public updateUser(user: UserModel) {
    return this.db.collection(this.basePath).doc(user.uid).update(user);
  }

  public getUser(userID?:string){
    return this.db.doc(`users/${userID}`).valueChanges();
  }
}
