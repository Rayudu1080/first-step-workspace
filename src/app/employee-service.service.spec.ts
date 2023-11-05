import { TestBed } from '@angular/core/testing';
import { EmployeeServiceService } from './employee-service.service';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { EMPLOYEES } from './mock-data/emps-mock';
import { Employee } from './employee';
import { HttpStatusCode } from '@angular/common/http';

describe('EmployeeServiceService', () => {
  let service: EmployeeServiceService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(EmployeeServiceService);
    testingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    testingController.verify();
  });



  /**
   * This is the test case to fetch all the employees get api.
   */

  describe('getEmployeesList', () => {
    it('should return a list of employees', () => {
      service.getEmployeesList().subscribe((emps: Employee[]) => {
        expect(emps).toBeTruthy();
        expect(emps.length).toBe(3);
        expect(emps[0].firstname).toBe('Rafeal');
      });

      const mockReq = testingController.expectOne('http://localhost:8080/api/v1/employees');
      mockReq.flush(Object.values(EMPLOYEES));

      expect(mockReq.request.method).toEqual('GET');
    });

    it('should handle errors', () => {
      service.getEmployeesList().subscribe({
        error: (error) => {
          expect(error).toBeTruthy();
        },
      });

      const mockReq = testingController.expectOne('http://localhost:8080/api/v1/employees');
      expect(mockReq.request.method).toEqual('GET');
      mockReq.error(new ErrorEvent('Network error'));
    });
  });

  /**
   * 
   * This is the Test suite for Employee Creation
   */
  describe('createEmployee', () => {
    it('should create a new employee', () => {
      const newEmployee: Employee = { id: 4, firstname: 'John', lastname: 'Doe', email: 'John@gmail.com', phone: "977875759", address: "5654 hallow dr, Tx 65644"  };
  
      service.createEmployee(newEmployee).subscribe((response: any) => {
        expect(response).toBeTruthy();
        expect(response).toEqual(newEmployee);
      });
  
      const mockReq = testingController.expectOne('http://localhost:8080/api/v1/employees');
      expect(mockReq.request.method).toEqual('POST');
      expect(mockReq.request.body).toEqual(newEmployee);
  
      mockReq.flush(newEmployee);
    });
  
    it('should handle errors', () => {
      const newEmployee: Employee = { id: 4, firstname: 'John', lastname: 'Doe', email: 'John@gmail.com' , phone: "977875759", address: "5654 hallow dr, Tx 65644"  };
  
      service.createEmployee(newEmployee).subscribe({
        error: (error) => {
          expect(error).toBeTruthy();
        },
      });
  
      const mockReq = testingController.expectOne('http://localhost:8080/api/v1/employees');
      expect(mockReq.request.method).toEqual('POST');
      expect(mockReq.request.body).toEqual(newEmployee);

      mockReq.error(new ErrorEvent('Internal server error '+ HttpStatusCode.InternalServerError));
    });
  });


  /**
   * This is the test case to get one single employee
   * based on ID
   */

  describe('getEmplolyeeById', () => {
    it('should return an employee by ID', () => {
      const empId = 1;
      service.getEmplolyeeById(empId).subscribe((employee: Employee) => {
        expect(employee).toBeTruthy();
        expect(employee.firstname).toBe('Rafeal');
      });

      const mockReq = testingController.expectOne(`http://localhost:8080/api/v1/employees/${empId}`);
      expect(mockReq.request.method).toEqual('GET');
      mockReq.flush(EMPLOYEES[empId]);
    });

    it('should handle errors', () => {
      const empId = 1;
      service.getEmplolyeeById(empId).subscribe({
        error: (error) => {
          expect(error).toBeTruthy();
        },
      });

      const mockReq = testingController.expectOne(`http://localhost:8080/api/v1/employees/${empId}`);
      expect(mockReq.request.method).toEqual('GET');
      mockReq.error(new ErrorEvent('Not found'));
    });
  });

  /**
   * This is the test case to Update an employe by
   * employee ID
   */
  describe('updateEmployee', () => {
    it('should update an employee by ID', () => {
      const empId = 1;
      const changes: Employee = { id: empId ,
                                  firstname: 'TestFirstname',
                                  lastname: 'TestLastname',
                                  email: 'Testmail@gmail.com',
                                  phone: "977875759", 
                                  address: "5654 hallow dr, Tx 65644" };

      service.updateEmployee(empId, changes).subscribe((employee: Employee) => {
        expect(employee).toBeTruthy();
        expect(employee.firstname).toBe('TestFirstname');
        expect(employee.lastname).toBe('TestLastname');
        expect(employee.email).toBe('Testmail@gmail.com');
      });

      const mockReq = testingController.expectOne(`http://localhost:8080/api/v1/employees/${empId}`);
      expect(mockReq.request.method).toEqual('PUT');
      expect(mockReq.request.body.lastname).toEqual(changes.lastname);

      const modifiedEmp = { ...EMPLOYEES[empId], ...changes };
      mockReq.flush(modifiedEmp);
    });

    it('should handle errors', () => {
      const empId = 1;
      const changes: Employee = { id: empId ,
        firstname: 'TestFirstname',
        lastname: 'TestLastname',
        email: 'Testmail@gmail.com', 
        phone: "977875759", 
        address: "5654 hallow dr, Tx 65644"  };

      service.updateEmployee(empId, changes).subscribe({
        error: (error) => {
          expect(error).toBeTruthy();
        },
      });

      const mockReq = testingController.expectOne(`http://localhost:8080/api/v1/employees/${empId}`);
      expect(mockReq.request.method).toEqual('PUT');
      mockReq.error(new ErrorEvent('Internal server error'));
    });
  });

  
});
