import { Component } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeServiceService } from '../employee-service.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {
  employees: Employee[] | undefined;

  constructor(private empService: EmployeeServiceService){
  }

  ngOnInit(): void{
    this.getEmployees()
}  
private getEmployees() {
    this.empService.getEmployeesList().subscribe(data =>{
      this.employees=data;
    })
  }

}