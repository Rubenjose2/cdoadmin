import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../services/people.service';



@Component({
  selector: 'app-encuentros',
  templateUrl: './encuentros.component.html',
  styleUrls: ['./encuentros.component.sass']
})
export class EncuentrosComponent implements OnInit{

  dataSource:any = [];

  constructor(
    private peopleService: PeopleService

  ) { }

  displayedColumns: string[] = [
    'FullName',
    'PhoneNumber',
    'Email',
    'ReferedBy',
    'ChuchFrom',
    'EmergencyContact',
    'Translation'
  ]

 ngOnInit(): void { 
  this.getPeopleByEvent();
 }

  getPeopleByEvent(){
    this.peopleService.getPeopleByEvent$("Encuentro de Varones | Men's Encounter").subscribe(data =>{
      console.log(data);
      this.dataSource = data.map((e:any) =>{
        return {
          firstName: e.name,
          lastName: e.last_name,
          email: e.email,
          phone: e.phone,
          referedBy: e.refered_by,
          churchFrom: e.church_from,
          translation: e.translation,
          emergencyContact:e.emergency_contact
        }
      })
    })
  }

}

