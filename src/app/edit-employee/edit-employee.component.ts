import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee, EmployeeService } from '../home/employee.service';
import { AlertService } from '../pop-up-alerts/alert.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss'
})
export class EditEmployeeComponent implements OnInit {
  positions: string[] = ['Trainee', 'Jr. Developer', 'Sr.Developer', 'Team Lead', 'Project Manager',
    'Testing', 'Testing Manager', 'Manager', 'HR', 'Accounts Manager']
  teams: string[] = ['Team Red', 'Team Green', 'Team Blue', 'Team Yellow', 'Team Orange']

  employee: Employee;

  isLoading: boolean;

  constructor(private empService: EmployeeService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.empService.loadingStatus.subscribe(status => {
      this.isLoading = status;
    })
    this.empService.editEmpSubject.subscribe((res) => {
      this.employee = res;
    })
  }


  onSubmit(id, form: NgForm) {
    console.log(form.value)

    if (!form.valid) {
      this.alertService.onError("Please fill all the fields");
      return;
    }
    this.empService.updateEmployee(id, form.value);
  }

  onClose() {
    this.empService.editEmpStatus.next(false);
    this.empService.editEmpSubject.next(null);
  }
}
