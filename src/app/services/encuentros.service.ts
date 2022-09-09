import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class EncuentrosService {
  private basePath ='encuentros';


  constructor(
    private db: AngularFirestore
  ) { }

  getEncuentrosList(){
    return this.db.collection(this.basePath, ref => ref.where('active','==',true)).valueChanges({idField:'encuentroID'});
  }
}
