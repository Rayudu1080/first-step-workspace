import { Component, ComponentRef, ElementRef, ViewChild } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  // templateUrl: './update-employee.component.html',
  template:`<div class="col-md-6 offset-md-3">
  <h2>Update Employee</h2>
  <form (ngSubmit)="onSubmit()" name="employeeForm" #employeeForm="ngForm">
      <div class="form-group">
          <label>FirstName</label>
          <input type="text" id="firstname" 
          [(ngModel)]="employee.firstname"
          name="firstname" class="form-control" required>
          <div *ngIf="employeeForm.controls['firstname'].invalid && (employeeForm.controls['firstname'].dirty || employeeForm.controls['firstname'].touched)">
              <div class="error" *ngIf="employeeForm.controls['firstname'].hasError('required')">Firstname is required.</div>
          </div>
      </div>
  
      <div class="form-group">
          <label>LastName</label>
          <input type="text" id="lastname" 
          [(ngModel)]="employee.lastname"
          name="lastname" class="form-control" required>
          <div *ngIf="employeeForm.controls['lastname'].invalid && (employeeForm.controls['lastname'].dirty || employeeForm.controls['lastname'].touched)">
              <div class="error" *ngIf="employeeForm.controls['lastname'].hasError('required')">Lastname is required.</div>
          </div>
      </div>
  
      <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" 
          [(ngModel)]="employee.email" 
          name="email" class="form-control" required email>
          <div *ngIf="employeeForm.controls['email'].invalid && (employeeForm.controls['email'].dirty || employeeForm.controls['email'].touched)">
            <div *ngIf="employeeForm.controls['email'].hasError('required')" class="error">Email is required.</div>
            <div *ngIf="employeeForm.controls['email'].hasError('email')" class="error">Invalid email format.</div>
          </div>
        </div>
    
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input type="tel" id="phone" [(ngModel)]="employee.phone" name="phone" class="form-control" required pattern="^\d{10}$">
          <div *ngIf="employeeForm.controls['phone'].invalid && (employeeForm.controls['phone'].dirty || employeeForm.controls['phone'].touched)">
            <div *ngIf="employeeForm.controls['phone'].hasError('required')" class="error">Phone number is required.</div>
            <div *ngIf="employeeForm.controls['phone'].hasError('pattern')" class="error">Invalid phone number format (e.g., 1234567890).</div>
          </div>
        </div>
    
        <div class="form-group">
          <label for="address">Address</label>
          <textarea id="address" [(ngModel)]="employee.address" name="address" class="form-control" required></textarea>
          <div *ngIf="employeeForm.controls['address'].invalid && (employeeForm.controls['address'].dirty || employeeForm.controls['address'].touched)">
              <div class="error" *ngIf="employeeForm.controls['address'].hasError('required')" >Address is required.</div>
          </div>
        </div>
    
        <button class="btn btn-success" type="submit" [disabled]="employeeForm.invalid">Submit</button>
  </form>
  </div>
  `,
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent {

  id: any ;
  employee: Employee = new Employee;

  // EmpForm: NgForm;

  @ViewChild('employeeForm',{static: true}) employeeForm?: NgForm;

  constructor(private empService: EmployeeServiceService,
    private route: ActivatedRoute,
    private router: Router){
  }

  ngOnInit(): void{
    this.id = this.route.snapshot.params['id'];
    // console.log(this.employeeForm?.nativeElement.)
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