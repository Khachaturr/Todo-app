import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  taskObservable = new Subject();
  tasksOvserable = new Subject();
  remuveTaskObservable = new Subject();
  editTaskOvservable = new Subject();
  taskDoneOvservable= new Subject();



  constructor(private http: HttpClient) { }
  sendTaskServer(body) {
    this.http.post('http://localhost:9000/todo/tasks', body).subscribe((res) => {
      // console.log(res['valid'])
      if (res['valid'] === 'true') {
        // console.log("gh")
        this.taskObservable.next(body)
      }
    })
  }
  getTasksIsServer() {
    this.http.get("http://localhost:9000/todo/all/tasks").subscribe((res) => {
      this.tasksOvserable.next(res)
    })


  }
  delateTask(id) {
    this.http.delete(`http://localhost:9000/todo/task/delete/${id}`).subscribe((res) => {

      if (res['valid'] === 'true') {
        // console.log(res['valid'])
        this.remuveTaskObservable.next(id)

      }
    }, (error) => { alert(error.error) })

  }
  editTask(body) {
    this.http.put('http://localhost:9000/todo/task/edit', body).subscribe((res) => {
      // console.log(res)
      if (res['valid'] === 'true') {
        this.editTaskOvservable.next(body)
      }
    }, (error) => alert(error.error))
  }
  taskDone(body) {
     this.http.patch('http://localhost:9000/todo/edit/task/done',body).subscribe((res)=>{
       
       if(res['valid']==='true'){
        console.log(res)
         this.taskDoneOvservable.next(body)
       }
     })
  }


}