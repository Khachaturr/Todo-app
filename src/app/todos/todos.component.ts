import { TodoService } from './../todo.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidationService } from '../Validation.service';



@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  name: string;
  sureName: string;
  _errorMessage: string
  taskId: number = null;
  taskFormGroup: FormGroup;
  confirmDeleteSection: boolean = false;
  isdeclaretionTaskInput: boolean = false;
  classList: any;
  isshownDoneTasks: boolean;
  tasksArr = []
  hideChecked = false
  editTaskBody: {};
  addTaskBody: {};



  constructor(private todoService: TodoService,) {

  }

  ngOnInit(): void {
    this.getUserDataFromLocalStorage()
    this.taskFormGroup = this.todoService.taskFormBuilder()
    this.getTasksFromService()
  }

  getUserDataFromLocalStorage() {
    let userInformStr = localStorage.getItem('UserInform');
    let userInformObj = JSON.parse(userInformStr)
    this.name = userInformObj.name;
    this.sureName = userInformObj.sureName
  }


  getTasksFromService() {
    this.todoService.getTasksFromServer().subscribe((res) => {
      let arr = JSON.parse(res['task'])
      arr.sort((a, b) => { return a.checked - b.checked })
      this.tasksArr = [...arr]
    }, (error) => alert(error.error))
  }

  get errorMessage() {
    for (let param in this.taskFormGroup.get('task').errors) {
      return ValidationService.getValidatorErrorMessage(param)
    }
  }

  creatEditTaskBody() {
    this.editTaskBody = {
      task: this.taskFormGroup.value.task,
      id: this.taskId,
      checked: false
    }
  }

  creatAddTaskBody() {
    let id = Math.random();
    this.addTaskBody = {
      task: this.taskFormGroup.value.task,
      id: id,
      checked: false
    }
  }

  addTask() {
    this.isdeclaretionTaskInput = true
    if (this.taskId !== null && this.taskFormGroup.status !== "INVALID") {
      this.creatEditTaskBody();

      this.todoService.editTask(this.editTaskBody).subscribe((res) => {
        let index = this.tasksArr.findIndex((task) => task.id == this.taskId)
        this.tasksArr.splice(index, 1, this.editTaskBody)
        this.taskFormGroup.reset()
        this.taskId = null;
      })

      this.isdeclaretionTaskInput = false
    } 
    else if (this.taskFormGroup.status !== "INVALID") {
      this.creatAddTaskBody()
      
      this.todoService.sendTaskServer(this.addTaskBody).subscribe((res) => {
        this.tasksArr.push(this.addTaskBody)
        this.tasksArr.sort((a, b) => { return a.checked - b.checked })
      }, (error) => alert(error));

      this.taskFormGroup.reset()
      this.isdeclaretionTaskInput = false
    }
  }

  toggleConfirmdeleteSection() {
    this.confirmDeleteSection = !this.confirmDeleteSection
    if (this.confirmDeleteSection === false) {
      this.classList.remove('remuvIcone')
    }

  }

  remuve(event, id) {
    this.classList = event.target.classList
    event.target.classList.add('remuvIcone')
    this.toggleConfirmdeleteSection()
    this.taskId = id
  }

  confirmRemuve() {
    this.todoService.remuveTask(this.taskId).subscribe((res) => {
      let index = this.tasksArr.findIndex((task) => task.id == this.taskId)
      this.tasksArr.splice(index, 1);
      this.taskId = null;
    }, (error) => alert(error.error))
    this.toggleConfirmdeleteSection()
  }

  editTask(task) {
    this.taskFormGroup.controls.task.setValue(task.task)
    this.taskId = task.id
  }

  taskDone(event, id) {
    this.todoService.taskDone({
      checked: event.target.checked,
      id: id
    }).subscribe((res) => {
      let task = this.tasksArr.find((task) => task.id === id)
      task.checked = event.target.checked
      this.tasksArr.sort((a, b) => { return a.checked - b.checked })
    }, (error) => alert(error.error))
  }

  logout() {
    this.todoService.logout()
  }

  toggle() {
    this.hideChecked = !this.hideChecked
  }

}
