import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, combineLatest, Observable, switchMap} from 'rxjs';
import { PeopleBasicInfo, PeopleModel } from '../helpers/people.model';
import { peopleArea } from '../helpers/areaServiceModel';
import { arrayUnion, arrayRemove} from "firebase/firestore";
import { NewLife } from '../helpers/newLife.model';
import { UserModel } from '../helpers/user.model';


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
      .orderBy('submitted','desc')
      .where('source', '==','bienvenido')
      ).valueChanges({idField:'sysId'});
  }

  getNewPeopleByCoach$(coachId:string):Observable<any>{
    let data: any;
    return this.db.collection('people').doc(coachId).valueChanges({idField:'sysId'}).pipe(
      switchMap((r:any) => {
        data = r;
        const docs = r['NewLife'].map(
          (item:any) => this.db.collection('people').doc(item).valueChanges({idField:'sysId'})
        )
        return combineLatest(docs);
      })
    )
  }

  getPeopleByDiscipulos$():Observable<any>{
    return this.db.collection("people", ref => ref.where('source','==','discipuladores').orderBy('submitted', 'desc'))
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

  setNewPeople(user:any){
    return this.db.collection('people').add(
      {
        name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        phone: user.phone,
        source: (user.serviceArea.name == 'Consolidador')?'discipuladores':'local',
        servicios: [user.serviceArea],
        created: new Date().toISOString(),
        submitted: new Date().toISOString()
      }
    )
  }

  setNewPeopleWelcome(user:any){
    console.log(user)
    return this.db.collection('people').add(
      {
        name: user.basicInfo.name,
        last_name: user.basicInfo.last_name,
        email: user.basicInfo.email,
        phone: user.basicInfo.phone,
        addressInfo: user.addressInfo,
        extraInfo: user.extraInfo,
        source:'welcome',
        created: new Date()

      }
    )
  }
  removePeopleServiceArea(id:string,removeArea:peopleArea):void{
    this.db.collection('people').doc(id).update({
      servicios: arrayRemove(removeArea)
    })
  }
  async removePeopleFromNewLife(id:string,cochee:string):Promise<any>{
    this.db.collection('people').doc(id).update({NewLife: arrayRemove(cochee)});
    this.db.collection('people').doc(cochee).update({NewLife:{state:"Drop"}})
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

  updateNewLife(id:string,newLifeObj:NewLife){
    this.db.collection('people').doc(id).update({NewLife:newLifeObj});
  }

  //Adding the People to Consolidadores
  updateConsolidador(id:string, peopleId:string) {
    this.db.collection('people').doc(id).update({NewLife: arrayUnion(peopleId)});
  }

  async updatePeopleBasicInfo(id:string, data:PeopleBasicInfo):Promise<any>{
    console.log(data);
    this.db.collection('people').doc(id).update(data);
  }

  deletePeople(id:string){
    this.db.collection('people').doc(id).delete();
  }


}

export interface serviceArea {
  id:string,
  name:string
}


