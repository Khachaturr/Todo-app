import { UserService } from './../user.service';
import { ValidationService } from '../Validation.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, } from '@angular/forms';
import { Router } from '@angular/router';


export interface registrationFormObj {
  email: string,
  name: string,
  surName: string,
  password: any,
  repeatPassword: any
}

interface loginUserObj {
  email: '',
  password: ''
}



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  userRegistrationFormGroup: FormGroup;
  userLoginFormGroup: FormGroup;
  _emailErrorForLogin: string;
  _passwordErrorForLogin: string;
  isRegistrationSectionShow: boolean = false;
  isWriteInputofLogin: boolean = false
  registrationUserInform: registrationFormObj = {
    email: '',
    name: '',
    surName: '',
    password: '',
    repeatPassword: ''
  };
  loginUserInform: loginUserObj;


  get emailErrorForLogin() {
    for (let propartyName in this.userLoginFormGroup.get('email').errors) {
      if (this.userLoginFormGroup.get('email').errors[propartyName]) {
        return ValidationService.getValidatorErrorMessage(propartyName)
      }
      return null
    }

  }
  get passwordErrorForLogin() {
    for (let propartyName in this.userLoginFormGroup.get('password').errors) {
      if (this.userLoginFormGroup.get('password').errors[propartyName]) {
        return ValidationService.getValidatorErrorMessage(propartyName)
      }
      return null
    }
  }

  constructor(private userService: UserService, private router: Router,) {

  }

  ngOnInit(): void {
    this.userRegistrationFormGroup = this.userService.registrationFormBuilder();
    this.userLoginFormGroup = this.userService.loginFormBuilder()
    this.userRegistrationFormGroup.valueChanges.subscribe((value) => this.registrationUserInform = value)
    this.userLoginFormGroup.valueChanges.subscribe((value) => this.loginUserInform = value)
  }


  toggleRegistrationSection() {
    this.isRegistrationSectionShow = !this.isRegistrationSectionShow
  }

  saveUserData() {
    for (let promp in this.registrationUserInform) {
      if (this.registrationUserInform[promp] === '' || this.registrationUserInform[promp] === ' ') {
        this.userService.isWrithenInputs = true;
      }
    }

    if (this.userRegistrationFormGroup.status === "INVALID") {
      // do nothing
    } else {
      if (this.registrationUserInform.password === this.registrationUserInform.repeatPassword) {
        delete this.registrationUserInform.repeatPassword

        this.userService.sendUserDataToServer(this.registrationUserInform).subscribe((res) => {
          this.toggleRegistrationSection();
          this.userRegistrationFormGroup.reset()
          alert(res['valid'])
        }, (error) => alert(error.error))
      }
    }

  }

  login() {
    this.isWriteInputofLogin = true;
    if (this.userLoginFormGroup.status === "INVALID") {

    } else {
      this.userService.login(this.loginUserInform).subscribe((res) => {
        localStorage.setItem("UserInform", JSON.stringify(res))
        this.isWriteInputofLogin = false;

        setTimeout(() => {
          this.router.navigateByUrl('/todo')
          this.userLoginFormGroup.reset();
        }, 1000)

      }, (error) => alert(error.error))
    }

  }

}
