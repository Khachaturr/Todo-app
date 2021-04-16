import { TodoService } from './../todo.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit, OnDestroy {
  taskFormGroup: FormGroup;
  taskSubscription: Subscription;
  tasksSubscription: Subscription;
  remuveTaskSubscription: Subscription;
  editTaskSubscription: Subscription;
  taskDoneSubscription: Subscription;
  taskId: number;
  tasksArr = []



  constructor(private todoService: TodoService,
    private formbuilder: FormBuilder,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.taskFormGroup = this.formbuilder.group({
      task: ['', Validators.required]
    })
    this.todoService.getTasksIsServer();
    this.tasksSubscription = this.todoService.tasksOvserable.subscribe((res) => {
      // console.log(res)
      let arr = JSON.parse(res['task'])
      arr.sort((a,b)=>{return a.checked-b.checked})
      
      this.tasksArr = [...arr]
      console.log(this.tasksArr)

    })
    this.remuveTaskSubscription = this.todoService.remuveTaskObservable.subscribe((res) => {
      let index = this.tasksArr.findIndex((task) => task.id == res)
      this.tasksArr.splice(index, 1)
    })

    this.taskSubscription = this.todoService.taskObservable.subscribe((res) => { 
      this.tasksArr.push(res)
      this.tasksArr.sort((a,b)=>{return a.checked-b.checked})})
    this.editTaskSubscription = this.todoService.editTaskOvservable.subscribe((res) => {
      let index = this.tasksArr.findIndex((task) => task.id == res['id'])
      this.tasksArr.splice(index, 1, res)
      this.taskFormGroup.reset()
      // console.log(index)
    })
    this.taskDoneSubscription = this.todoService.taskDoneOvservable.subscribe((res) => {
      let task = this.tasksArr.find((task) => task.id === res["id"])
      task.checked = res["checked"]
      this.tasksArr.sort((a,b)=>{return a.checked-b.checked})
      console.log(task)
    })

  }
  ngOnDestroy() {
    this.taskSubscription.unsubscribe;
    this.tasksSubscription.unsubscribe;
    this.editTaskSubscription.unsubscribe;
  }
  addTask() {

    if (this.taskId) {
      // console.log(this.taskFormGroup.value.task)
     
      let body = {
        task: this.taskFormGroup.value.task,
        id: this.taskId,
        checked: false
      }
      this.todoService.editTask(body)

    } else {
    
      let id = Math.random();
      let body = {
        task: this.taskFormGroup.value.task,
        id: id,
        checked: false
      };

      this.todoService.sendTaskServer(body);
      this.taskFormGroup.reset()
      // console.log(body)
    }
  }

  remuve(id) {
    this.todoService.delateTask(id)
  }

  editTask(task) {
    this.taskFormGroup.controls.task.setValue(task.task)
    this.taskId = task.id
  }

  taskDone(event, id) {

    console.log(event.target.checked, id)
    this.todoService.taskDone({
      checked: event.target.checked,
      id: id
    })

  }

}
