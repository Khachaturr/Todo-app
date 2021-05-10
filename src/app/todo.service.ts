import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
 
  constructor(private http: HttpClient, private router:Router, private formbuilder: FormBuilder) {
  }

  taskFormBuilder(){
    return this.formbuilder.group({
      task: ['', Validators.required]
    })
  }

  sendTaskServer(body) {
   return this.http.post('http://localhost:9000/todo/tasks', body)
  }

  

  getTasksFromServer() {
  return this.http.get("http://localhost:9000/todo/all/tasks")
  }

  
  remuveTask(id) {
   return this.http.delete(`http://localhost:9000/todo/task/delete/${id}`)
  }


  editTask(body) {
   return  this.http.put('http://localhost:9000/todo/task/edit', body)
  }


  taskDone(body) {
    return this.http.patch('http://localhost:9000/todo/edit/task/done',body)
  }


  logout(){
    setTimeout(()=>{
      this.router.navigateByUrl("/login")
    },1000)
    localStorage.removeItem("UserInform")

  }
  


}