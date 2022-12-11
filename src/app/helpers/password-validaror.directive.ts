import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const PasswordValidarorDirective:  ValidatorFn = (control: AbstractControl):  ValidationErrors | null => {

    let pass = control.value.newPassword
    let confirmPass = control.value.confirmPassword;
    return pass === confirmPass ? null : { notSame: true }
  }
