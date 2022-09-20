import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ServiceAreasService {
  private basePath = '/workingAreas';

  constructor(
    private db: AngularFirestore
  ) { }

  getWorkinAreasList(){
    this.db.doc(this.basePath).valueChanges({idField:'service_id'});
  }
  getUniqueService(id:string){
    this.db.collection(this.basePath).doc(id).valueChanges();
  }
}
