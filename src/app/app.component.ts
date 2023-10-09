import { Component } from '@angular/core';


interface Employee{
  id: number,
  empName: string,
  empId: string,
  empPhone: number,
  empAddress: string,
  empEmail: string
}

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  template: `

    <nav class="navbar navbar-expand-sm bg-primary navbar-dark">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a routerLink="employees" routerLinkActive="Active" class="nav-link"> Employee List</a>
        </li>
        <li class="navbar-item">
          <a routerLink="create-employee" routerLinkActive="Active" class="nav-link"> Add Employee</a>
        </li>
      </ul>
    </nav>
    <div class="container">
      <!-- <app-employee-list class="text-center"></app-employee-list>     -->
      <router-outlet></router-outlet>
    </div>

    <footer class="footer">
      <div class="comtainer">
          <span>All rights reserved 2023 @Naady</span>
      </div>
    </footer>
    <!-- <ul>
      <li *ngFor="let emp of employees">
          {{emp.empName}}
      </li>
    </ul> -->
      <!-- <button (click)="handleClick()">
        Change Name 
      </button>

     <input type="text"
      [ngModel]="name"
      (ngModelChange)="handleInput($event)"> -->

      <!-- <input type="text"
      [(ngModel)]="name">
    </div> -->
    <!-- <div> {{name}} </div> --> 
  `
})
export class AppComponent {
  
//   name = 'first-step-workspace';

//   // handleInput(value : string){
//   //     this.name = value;
//   // }

//   handleClick(){
//     this.name = "My Name";
// }

}
