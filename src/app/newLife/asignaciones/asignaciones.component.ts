import { CdkDragDrop, CdkDragEnter } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { PeopleService } from 'src/app/services/people.service';
import { DndDropEvent } from 'ngx-drag-drop';

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
    private peopleService: PeopleService
  ) { }

  ngOnInit(): void {
    this.getPeopleList();
    this.getConsolidadoresList();
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
  async getConsolidadoresList() {
    const snapshot = await this.peopleService.getAllPeopleByArea(this.CONSOLIDADORES);
    this.consolidador = (snapshot.docs.map(doc =>doc.data()));
  }

  onDrop(event:DndDropEvent, i:any){
    console.log(event);
    console.log(i)
  }

}
