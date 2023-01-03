import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { combineLatest, combineLatestAll, combineLatestWith, forkJoin, map, merge, mergeAll, Observable, of, switchMap, switchScan, zip } from 'rxjs';
import { comments } from '../helpers/newLife.model';

@Injectable({
  providedIn: 'root'
})
export class NewLifeService {

  private path = 'newLifeComments'

  constructor(private db: AngularFirestore,) { }

  setComment(comment:comments){
    return this.db.collection(this.path).doc().set(comment)
  }

  setMessageReadStatus(sysId:string){
    this.db.collection(this.path).doc(sysId).update(
      {
        audit:{
          status: 'read',
          date: Date()
        }
      }
    )
  }

  getCommentByCoach(coach:string, coachee:string){
    return this.db.collection(this.path, ref => ref
      .orderBy('dateTime','desc')
      .where('coach','==',coach)
      .where('coachee','==',coachee))
      .valueChanges()
  }

  getMessagesList():Observable<any>{
    const messages$ = this.db.collection('newLifeComments', ref => ref.orderBy('dateTime','desc')).valueChanges({idField:'sysId'});
    const coach$ = this.db.collection('people').valueChanges({idField:'sysId'});

    return zip (messages$, coach$).pipe(
      map(([messages,coaches]) => {
        return messages.map((message:any, index)=> ({
          ...message,
          coach: coaches.reduce((acc,el) => {return el.sysId == message.coach ? el : acc},{}),
          coachee: coaches.reduce((acc,el) => {return el.sysId == message.coachee ? el : acc},{})
        }))
      })
    )
  }
}
