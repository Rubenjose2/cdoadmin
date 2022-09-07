import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeopleService } from '../services/people.service';



@Component({
  selector: 'app-encuentros',
  templateUrl: './encuentros.component.html',
  styleUrls: ['./encuentros.component.sass']
})
export class EncuentrosComponent implements OnInit{

  dataSource:any = [];
  private VARONES = "Encuentro de Varones | Men's Encounter";
  private MUJERES = "Encuentro de Damas | Women's Encounter";

  constructor(
    private peopleService: PeopleService,
    private route: ActivatedRoute

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
  this.route.queryParams.subscribe(params => {
    switch (params['type']) {
      case 'varones':
        this.getPeopleByEvent(this.VARONES);
        break;
      case 'mujeres':
        this.getPeopleByEvent(this.MUJERES);
        break;
      default:
        break;
    }
    
  })
 }

  getPeopleByEvent(eventType:string){
    this.peopleService.getPeopleByEvent$(eventType).subscribe(data =>{
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

