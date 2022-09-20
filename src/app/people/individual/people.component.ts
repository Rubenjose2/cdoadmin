import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PeopleService } from 'src/app/services/people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.sass']
})
export class PeopleComponent implements OnInit {

  private peopleidParam:string = '';
  peopleForm!:FormGroup;

  constructor(
    private peopleService: PeopleService,
    private route : ActivatedRoute
    ) { }

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
      });   

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
      setup: new FormGroup({
        source: new FormControl({value: '', disabled: true}),
        submittion: new FormControl({value: '', disabled: true})
      })

    })
  }


}
