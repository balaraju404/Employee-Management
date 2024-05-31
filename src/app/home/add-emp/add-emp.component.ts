import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { AlertService } from '../../pop-up-alerts/alert.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrl: './add-emp.component.scss'
})
export class AddEmpComponent implements OnInit {
  positions: string[] = ['Trainee', 'Jr. Developer', 'Sr.Developer', 'Team Lead', 'Project Manager',
    'Testing', 'Testing Manager', 'Manager', 'HR', 'Accounts Manager']
  teams: string[] = ['Team Red', 'Team Green', 'Team Blue', 'Team Yellow', 'Team Orange'];

  isLoading: boolean;

  constructor(private empService: EmployeeService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.empService.loadingStatus.subscribe(status => {
      this.isLoading = status;
    })
  }

  onSubmit(form: NgForm) {
    console.log(form.value)
    if (form.controls['workMail'].errors?.email) {
      this.alertService.onError('Enter Valid Email');
      return;
    }

    if (!form.valid) {
      this.alertService.onError("Please fill all the fields");
      return;
    }
    this.empService.createEmployee(form.value);
  }

  onClose() {
    this.empService.addEmpStatus.next(false)
  }
}
