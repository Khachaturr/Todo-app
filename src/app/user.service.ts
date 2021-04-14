import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isWrithenInputs: boolean = false
  loginReques:string=''

  constructor( private http:HttpClient) { }

  saveUserInform(body){
    this.http.post('http://localhost:9000/users', body).subscribe((res)=>{
      console.log(res)
    }, (error)=>console.log(error))
  }

  login(body){
    this.http.post('http://localhost:9000/users/information', body).subscribe((res)=>{
      
      console.log(this.loginReques=res['valid'])

      
    }, (error)=>console.log(this.loginReques=error.error))
  }
 
}
