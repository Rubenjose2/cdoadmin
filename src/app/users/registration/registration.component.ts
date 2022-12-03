import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {

  registrationForm!: FormGroup;
  submitted:boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.registrationForm = new FormGroup({
      firstName: new FormControl('',Validators.required),
      lastName: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      phone: new FormControl('',Validators.required),
      password: new FormControl('',[Validators.required,Validators.minLength(6)]),
      confirmPassword: new FormControl('',Validators.required)
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
    this.auth.createUser(user);
  }
}
