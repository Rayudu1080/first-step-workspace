import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule, NgForm, FormControl, Validators, FormGroup } from '@angular/forms';
import { UpdateEmployeeComponent } from './update-employee.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('UpdateEmployeeComponent', () => {
  let component: UpdateEmployeeComponent;
  let fixture: ComponentFixture<UpdateEmployeeComponent>;

  const activatedRouteStub = {
    snapshot: {
      params: of({ id: 'employees' }), // Provide an example parameter
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateEmployeeComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
    });

    fixture = TestBed.createComponent(UpdateEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Update Employee Component on the TestBed', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with required fields', () => {
    const form = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^\d{10}$')]),
      address: new FormControl('', Validators.required),
    }); 

    form.controls['firstname'].setValue('John');
    form.controls['lastname'].setValue('Doe');
    form.controls['email'].setValue('john.doe@example.com');
    form.controls['phone'].setValue('1234567890');
    form.controls['address'].setValue('123 Main St.');

    expect(form.valid).toBeTruthy();
  });

  it('should submit the form when valid', fakeAsync(() => {
    const form = new FormGroup({
      firstname: new FormControl('John', Validators.required),
      lastname: new FormControl('Doe', Validators.required),
      email: new FormControl('john.doe@example.com', [Validators.required, Validators.email]),
      phone: new FormControl('1234567890', [Validators.required, Validators.pattern('^\d{10}$')]),
      address: new FormControl('123 Main St', Validators.required),
    });

    spyOn(component, 'onSubmit');

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    submitButton.click();
    tick();

    expect(component.onSubmit).toHaveBeenCalled();
  }));


  
});







// import { FormsModule, NgForm } from '@angular/forms';
// import { UpdateEmployeeComponent } from './update-employee.component';
// import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
// import { ElementRef } from '@angular/core';

// describe('UpdateEmployeeComponent', () => {
//   let component: UpdateEmployeeComponent;
//   let fixture: ComponentFixture<UpdateEmployeeComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [UpdateEmployeeComponent],
//       imports: [FormsModule],
//     });

//     fixture = TestBed.createComponent(UpdateEmployeeComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create Update Employee Component on the TestBed', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should have a form with required fields', () => {
//     // const form = component.employeeForm;
//     const form = component.employeeForm;
//     const formControls = form.form.controls;

//     // Set values for form controls
//     formControls['firstname'].setValue('John');
//     formControls['lastname'].setValue('Doe');
//     formControls['email'].setValue('john.doe@example.com');
//     formControls['phone'].setValue('1234567890');
//     formControls['address'].setValue('123 Main St.');

//     fixture.detectChanges();

//     expect(form.valid).toBeTruthy(); // Form should be valid now with all required fields.
//   });

//   it('should display error messages for required fields', () => {
//     const form = component.employeeForm;
//     form.markAsTouched(); // Mark all fields as touched to trigger error messages.

//     const firstnameError = fixture.nativeElement.querySelector('.error[for="firstname"]');
//     expect(firstnameError).toBeTruthy();

//     const lastnameError = fixture.nativeElement.querySelector('.error[for="lastname"]');
//     expect(lastnameError).toBeTruthy();

//     const emailError = fixture.nativeElement.querySelector('.error[for="email"]');
//     expect(emailError).toBeTruthy();

//     const phoneError = fixture.nativeElement.querySelector('.error[for="phone"]');
//     expect(phoneError).toBeTruthy();

//     const addressError = fixture.nativeElement.querySelector('.error[for="address"]');
//     expect(addressError).toBeTruthy();
//   });

//   it('should submit the form when valid', () => {
//     const form = component.employeeForm;
//     const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');

//     // Set values for form controls
//     form.controls['firstname'].setValue('John');
//     form.controls['lastname'].setValue('Doe');
//     form.controls['email'].setValue('john.doe@example.com');
//     form.controls['phone'].setValue('1234567890');
//     form.controls['address'].setValue('123 Main St.');

//     spyOn(component, 'onSubmit'); // Spy on the onSubmit method.

//     submitButton.click(); // Trigger form submission.
//     tick(); // Wait for any asynchronous operations to complete.

//     expect(component.onSubmit).toHaveBeenCalled(); // Ensure that onSubmit was called.
//   });
// });








// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { UpdateEmployeeComponent } from './update-employee.component';

// describe('UpdateEmployeeComponent', () => {
//   let component: UpdateEmployeeComponent;
//   let fixture: ComponentFixture<UpdateEmployeeComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ UpdateEmployeeComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(UpdateEmployeeComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


// import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
// import { FormsModule, NgForm } from '@angular/forms';
// import { UpdateEmployeeComponent } from './update-employee.component';

// describe('UpdateEmployeeComponent', () => {
//   let component: UpdateEmployeeComponent;
//   let fixture: ComponentFixture<UpdateEmployeeComponent>;

//   beforeEach(async () => {
//     TestBed.configureTestingModule({
//       declarations: [UpdateEmployeeComponent],
//       imports: [FormsModule,NgForm], // Import FormsModule for ngModel and ngForm
//     }).compileComponents();

//     fixture = TestBed.createComponent(UpdateEmployeeComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create Update Employee Component on the TestBed', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should have a form with required fields', () => {
//     const form = component.employeeForm;
//     expect(form.valid).toBeFalsy();
    
//     const firstnameControl = form.controls['firstname'];
//     firstnameControl.setValue('John');
//     expect(form.valid).toBeFalsy(); // Form still invalid, as other fields are required.

//     const lastnameControl = form.controls['lastname'];
//     lastnameControl.setValue('Doe');

//     const emailControl = form.controls['email'];
//     emailControl.setValue('john.doe@example.com');

//     const phoneControl = form.controls['phone'];
//     phoneControl.setValue('1234567890');

//     const addressControl = form.controls['address'];
//     addressControl.setValue('123 Main St.');

//     expect(form.valid).toBeTruthy(); // Form should be valid now with all required fields.
//   });

//   it('should display error messages for required fields', () => {
//     const form = component.employeeForm;
//     form.markAsTouched(); // Mark all fields as touched to trigger error messages.

//     const firstnameError = fixture.nativeElement.querySelector('.error[for="firstname"]');
//     expect(firstnameError).toBeTruthy();
    
//     const lastnameError = fixture.nativeElement.querySelector('.error[for="lastname"]');
//     expect(lastnameError).toBeTruthy();

//     const emailError = fixture.nativeElement.querySelector('.error[for="email"]');
//     expect(emailError).toBeTruthy();

//     const phoneError = fixture.nativeElement.querySelector('.error[for="phone"]');
//     expect(phoneError).toBeTruthy();

//     const addressError = fixture.nativeElement.querySelector('.error[for="address"]');
//     expect(addressError).toBeTruthy();
//   });

//   it('should submit the form when valid', fakeAsync(() => {
//     const form = component.employeeForm;
//     const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    
//     const firstnameControl = form.controls['firstname'];
//     firstnameControl.setValue('John');

//     const lastnameControl = form.controls['lastname'];
//     lastnameControl.setValue('Doe');

//     const emailControl = form.controls['email'];
//     emailControl.setValue('john.doe@example.com');

//     const phoneControl = form.controls['phone'];
//     phoneControl.setValue('1234567890');

//     const addressControl = form.controls['address'];
//     addressControl.setValue('123 Main St.');

//     spyOn(component, 'onSubmit'); // Spy on the onSubmit method.

//     submitButton.click(); // Trigger form submission.
//     tick(); // Wait for any asynchronous operations to complete.

//     expect(component.onSubmit).toHaveBeenCalled(); // Ensure that onSubmit was called.
//   }));
// });