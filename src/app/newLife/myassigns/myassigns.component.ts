import { Component, OnInit } from '@angular/core';
import { coachee } from 'src/app/helpers/newLife.model';
import { PeopleService } from 'src/app/services/people.service';
import {AuthService} from '../../services/auth.service'

@Component({
  selector: 'app-myassigns',
  templateUrl: './myassigns.component.html',
  styleUrls: ['./myassigns.component.sass']
})
export class MyassignsComponent implements OnInit {

  assignments!: coachee[];
  openSection:boolean = false;

  constructor(private authService: AuthService, private peopleService: PeopleService) {
   }

  ngOnInit(): void {
    this.getAssignment();
  }

  //Form Actions
  toggle(element:any){
    element.visible = !element.visible
  }

  getAssignment():void{
    this.authService.userData$.subscribe(user => {
      this.peopleService.getNewPeopleByCoach$(user.user_id).subscribe(userPeople =>{
        this.assignments = userPeople.map((element:coachee)=>{
          return {...element,visble:false};
        })
        console.log(this.assignments);
      }
      )
    })
  }
}
