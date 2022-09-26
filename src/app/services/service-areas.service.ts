import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceAreasService {
  private basePath = '/workingAreas';

  constructor(
    private db: AngularFirestore
  ) { }

  getWorkinAreasList():Observable<any>{
    return this.db.collection(this.basePath).valueChanges({ idField: 'id' });
  }
  getUniqueService(id:string){
    this.db.collection(this.basePath).doc(id).valueChanges();
  }
}
