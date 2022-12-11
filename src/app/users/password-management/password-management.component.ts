import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PasswordValidarorDirective } from 'src/app/helpers/password-validaror.directive';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-password-management',
  templateUrl: './password-management.component.html',
  styleUrls: ['./password-management.component.sass']
})
export class PasswordManagementComponent implements OnInit, OnDestroy {

  ngUnsubscribe: Subject<any> = new Subject<any>();
  mode!: any;
  action!: any;
  actionCodeChecked:boolean = false;
  passwordDontMatch:boolean = false;

  passwordForm!: FormGroup;

  constructor(
    private router: Router,
    private activedRouter: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.createForm();
    this.activedRouter.queryParamMap
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(params =>{
      if(!params) this.router.navigate([''])
      this.mode = params.get('mode');
      this.action = params.get('oobCode')

      switch(this.mode) {
        case 'resetPassword':
          this.authService.getAuth().verifyPasswordResetCode(this.action).then(
            email => {
              this.actionCodeChecked = true;
            }
          ).catch(e =>{
            this.router.navigate(['/login']);
          })
      }
    })
  }

  createForm(){
    this.passwordForm = new FormGroup({
      oldPassword: new FormControl(''),
      newPassword: new FormControl('',[Validators.required,Validators.minLength(8)]),
      confirmPassword: new FormControl('',Validators.required)
    },{ validators: PasswordValidarorDirective})
  }

  onSubmit(){

    if(this.passwordForm.invalid){
      console.log(this.passwordForm)
      if( this.passwordForm.errors?.['notSame']) this.passwordDontMatch = true;
      return
    }

    this.authService.getAuth().confirmPasswordReset(
      this.action,
      this.passwordForm.value.newPassword
    )
    .then(()=>
    {
      alert('New Password has been created')
      this.router.navigate(['/login']);
    })
    .catch(e => alert('An error occour, Please send you request again'))

  }

  get f() {return this.passwordForm.controls}

  checkPasswords: ValidatorFn = (control: AbstractControl):  ValidationErrors | null => {
    let pass = control.get('newPassword');
    let confirmPass = control.get('confirmPassword');
    return pass === confirmPass ? null : { notSame: true }
  }

  ngOnDestroy(): void {
      this.ngUnsubscribe.next('');
      this.ngUnsubscribe.complete();
  }

}
