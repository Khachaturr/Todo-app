
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsersService } from '../users.service';


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


  get emailErrorForLogin() {
    for (let propartyName in this.userLoginFormGroup.get('emailLogin').errors) {
      if (this.userLoginFormGroup.get('emailLogin').errors[propartyName] && this.userLoginFormGroup.get('emailLogin').touched) {
        return UsersService.getValidatorErrorMessage(propartyName)
      }
      return null
    }
  }
  get passwordErrorForLogin() {
    for (let propartyName in this.userLoginFormGroup.get('passwordLogin').errors) {
      if (this.userLoginFormGroup.get('passwordLogin').errors[propartyName] && this.userLoginFormGroup.get('passwordLogin').touched) {
        return UsersService.getValidatorErrorMessage(propartyName)
      }
      return null
    }
  }

  constructor(private formbuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.userRegistrationFormGroup = this.formbuilder.group({
      name: ['', Validators.required],
      surName: ['', Validators.required],
      email: ['', [Validators.required, UsersService.emailValidator]],
      password: ['', [Validators.required, UsersService.passwordValidator]],
      repeatPassword: ['', [Validators.required]]
    }, { validator: UsersService.comparePasswordvalidator });

    this.userLoginFormGroup = this.formbuilder.group({
      emailLogin: ['', [Validators.required, UsersService.emailValidator]],
      passwordLogin: ['', [Validators.required, UsersService.passwordValidator]]
    })

  }


  save() {
    console.log(this.userLoginFormGroup.get('email'))
    console.log("j")

  }

}
