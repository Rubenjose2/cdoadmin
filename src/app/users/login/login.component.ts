import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  logInForm!: FormGroup;
  submitted = false;
  hide = true;
  authError!:string;

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.createForm();
    this.auth.eventAutError$.subscribe(error =>{
      this.authError = error;
    });
  }

  createForm() {
    this.logInForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',Validators.required)
    })
  }

  get f() {return this.logInForm.controls};

  onSubmit(){
    this.submitted = true;
    if(this.logInForm.invalid){
      console.log('invalid');
      return;
    }
    this.logIn(this.logInForm.value)
  }

  logIn(frm:any){
    this.auth.login(frm.email,frm.password);
  }

}
