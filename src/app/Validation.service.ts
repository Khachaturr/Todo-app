import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';



@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }
  static getValidatorErrorMessage(validatorName: string) {
    let config = {
      required: 'Required',
      invalidEmailAddress: 'Invalid email address',
      inavalidPassword: 'Invalid password',
      comparePassword: "passwords d'not match",

    }
    return config[validatorName]
  }

  static emailValidator(control) {
    if ((/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(control.value) === true) {
      return null
    } else {
      return { invalidEmailAddress: true }
    }
  }


  static passwordValidator(control) {
    // control.log(control)

    if ((/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).test(control.value) === true) {

      return true
    } else {

      return { inavalidPassword: true }
    }
  }

  static comparePasswordvalidator(control: AbstractControl): any {
    const pass = control.get('password').value
    const repeatPasword = control.get('repeatPassword').value
    // console.log(repeatPasword)
    // console.log(pass)
    if (pass === repeatPasword) {

      return null
    } else {
      return { comparePassword: true }
    }
  }

}
