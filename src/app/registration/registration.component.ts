import { UserService } from './../user.service';
import { ValidationService } from '../Validation.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
  subscribeLoginrequest: Subscription;
  loginrequest: any;





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

  constructor(private formbuilder: FormBuilder,
    private userService: UserService,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {

    this.userRegistrationFormGroup = this.formbuilder.group({
      name: ['', Validators.required],
      surName: ['', Validators.required],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', [Validators.required, ValidationService.passwordValidator]],
      repeatPassword: ['', [Validators.required]]
    }, { validator: ValidationService.comparePasswordvalidator });

    this.userLoginFormGroup = this.formbuilder.group({
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', [Validators.required, ValidationService.passwordValidator]]
    })
    this.userRegistrationFormGroup.valueChanges.subscribe((value) => this.registrationUserInform = value)
    this.userLoginFormGroup.valueChanges.subscribe((value) => this.loginUserInform = value)
    this.subscribeLoginrequest = this.userService.loginReques.subscribe((val) => this.loginrequest = val)


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
      // console.log(this.userRegistrationFormGroup)
    } else {
      console.log(this.userRegistrationFormGroup)
      if (this.registrationUserInform.password === this.registrationUserInform.repeatPassword) {
        delete this.registrationUserInform.repeatPassword
        // this.userService.saveUserInform(this.registrationUserInform)
        this.http.post('http://localhost:9000/users', this.registrationUserInform).subscribe((res) => {
          alert(res['id'])
          this.toggleRegistrationSection();
          this.userRegistrationFormGroup.reset();
        }, (error) => alert(error.error))

      }
    }

  }

  login() {
    this.isWriteInputofLogin = true;
    if (this.userLoginFormGroup.status === "INVALID") {

    } else {
      this.http.post('http://localhost:9000/users/information', this.loginUserInform).subscribe((res) => {

        this.loginrequest = res
        localStorage.setItem('UserInform', JSON.stringify(this.loginrequest))
        this.isWriteInputofLogin = false;
        this.userLoginFormGroup.reset();
        // console.log(this.loginrequest)
        setTimeout(() => {
          this.router.navigateByUrl('/todo')
        }, 1000)

      }, (error) => alert(error.error))
    }

  }

}


