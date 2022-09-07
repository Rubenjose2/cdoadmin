import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeopleService } from 'src/app/services/people.service';

@Component({
  selector: 'app-discipulos',
  templateUrl: './discipulos.component.html',
  styleUrls: ['./discipulos.component.sass']
})
export class DiscipulosComponent implements OnInit {

  dataSource:any = [];
  private VARONES = "Encuentro de Varones | Men's Encounter";
  private MUJERES = "Encuentro de Damas | Women's Encounter";

  constructor(
    private peopleService: PeopleService,
    private route: ActivatedRoute
  ) { }

  displayedColumns: string[] = [
    'No',
    'FullName',
    'PhoneNumber',
    'Email',
    'Created'
  ]

 ngOnInit(): void { 
  this.getDiscipulosList();
    
  }

  getDiscipulosList(){
    this.peopleService.getPeopleByDiscipulos$().subscribe(data =>{
      console.log(data);
      this.dataSource = data.map((e:any) =>{
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

}


