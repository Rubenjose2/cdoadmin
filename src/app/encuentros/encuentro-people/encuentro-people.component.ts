import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { pipe, take } from 'rxjs';
import { PeopleService } from 'src/app/services/people.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-encuentro-people',
  templateUrl: './encuentro-people.component.html',
  styleUrls: ['./encuentro-people.component.sass']
})
export class EncuentroPeopleComponent implements OnInit {
  dataObj:any = '';
  newObj:any = '';
  encuentroForm!: FormGroup;
  peopleIdParam:string = '';
  

  ageOptions:string[] = ['13-19','20-29','30-39','40-49','50-59','60-69','70+'];
 
  constructor(
    private peopleService: PeopleService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.route.queryParams.subscribe((param:any) => {

      this.peopleIdParam = param['sys_id'];
      
      this.peopleService.getPeopleById(this.peopleIdParam).subscribe(res =>{
        console.log(res);
        //this.dataObj = res;
        this.encuentroForm.patchValue({
          name: res.name || '',
          last_name: res.last_name || '',
          email: res.email || '',
          phone: res.phone || '',
          age: res.age || '',
          refered_by: res.refered_by || '',
          church_from: res.church_from || '',
          emergency_contact: res.emergency_contact || '',
          relationship: res.relationship || '',
          translation: res.translation || '',
          emergency_phone: res.emergency_phone || ''
        })
      });      
    })
  }

  getPeopleDetails(){
    //this.peopleService.getPeopleById()
  }

  createForm(){
    this.encuentroForm = new FormGroup({
      name: new FormControl(),
      last_name : new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      age: new FormControl(),
      refered_by: new FormControl(),
      church_from: new FormControl(),
      emergency_contact: new FormControl(),
      relationship: new FormControl(),
      translation: new FormControl(),
      emergency_phone: new FormControl()
    })
  }

  save(){
    console.log(this.encuentroForm.value);
    this.peopleService.updatePeople(this.peopleIdParam,this.encuentroForm.value);
    this.location.back();
  }

  delete(){
    this.peopleService.deletePeople(this.peopleIdParam);
    this.location.back();

  }

  cancel(){
    this.location.back();
  }

}
