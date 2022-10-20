import { CdkDragDrop, CdkDragEnter } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { PeopleService } from 'src/app/services/people.service';
import { DndDropEvent } from 'ngx-drag-drop';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asignaciones',
  templateUrl: './asignaciones.component.html',
  styleUrls: ['./asignaciones.component.sass']
})
export class AsignacionesComponent implements OnInit {
  peopleModel:any = []
  consolidador:any = []
  private CONSOLIDADORES = {
    id:'VDTJSECLTLFD6tRPvrps',
    name:'Consolidador'
  }

  draggable = {
    data: "myData"
  }

  constructor(
    private peopleService: PeopleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPeopleList();
    this.getConsolidadoresList();
  }

  getPeopleList(){
    this.peopleService.getAllPeopleByNewLife({state:'Prospecto'}).subscribe( data => {
      this.peopleModel = data.map((res:any) => {return res});
    })
  }
  async getConsolidadoresList() {
    const snapshot = await this.peopleService.getAllPeopleByArea(this.CONSOLIDADORES);
    this.consolidador = (snapshot.docs.map(doc => {
      return {
        id: doc.id,
        data: doc.data(),
        coaching: (doc.data()['NewLife']) ? doc.data()['NewLife'].length : 0
      }
    }));
    console.log(this.consolidador);
  }

  onDrop(event:DndDropEvent, coach:any){
    this.peopleService.updateConsolidador(coach.id,event.data);
    this.peopleService.updateNewLife(event.data,{state:'Seguimiento', coach:{
      id:coach.id,
      name:coach.data.name,
      last_name:coach.data.last_name
    }})
    this.getConsolidadoresList();
  }

  openInformation(sysId:string){
    this.router.navigate(['../../people'],{ queryParams: {sys_id : sysId}});
  }

}
