import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { TodosComponent } from './todos/todos.component';
import { UsersService } from './users.service';
import { ControlMessageComponent } from './control-message/control-message.component';



@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    TodosComponent,
    ControlMessageComponent,
    
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
