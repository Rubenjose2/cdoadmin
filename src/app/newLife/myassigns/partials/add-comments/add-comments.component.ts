import { Component, Input, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewLifeService } from 'src/app/services/new-life.service';

@Component({
  selector: 'app-add-comments',
  templateUrl: './add-comments.component.html',
  styleUrls: ['./add-comments.component.sass']
})
export class AddCommentsComponent implements OnInit {

  @Input () data: any = '';
  commentForm = new FormGroup({
    message: new FormControl('',[
      Validators.required,
      Validators.minLength(10)
    ])
  })
  constructor(private newLifeService: NewLifeService, private db: AngularFirestore) { }

  ngOnInit(): void {
  }

  addComment(){
    if (this.commentForm.valid){
      this.newLifeService.setComment({
        coach:this.data.NewLife.coach.id,
        coachee:this.data.sysId,
        comment:this.commentForm.value.message,
        dateTime: new Date()
      }).then(()=>{
        //Here to emit the value and close the comment tap
        this.commentForm.setValue({message:''})
      })
    }

  }

}
