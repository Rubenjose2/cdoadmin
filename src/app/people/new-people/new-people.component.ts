import { Component, OnInit } from '@angular/core';
import { PeopleService } from 'src/app/services/people.service';

@Component({
  selector: 'app-new-people',
  templateUrl: './new-people.component.html',
  styleUrls: ['./new-people.component.sass']
})
export class NewPeopleComponent implements OnInit {

  dataSource:any = [];

  displayedColumns: string[] = [
    'No',
    'FullName',
    'PhoneNumber',
    'Email',
    'Created'
  ]

  constructor(private peopleService: PeopleService) { }

  ngOnInit(): void {
    this.getDiscipulosList();
  }

  getDiscipulosList(){
    this.peopleService.getNewPeople$().subscribe(data =>{
      console.log(data);
      this.dataSource = data.map((e:any) =>{
        return {
          id: e.peopleId,
          firstName: e.name,
          lastName: e.last_name,
          email: e.email,
          phone: e.phone,
          created : new Date(e.submitted).toLocaleDateString("en-US")
        }
      })
    })
  }
}
