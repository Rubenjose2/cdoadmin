import { Component, Input, OnInit } from '@angular/core';
import { comments } from 'src/app/helpers/newLife.model';
import { NewLifeService } from 'src/app/services/new-life.service';

@Component({
  selector: 'app-historical-comments',
  templateUrl: './historical-comments.component.html',
  styleUrls: ['./historical-comments.component.sass']
})
export class HistoricalCommentsComponent implements OnInit {

  @Input () data:any = '';

  comments!:comments[]

  constructor(private newLifeService: NewLifeService) { }

  ngOnInit(): void {
    this.getComments(this.data.NewLife.coach.id, this.data.sysId);
  }

  getComments(coach: string, coachee: string){
    this.newLifeService.getCommentByCoach(coach, coachee).subscribe((val:any) => this.comments = val)
  }



}
