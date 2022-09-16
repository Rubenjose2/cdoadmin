import { Component, OnInit } from '@angular/core';
import { PeopleService } from 'src/app/services/people.service';

@Component({
  selector: 'app-asignaciones',
  templateUrl: './asignaciones.component.html',
  styleUrls: ['./asignaciones.component.sass']
})
export class AsignacionesComponent implements OnInit {
  peopleModel:any = []

  constructor(
    private peopleService: PeopleService
  ) { }

  ngOnInit(): void {
    this.getPeopleList();
  }

  getPeopleList(){
    this.peopleService.getAll$().subscribe(data =>{
      this.peopleModel = data.map((e:any) =>{
        return {
          firstName: e.name,
          lastName: e.last_name,
          email: e.email,
          phone: e.phone,
          created : e.created
        }
      })
    })
  }

  drop(event:any){

  }

}
