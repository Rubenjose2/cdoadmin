import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PeopleService } from 'src/app/services/people.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete'
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass']
})
export class WelcomeComponent implements OnInit {

  welcomeForm!: FormGroup;
  selectedValueIm!: string;
  showThanks:boolean = false;

  @ViewChild("placesRef") placesRef! : GooglePlaceDirective;

  options = {
    types: ['places'],
    componentRestrictions: { country: 'US' }
  }

  iAmOptions = [
    "Visita por primera vez | 1st Time guest",
    "Visita por segunda vez | 2nd Time guest",
    "Visita fuera del estado | Out of town guest"
  ]

  iWantOptions = [
    "Ser un seguidor de Jesus | Being a follower of Jesus",
    "Unirme a un grupo de conexion | Join a connect group",
    "Servir en un area una iglesia | Join a team in church",
    "Bautizarme | Getting Baptized"
  ]

  constructor(private peopleService: PeopleService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.welcomeForm = new FormGroup({
      basicInfo: new FormGroup({
        name: new FormControl('',Validators.required),
        last_name : new FormControl('',Validators.required),
        email: new FormControl('',[Validators.required,Validators.email]),
        phone: new FormControl('',[Validators.required]),
      }),
      addressInfo: new FormGroup({
        address: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl('',Validators.required),
        zipCode: new FormControl('',[Validators.required, Validators.minLength(5)]),
      }),
      extraInfo: new FormGroup({
        iAm: new FormControl('',Validators.required),
        iWant: new FormControl('',Validators.required),
        language: new FormControl('')
      })
    })
  }

  public handleAddressChange(address:Address){
    //console.log(address);
    this.welcomeForm.patchValue({
      addressInfo: {
        address: address.address_components[0].long_name + ' ' + address.address_components[1].long_name,
        city: address.address_components[2].long_name,
        state: address.address_components[4].short_name,
        zipCode: address.address_components[6].long_name
      }
    })
  }



  onSubmit(){
    if(!this.welcomeForm.valid){
      return
    }
    this.peopleService.setNewPeopleWelcome(this.welcomeForm.value).then(
      () => this.showThanks = true
    );
  }

}
