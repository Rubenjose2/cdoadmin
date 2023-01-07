import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass']
})
export class WelcomeComponent implements OnInit {

  welcomeForm!: FormGroup;
  selectedValueIm!: string;

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

  constructor() { }

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
        iWant: new FormControl('',Validators.required)
      })
    })
  }

}
