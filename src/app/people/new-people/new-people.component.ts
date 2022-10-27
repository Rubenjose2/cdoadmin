import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Normalizer} from 'src/app/helpers/people.model';
import { PeopleService } from 'src/app/services/people.service';

@Component({
  selector: 'app-new-people',
  templateUrl: './new-people.component.html',
  styleUrls: ['./new-people.component.sass']
})
export class NewPeopleComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input () sysId: string = '';
  title = ''
  filtered!:boolean

  dataSource!:MatTableDataSource<any>

  displayedColumns: string[] = [
    'No',
    'FullName',
    'PhoneNumber',
    'Email',
    'ageRange',
    'coach',
    'state',
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
    this.router.navigate(['../../people'],{ queryParams: {sys_id : row.id}});
  }

  drop(element:any){
    if(this.sysId){
      this.peopleService.removePeopleFromNewLife(this.sysId,element.id).then(() =>
        this.getDiscipulosFiltered(this.sysId)
      )
    }
  }
  getDiscipulosList(){
    this.peopleService.getNewPeople$().subscribe(data =>{
      this.dataSource = new MatTableDataSource(this.normalizer.toPeople(data))
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  getDiscipulosFiltered(sysId:string){
    const testing = this.peopleService.getNewPeopleByCoach$(sysId).subscribe((data) => {
      this.dataSource = new MatTableDataSource(this.normalizer.toPeople(data));
    })
  }

  //-------Mat Table --------//
  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
