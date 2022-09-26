import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, Subject, switchMap } from 'rxjs';
import { PeopleModel } from '../helpers/people.model';
import { peopleArea } from '../helpers/areaServiceModel';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";


@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private basePath = '/people';
  private _people = new BehaviorSubject<any>(null);

  constructor(
    private db: AngularFirestore,
    ){}

  getPeople(){
    return this.db.collection(this.basePath, ref => ref.orderBy('grupo')).snapshotChanges();
  }

  getAll$():Observable<any> {
    return this.db.collection(this.basePath, ref => ref.orderBy('name')).valueChanges();
  }

  getPeopleByEvent$(event:string):Observable<any>{
    return this.db.collection("people", ref => ref
    .orderBy('name')
    .where('event_type','==',event))
    .valueChanges({idField:'peopleId'});
  }

  getNewPeople$():Observable<any>{
    return this.db.collection('people', ref => ref
      .orderBy('name')
      .where('source', '==','bienvenido')
      ).valueChanges({idField:'peopleId'});
  }

  getPeopleByDiscipulos$():Observable<any>{
    return this.db.collection("people", ref => ref.where('source','==','discipuladores'))
    .valueChanges({idField:'peopleId'});
  }

  getPeopleById(id:string):Observable<any>{
    return this.db.collection('people').doc(id).valueChanges();
  }

  setPeopleServiceArea(id:string, newArea: peopleArea):void{
    this.db.collection('people').doc(id).update({
      servicios: arrayUnion(newArea)
    })
  }
  removePeopleServiceArea(id:string,removeArea:peopleArea):void{
    this.db.collection('people').doc(id).update({
      servicios: arrayRemove(removeArea)
    })
  }
  updatePeople(id:string, peopleObj:PeopleModel){
    this.db.collection('people').doc(id).update(peopleObj);
    //search for subcollection update or create

    this.db.collection(`people/${id}/encuentros`).doc(peopleObj.encuentroID).set({
      checkIn: peopleObj.checkIn,
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


