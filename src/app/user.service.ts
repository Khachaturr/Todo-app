import { FormBuilder, Validators, } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationService } from './Validation.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  isWrithenInputs: boolean = false
  private apiUrl = 'http://localhost:9000/users'

  constructor(private http: HttpClient, private formbuilder: FormBuilder) { }

  registrationFormBuilder() {
    return this.formbuilder.group({
      name: ['', Validators.required],
      surName: ['', Validators.required],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', [Validators.required, ValidationService.passwordValidator]],
      repeatPassword: ['', [Validators.required]]
    }, { validator: ValidationService.comparePasswordvalidator })
  }

  loginFormBuilder() {
    return this.formbuilder.group({
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', [Validators.required, ValidationService.passwordValidator]]
    })
  }

  sendUserDataToServer(body) {
    return this.http.post(`${this.apiUrl}`, body)
  }

  login(body) {
    return this.http.post(`${this.apiUrl}/information`, body)
  }

}
