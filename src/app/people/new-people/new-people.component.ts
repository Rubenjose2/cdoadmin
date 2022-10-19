import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Normalizer} from 'src/app/helpers/people.model';
import { PeopleService } from 'src/app/services/people.service';

@Component({
  selector: 'app-new-people',
  templateUrl: './new-people.component.html',
  styleUrls: ['./new-people.component.sass']
})
export class NewPeopleComponent implements OnInit {

  @Input () sysId: string = '';
  title = ''
  filtered!:boolean

  dataSource:any = [];

  displayedColumns: string[] = [
    'No',
    'FullName',
    'PhoneNumber',
    'Email',
    'ageRange',
    'Created',
    'Action'
  ]

  constructor(
    private peopleService: PeopleService, 
    private normalizer: Normalizer,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.filtered = (this.sysId !='') ? true:false
    this.title = this.filtered ? 'Mis Seguimientos': 'Convertidos o Invitados';
    this.filtered ? this.getDiscipulosFiltered(this.sysId) : this.getDiscipulosList();
  }

  clickedRow(row:any) {
    console.log(row)
    this.router.navigate(['../../people'],{ queryParams: {sys_id : row.id}});
  }

  drop(element:any){
    console.log(element);
  }

  getDiscipulosList(){
    this.peopleService.getNewPeople$().subscribe(data =>{
      this.dataSource = this.normalizer.toPeople(data)})
  }
  getDiscipulosFiltered(sysId:string){
    const testing = this.peopleService.getNewPeopleByCoach$(sysId).subscribe((data) => {
      this.dataSource = this.normalizer.toPeople(data);
      console.log(this.dataSource);
    })
  }
}
