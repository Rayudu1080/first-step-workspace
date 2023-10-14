import { Component } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeServiceService } from '../employee-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {

  employees: Employee[] | undefined;

  constructor(private empService: EmployeeServiceService,
    private router: Router){
  }

  ngOnInit(): void{
    this.getEmployees()
  }  

  private getEmployees() {  
    this.empService.getEmployeesList().subscribe(data =>{
      this.employees=data;
    })
  }

  updateEmployee(id: any){
    this.router.navigate(['update-employee',id])
  }

  removeEmployee(id: any){
    this.empService.deleteEmployee(id).subscribe(data=>{
      console.log(data);
      this.getEmployees();
    }, error=> console.log(error))
  }

}