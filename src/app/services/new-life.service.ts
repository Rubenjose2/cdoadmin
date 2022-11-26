import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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

  getCommentByCoach(coach:string, coachee:string){
    return this.db.collection(this.path, ref => ref
      .orderBy('dateTime','desc')
      .where('coach','==',coach)
      .where('coachee','==',coachee))
      .valueChanges()
  }
}
