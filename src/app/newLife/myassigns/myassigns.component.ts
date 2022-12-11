import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { coachee } from 'src/app/helpers/newLife.model';
import { PeopleService } from 'src/app/services/people.service';
import {AuthService} from '../../services/auth.service'

@Component({
  selector: 'app-myassigns',
  templateUrl: './myassigns.component.html',
  styleUrls: ['./myassigns.component.sass'],
  animations: [
    trigger('openClose', [
      state('open', style({ height: '*'})),
      state('closed', style({ height: '0px'})),
      transition('closed <=> open', [
        animate('0.3s')
      ]),
    ])
  ]
})
export class MyassignsComponent implements OnInit {

  assignments!: coachee[];
  openSection:boolean = false;

  constructor(
    private authService: AuthService,
    private peopleService: PeopleService,
    private router: Router
    ) {
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
      if(user){
        this.peopleService.getNewPeopleByCoach$(user.user_id).subscribe(userPeople =>{
          this.assignments = userPeople.map((element:coachee)=>{
            return {...element,visble:false};
          })
        }
        )
      }else{
        this.router.navigate(['/login']);
      }
    })
  }
}
