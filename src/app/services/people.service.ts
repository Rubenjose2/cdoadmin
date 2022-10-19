import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, combineLatest, concatMap, defer, delay, every, expand, map, merge, mergeMap, Observable, of, pipe, Subject, switchMap, take, tap } from 'rxjs';
import { PeopleModel } from '../helpers/people.model';
import { peopleArea } from '../helpers/areaServiceModel';
import { doc, updateDoc, arrayUnion, arrayRemove, collection, DocumentSnapshot, QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore";
import { NewLife } from '../helpers/newLife.model';
import { docJoin } from '../helpers/docJoin';
import { X } from '@angular/cdk/keycodes';


@Injectable({
  providedIn: 'root'
})

export class PeopleService {

  private basePath = '/people';
  _people = new BehaviorSubject<any>(null);

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
      ).valueChanges({idField:'sysId'});
  }

  getNewPeopleByCoach$(coachId:string):Observable<any>{
    let data: any;
    return this.db.collection('people').doc(coachId).valueChanges({idField:'sysId'}).pipe(
      switchMap((r:any) => {
        data = r;
        console.log(data);
        const docs = r['NewLife'].map(
          (item:any) => this.db.collection('people').doc(item).valueChanges({idField:'sysId'})
        )
        return combineLatest(docs);
      })
    )
  }

  getPeopleByDiscipulos$():Observable<any>{
    return this.db.collection("people", ref => ref.where('source','==','discipuladores'))
    .valueChanges({idField:'peopleId'});
  }

  getPeopleById(id:string):Observable<any>{
    return this.db.collection('people').doc(id).valueChanges();
  }

  getAllPeopleByArea(area:serviceArea){
    return this.db.firestore.collection('people').where('servicios','array-contains',area).get()
  }

  getAllPeopleByNewLife(newLife:any){
    return this.db.collection('people', ref=> ref.where('NewLife','==',newLife)).valueChanges({idField:'sysId'})
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

  updateNewLife(id:string, newLifeObj:NewLife){
    this.db.collection('people').doc(id).update({NewLife:newLifeObj});
  }

  //Adding the People to Consolidadores
  updateConsolidador(id:string, peopleId:string) {
    this.db.collection('people').doc(id).update({NewLife: arrayUnion(peopleId)});
  }

  deletePeople(id:string){
    this.db.collection('people').doc(id).delete();
  }


}

export interface serviceArea {
  id:string,
  name:string
}


