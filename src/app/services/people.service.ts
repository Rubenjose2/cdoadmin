import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, Subject, switchMap } from 'rxjs';
import { PeopleModel } from '../helpers/people.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private basePath = '/people';
  private _people = new BehaviorSubject<any>(null);

  constructor(
    private db: AngularFirestore){}

  getPeople(){
    return this.db.collection(this.basePath, ref => ref.orderBy('grupo')).snapshotChanges();
  }

  getPeopleByEvent$(event:string):Observable<any>{
    return this.db.collection("people", ref => ref.where('event_type','==',event))
    .valueChanges({idField:'peopleId'});
  }

  getPeopleByDiscipulos$():Observable<any>{
    return this.db.collection("people", ref => ref.where('source','==','discipuladores'))
    .valueChanges();
  }

  getPeopleById(id:string):Observable<any>{
    return this.db.collection('people').doc(id).valueChanges();
  }

  updatePeople(id:string, peopleObj:PeopleModel){
    this.db.collection('people').doc(id).update(peopleObj);
    //search for subcollection update or create

    this.db.collection(`people/${id}/encuentros`).doc(peopleObj.encuentroID).set({
      encID: peopleObj.encuentroID,
      maletas: peopleObj.maletas,
      grupo: peopleObj.grupo,
      pago: peopleObj.pago,
      descuento: peopleObj.descuento,
      sponsor: peopleObj.sponsor
    })
  }

  deletePeople(id:string){
    this.db.collection('people').doc(id).delete();
  }

}
