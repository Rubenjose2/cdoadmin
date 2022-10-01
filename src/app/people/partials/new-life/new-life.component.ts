import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { NewLife } from 'src/app/helpers/newLife.model';
import { PeopleService } from 'src/app/services/people.service';

@Component({
  selector: 'app-new-life',
  templateUrl: './new-life.component.html',
  styleUrls: ['./new-life.component.sass']
})
export class NewLifeComponent implements OnInit {

  @Input () formGroupName!: string
  @Input () sysId!: string;
  formSetup!:FormGroup;

  options = ['Prospecto','Seguimiento','Inscrito','Graduado','Drop']

  constructor(private rootFormGroup: FormGroupDirective,
    private peopleServices: PeopleService
    ) { }

  ngOnInit(): void {
    this.formSetup = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }

  updateOption(event:any){
    console.log(event.value);
    console.log(this.sysId);
    const newLifeObj = {state:event.value}
    this.peopleServices.updateNewLife(this.sysId,newLifeObj);
  }

}
