import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceAreasService } from 'src/app/services/service-areas.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {

  registrationForm!: FormGroup;
  submitted:boolean = false;
  authError: string | undefined;
  serviceAreas: any;
  value:any = '';

  constructor(private auth: AuthService, private workinService: ServiceAreasService) { }

  ngOnInit(): void {
    this.workinService.getWorkinAreasList().subscribe(result =>{
      this.serviceAreas = result;
    });
    this.createForm();
    this.auth.eventAutError$.subscribe(error =>{
      this.authError = error;
    });
  }

  createForm(){
    this.registrationForm = new FormGroup({
      firstName: new FormControl('',Validators.required),
      lastName: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      phone: new FormControl('',Validators.required),
      password: new FormControl('',[Validators.required,Validators.minLength(6)]),
      confirmPassword: new FormControl('',Validators.required),
      serviceArea: new FormControl('')
    })
  }

  get f() {return this.registrationForm.controls};

  onSubmit(){
    this.submitted = true;
    if(this.registrationForm.invalid){
      return;
    }
    this.createUser(this.registrationForm.value);

  }

  createUser(user:any){
    this.auth.createUser(user)
  }
}
