import { Component } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeServiceService } from '../employee-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent {

  employee: Employee = new Employee();

  constructor(private employeeService: EmployeeServiceService,
    private router: Router){

  }

  onSubmit(){
    console.log(this.employee) ;
    this.saveEmployee();

  }

  saveEmployee(){
    this.employeeService.createEmployee(this.employee).subscribe(
      data=>{
      console.log(data);
      this.goToEmployees();
    }, error => console.log(error));
  }

  goToEmployees(){
    this.router.navigate(['/employees']);
  }
}
