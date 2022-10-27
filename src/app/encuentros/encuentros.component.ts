import { group } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ExportExcelService } from '../services/export-excel.service';
import { PeopleService } from '../services/people.service';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-encuentros',
  templateUrl: './encuentros.component.html',
  styleUrls: ['./encuentros.component.sass']
})
export class EncuentrosComponent implements OnInit{

  dataSource:any = [];
  private VARONES = "Encuentro de Varones | Men's Encounter";
  private MUJERES = "Encuentro de Damas | Women's Encounter";
  private JOVENES = "Encuentro de Jovenes | Youth Encounter";
  eventName: string = '';

  constructor(
    private peopleService: PeopleService,
    private route: ActivatedRoute,
    private exportServices: ExportExcelService

  ) { }

  displayedColumns: string[] = [
    'No',
    'FullName',
    'PhoneNumber',
    'Email',
    'ReferedBy',
    'ChuchFrom',
    'EmergencyContact',
    'Translation',
    'Age',
    'Group',
    'Payment'
  ]

 ngOnInit(): void { 
  this.route.queryParams.subscribe(params => {
    switch (params['type']) {
      case 'varones':
        this.getPeopleByEvent(this.VARONES);
        this.eventName = this.VARONES;
        break;
      case 'mujeres':
        this.getPeopleByEvent(this.MUJERES);
        this.eventName = this.MUJERES;
        break;
      case 'jovenes':
        this.getPeopleByEvent(this.JOVENES);
        this.eventName = this.JOVENES;
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
          id: e.peopleId,
          firstName: e.name,
          lastName: e.last_name,
          email: e.email,
          phone: e.phone,
          referedBy: e.refered_by,
          churchFrom: e.church_from,
          translation: e.translation,
          emergencyContact:e.emergency_contact,
          emergencyPhone: e.emergency_phone,
          age:e.age,
          group: e.grupo,
          checkIn: e.checkIn,
          payment:e.pagoDone
        }
      })
    })
  }

  exportToExcel():void{
    this.exportServices.exportTableElmToExcel(this.dataSource,'encuentro_data');
  }

}

