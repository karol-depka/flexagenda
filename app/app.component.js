"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Task = (function () {
    function Task() {
    }
    return Task;
}());
exports.Task = Task;
var TASKS = [
    { id: 1, start: "08:30", duration: 20, title: 'Eating' },
    { id: 2, start: "09:20", duration: 30, title: 'Cleaning' },
    { id: 3, start: "10:00", duration: 200, title: 'Working' },
];
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Flexible Agenda App';
        this.tasks = TASKS;
    }
    AppComponent.prototype.onSelect = function (task) {
        this.selectedTask = task;
    };
    AppComponent.prototype.addTask = function (start, duration, title) {
        this.tasks.push({
            id: this.tasks.length + 1,
            start: start,
            duration: duration,
            title: title });
    };
    AppComponent.prototype.DeleteTask = function (task) {
        this.tasks.splice(this.tasks.indexOf(this.selectedTask), 1);
        this.selectedTask = null;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'flexagenda',
            template: "\n  <h1>{{title}}</h1>\n  <h2>My Tasks</h2>\n<ul class=\"tasks\">\n<li>\n<span class=\"badge\">ID</span>\n<span class=\"start\">start</span>\n<span class=\"duration\">duration</span>\n<span class=\"title\">title</span>\n</li>\n    <!-- each task goes here -->\n    <li class=\"animation\" *ngFor=\"let task of tasks\"\n[class.selected]=\"task === selectedTask\"\n     (click)=\"onSelect(task)\">\n<span class=\"badge\">{{task.id}}</span>\n<span class=\"start\">{{task.start}}</span>\n<span class=\"duration\">{{task.duration}}</span>\n<span class=\"title\">{{task.title}}</span>\n\n  </li>\n</ul>\n\n  <div *ngIf=\"selectedTask\">\n  <h2>ID:{{selectedTask.id}} task details!</h2>\n  <div><label>id: </label>{{selectedTask.id}}\n  <label>Start: </label>\n    <input [(ngModel)]=\"selectedTask.start\" placeholder=\"start\"/>\n  <label>Duration: </label>\n    <input [(ngModel)]=\"selectedTask.duration\" placeholder=\"duration\"/>\n  <label>Title: </label>\n    <input [(ngModel)]=\"selectedTask.title\" placeholder=\"title\"/>\n    <button (click)=\"DeleteTask(task)\">Delete</button>\n  </div>\n</div>\n<div class=\"container\">\n    <h3>Add New Task:</h3>\n\n        <input #newStart placeholder=\"start\" />\n        <input #newDuration placeholder=\"duration\" />\n        <input #newTitle placeholder=\"title\" />\n        <button (click)=\"addTask(newStart.value,newDuration.value,newTitle.value)\">Add Task</button>\n\n</div>\n\n\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map