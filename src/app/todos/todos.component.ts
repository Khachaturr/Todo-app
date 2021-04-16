import { TodoService } from './../todo.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  taskFormGroup:FormGroup;
  tasksArr = []
  

  constructor(private todoService:TodoService,
              private formbuilder:FormBuilder,
              private http:HttpClient) { }

  ngOnInit(): void {
    this.taskFormGroup=this.formbuilder.group({
      task:['', Validators.required]
    })
    this.taskFormGroup.valueChanges.subscribe((res)=>{console.log(res)})
    this.http.get("http://localhost:9000/todo/all/tasks").subscribe((res)=>{
      let arr=JSON.parse(res['task'])
      
      console.log(arr)
      this.tasksArr=[...arr]
      console.log(this.tasksArr)
    })

  }
  addTask(){
    let id=Math.random();
    let body={task:this.taskFormGroup.value.task,
              id:id};
    this.todoService.sendTaskServer(body);
    this.taskFormGroup.reset()
    console.log(body)
    
  }

}
