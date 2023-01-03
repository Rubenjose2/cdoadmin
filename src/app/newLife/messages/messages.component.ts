import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { concat } from 'rxjs';
import { comments } from 'src/app/helpers/newLife.model';
import { NewLifeService } from 'src/app/services/new-life.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.sass'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MessagesComponent implements OnInit {

  dataSource!: any;
  columnToDisplay = ['Name','Coach','Date','Status'];
  expandedElement: any | null;

  constructor(private newLifeService: NewLifeService) { }

  ngOnInit(): void {
    this.getMessagesList();
  }

  getMessagesList(){
    this.newLifeService.getMessagesList().subscribe(list=>{
      //console.log(list);
      this.dataSource =  list.map( (el:any) => {
        return{
        Name: [el.coachee.name, el.coachee.last_name].join(' '),
        Coach: [el.coach.name,el.coach.last_name].join(' '),
        Date: el.dateTime.toDate().toDateString(),
        comment: el.comment,
        Status: 'New',
        sys_id: el.sysId

        }
      })
    })
  }


  updateStatus(element:any){
    console.log(element);
  }

}
