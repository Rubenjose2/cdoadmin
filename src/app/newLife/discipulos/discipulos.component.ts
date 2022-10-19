import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PeopleService } from 'src/app/services/people.service';

@Component({
  selector: 'app-discipulos',
  templateUrl: './discipulos.component.html',
  styleUrls: ['./discipulos.component.sass']
})
export class DiscipulosComponent implements OnInit, AfterViewInit {

  dataSource!: MatTableDataSource<any>
  private VARONES = "Encuentro de Varones | Men's Encounter";
  private MUJERES = "Encuentro de Damas | Women's Encounter";

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private peopleService: PeopleService,
    private router: Router
  ) {

   }

  displayedColumns: string[] = [
    'No',
    'fullName',
    'phone',
    'email',
    'created'
  ]

 ngOnInit(): void { 

  
}
ngAfterViewInit():void{
  this.getDiscipulosList();
  
}

  getDiscipulosList(){
    this.peopleService.getPeopleByDiscipulos$().subscribe(data =>{
      console.log(data);
      this.dataSource = new MatTableDataSource(data.map((e:any) =>{
        return {
          id: e.peopleId,
          fullName : e.name + ' ' + e.last_name,
          email: e.email,
          phone: e.phone,
          created : e.created
        }
      }))
      console.log(this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  clickedRow(row:any){
    this.router.navigate(['../../people'],{ queryParams: {sys_id : row.id}});
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}


