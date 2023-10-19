import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListComponent } from './employee-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      declarations: [ EmployeeListComponent ]
    })
    .compileComponents().then(()=>{
        fixture = TestBed.createComponent(EmployeeListComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
    })

    
    fixture.detectChanges();
  });

  it('should create Employee List Component', () => {
    expect(component).toBeTruthy();
  });

  it('should list the employees in correct order', () => {
    // Setting up  test data
    const testData = [
        { id: 1, firstname: 'John', lastname: 'wick', email: 'wick@gmail.com' },
        { id: 2, firstname: 'Narendra', lastname: 'S', email: 'naren@gmail.com' },
        { id: 3, firstname: 'test', lastname: 'test', email: 'test@gmail.com' }
    ];

    // Assigning the test data to component
    component.employees = testData;

    // Trigger change detection to render the component
    fixture.detectChanges();

    // Find all the table rows in the component's template
    const tableRows = el.queryAll(By.css('table tr'));

    // Assert that the number of table rows matches the number of employees + 1 (for the header row)
    expect(tableRows.length).toBe(testData.length + 1);

    // Check if the content in the first row (header) is as expected
    const headerRow = tableRows[0].nativeElement;
    expect(headerRow.textContent).toContain('Firstname');
    expect(headerRow.textContent).toContain('Lastname');
    expect(headerRow.textContent).toContain('Email');
    expect(headerRow.textContent).toContain('Actions');

    // Check if the content in the data rows matches the test data
    for (let i = 0; i < testData.length; i++) {
      const dataRow = tableRows[i + 1].nativeElement;
      expect(dataRow.textContent).toContain(testData[i].firstname);
      expect(dataRow.textContent).toContain(testData[i].lastname);
      expect(dataRow.textContent).toContain(testData[i].email);
    }
  });
});
