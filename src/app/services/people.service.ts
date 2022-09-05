import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, Subject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private basePath = '/people';
  private _people = new BehaviorSubject<any>(null);

  constructor(
    private db: AngularFirestore){}

  getPeople(){
    return this.db.collection(this.basePath).snapshotChanges();
  }

  getPeopleByEvent$(event:string):Observable<any>{
    return this.db.collection("people", ref => ref.where('event_type','==',event))
    .valueChanges();
  }

}
