import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPassword!: FormGroup;
  isDisabled:boolean = true;
  showThanks:boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.forgotPassword = new FormGroup({
      email: new FormControl("", [Validators.email,Validators.minLength(2)])
    })

    this.isDisabled = !this.forgotPassword.invalid;
  }

  onSubmit(){
    console.log(this.forgotPassword.value.email);
    if(this.forgotPassword.invalid){
      return
    }
    this.auth.resetPasswordInit(this.forgotPassword.value.email);
    this.showThanks = true;
  }

}
