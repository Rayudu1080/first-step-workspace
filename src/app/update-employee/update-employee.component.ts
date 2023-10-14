import { Component } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent {

  id: any ;
  employee: Employee = new Employee
  constructor(private empService: EmployeeServiceService,
    private route: ActivatedRoute,
    private router: Router){

  }


  ngOnInit(): void{
    this.id = this.route.snapshot.params['id'];
    this.empService.getEmplolyeeById(this.id).subscribe(data=>{
        this.employee = data;
    }, error => console.log(error)
    );
  }

  onSubmit(){
    console.log(this.employee) ;
    this.empService.updateEmployee(this.id, this.employee).subscribe(data=>{
      console.log(data);
      this.router.navigate(['/employees']);
    }, error=> console.log(error));

  }

}
