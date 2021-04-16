import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TodoService {



  constructor(private http:HttpClient) { }
  sendTaskServer(body){
    this.http.post('http://localhost:9000/todo/tasks', body).subscribe((res)=>{
      // console.log(res)
    })
  }
  

}