import { UserService } from './../user.service';
import { ValidationService } from '../Validation.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  userRegistrationFormGroup: FormGroup;
  userLoginFormGroup: FormGroup;
  _emailErrorForLogin: string;
  _passwordErrorForLogin:string;
  isRegistrationSectionShow:boolean=false;


  get emailErrorForLogin() {
    for (let propartyName in this.userLoginFormGroup.get('emailLogin').errors) {
      if (this.userLoginFormGroup.get('emailLogin').errors[propartyName] && this.userLoginFormGroup.get('emailLogin').touched) {
        return ValidationService.getValidatorErrorMessage(propartyName)
      }
      return null
    }
  }
  get passwordErrorForLogin() {
    for (let propartyName in this.userLoginFormGroup.get('passwordLogin').errors) {
      if (this.userLoginFormGroup.get('passwordLogin').errors[propartyName] && this.userLoginFormGroup.get('passwordLogin').touched) {
        return ValidationService.getValidatorErrorMessage(propartyName)
      }
      return null
    }
  }

  constructor(private formbuilder: FormBuilder,
              private userService:UserService ) { }

  ngOnInit(): void {
    
    this.userRegistrationFormGroup = this.formbuilder.group({
      name: ['', Validators.required],
      surName: ['', Validators.required],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', [Validators.required, ValidationService.passwordValidator]],
      repeatPassword: ['', [Validators.required]]
    }, { validator: ValidationService.comparePasswordvalidator });

    this.userLoginFormGroup = this.formbuilder.group({
      emailLogin: ['', [Validators.required, ValidationService.emailValidator]],
      passwordLogin: ['', [Validators.required, ValidationService.passwordValidator]]
    })

  }

  toggleRegistrationSection(){
   this.isRegistrationSectionShow=!this.isRegistrationSectionShow
    
  }

  save() {
    console.log(this.userLoginFormGroup.get('email'))
    console.log("j")

  }

}
