import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { TodosComponent } from './todos/todos.component';
import { ValidationService } from './Validation.service';
import { ControlMessageComponent } from './control-message/control-message.component';
import { HttpClientModule } from '@angular/common/http'
import {  RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './login.guard';
 
const routes:Routes=[
  {path:'todo', canActivate:[LoginGuard], component:TodosComponent},
  {path:'login', component:RegistrationComponent},
  {path:"", redirectTo:"login", pathMatch:"full"}
]


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
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ValidationService,LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
