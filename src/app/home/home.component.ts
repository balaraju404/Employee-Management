import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { AlertService } from '../pop-up-alerts/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  addEmpStatus: boolean = true;
  alertStatus:any;
  constructor(private empService: EmployeeService,private alertService:AlertService) { }
  ngOnInit(): void {
    this.empService.addEmpStatus.subscribe(status => {
      this.addEmpStatus = status;
    })
    this.alertService.alertBoxStatus.subscribe((status)=>{
      this.alertStatus=status;
    })
  }

  onAddEmp() {
    this.empService.addEmpStatus.next(true)
  }
}
