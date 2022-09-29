import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PeopleService } from 'src/app/services/people.service';
import { ServiceAreasService } from 'src/app/services/service-areas.service';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { map, Observable, startWith } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.sass']
})
export class PeopleComponent implements OnInit {

  private peopleidParam:string = '';
  peopleForm!:FormGroup;
  allWorkingAreas:any = [];
  peopleAreas:any = []; //<-Coming from the API
  separatorKeysCodes: number[] = [ENTER, COMMA];
  

  constructor(
    private peopleService: PeopleService,
    private route : ActivatedRoute,
    private workinService: ServiceAreasService,
    private _snackbar : MatSnackBar
    ) {

    }

  ngOnInit(): void {
    this.createForm();
    this.route.queryParams.subscribe((param:any) => {
      this.peopleidParam = param['sys_id'];
      this.peopleService.getPeopleById(this.peopleidParam).subscribe(res =>{
        console.log(res);
        this.peopleForm.patchValue({
          basicInfo:
          {
              name: res.name || '',
              last_name: res.last_name || '',
              email: res.email || '',
              phone: res.phone || '',
          },
          encuentros:{
            age: res.age || '',
            refered_by: res.refered_by || '',
            church_from: res.church_from || '',
            emergency_contact: res.emergency_contact || '',
            relationship: res.relationship || '',
            translation: res.translation || '',
            emergency_phone: res.emergency_phone || '',
            encuentroID: res.encuentroID|| '',
            maletas: res.maletas || '',
            grupo: res.grupo || '',
            pago: res.pago || '',
            descuento: res.descuento || '',
            sponsor: res.sponsor || '',
            checkIn: res.checkIn || ''
          },
          setup:{
            source: res.source || '',
            submittion: res.submitted || ''
          }
        })
        this.peopleAreas =  res.servicios || [];
      });   
    });
    this.getWorkingAreas();
    this.peopleForm.get('workingAreas')?.valueChanges.subscribe((value:any | null) =>{
      if(value.name){
        this.allWorkingAreas = this._filter(this.allWorkingAreas,value.name);
      }
      
    })
  }
  createForm(){
    this.peopleForm = new FormGroup({
      basicInfo: new FormGroup({
        name: new FormControl(),
        last_name : new FormControl(),
        email: new FormControl(),
        phone: new FormControl(),
        services: new FormControl()
      }),
      age: new FormControl(),
      refered_by: new FormControl(),
      church_from: new FormControl(),
      emergency_contact: new FormControl(),
      relationship: new FormControl(),
      translation: new FormControl(),
      emergency_phone: new FormControl(),
      encuentroID: new FormControl(),
      maletas: new FormControl(),
      grupo: new FormControl(),
      pago: new FormControl(),
      descuento: new FormControl(),
      sponsor: new FormControl(),
      checkIn: new FormControl(),
      workingAreas: new FormControl(''),
      setup: new FormGroup({
        source: new FormControl({value: '', disabled: true}),
        submittion: new FormControl({value: '', disabled: true})
      })

    })
  }

  getWorkingAreas(){
    this.workinService.getWorkinAreasList().subscribe(data => {
      this.allWorkingAreas = (this.peopleAreas.length > 0) ?this._filter(data,this.peopleAreas):data;
    })
  }

  add(event:MatChipInputEvent):void{
    console.log(event.value);
  }

  remove(area:any){
    this.peopleService.removePeopleServiceArea(this.peopleidParam,area);
  }

  selected(event: MatAutocompleteSelectedEvent):void{
    this.peopleAreas.push(event.option.value);
    this.peopleService.setPeopleServiceArea(this.peopleidParam,event.option.value)
    this.openSnackBar('Usuario actualizado', 'Cerrar');
  }


  openSnackBar(message:string, action:string){
    this._snackbar.open(message,action, {duration: 3000});
  }

  private _filter(array:any,value:any){
    if(Array.isArray(value)){
      let result: any[] = [];
      value.forEach( val => {
        array = (this._filter(array,val.name));
      })
      return array;
    }else{
      const filterValue = value.toLowerCase();
      const index = this.allWorkingAreas.indexOf()
      return array.filter((area:any) => area.name.toLowerCase() != filterValue);
    }
  }


}
