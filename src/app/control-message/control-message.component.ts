import { UserService } from './../user.service';
import { Component, Input, OnInit } from '@angular/core';
import { ValidationService } from '../Validation.service';

@Component({
  selector: 'app-control-message',
  templateUrl: './control-message.component.html',
  styleUrls: ['./control-message.component.css']
})
export class ControlMessageComponent implements OnInit {
  @Input() control: any;


  _errorMessage: string;

  constructor(private userService: UserService) { }

  get errorMessage() {
    if (this.userService.isWrithenInputs === true) {
      for (let propertyName in this.control.errors) {
        if (this.control.errors[propertyName]) {
          return ValidationService.getValidatorErrorMessage(propertyName)
        }

      }
    } else {
      for (let propertyName in this.control.errors) {
        if (this.control.errors[propertyName] && this.control.touched) {
          return ValidationService.getValidatorErrorMessage(propertyName)
        }
      }

    }
    return null
  }





  ngOnInit(): void {

  }

}
