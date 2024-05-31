import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../employee.service';
import { AlertService } from '../../pop-up-alerts/alert.service';

@Component({
  selector: 'app-emp-deatails',
  templateUrl: './emp-deatails.component.html',
  styleUrl: './emp-deatails.component.scss'
})
export class EmpDeatailsComponent implements OnInit {

  empDetails: Employee[] = [];
  editStatus: boolean;
  isLoading: boolean;

  currentPageIndexs;

  constructor(private empService: EmployeeService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.empService.loadingStatus.subscribe(status => {
      this.isLoading = status;
    })

    this.empService.displayRecordsIndexes.subscribe((arr) => {
      this.currentPageIndexs = arr;
    })
    this.empService.employeeSubject.subscribe(() => {
      this.empDetails = this.empService.employeesList;
    })
    this.empService.editEmpStatus.subscribe((status) => {
      this.editStatus = status;
    })

  }

  onEdit(emp) {
    this.empService.editEmpSubject.next(emp);
    this.empService.editEmpStatus.next(true)
  }

  onDelete(id) {
    if (!confirm('Are you sure you want to delete ?')) {
      return;
    }
    this.empService.deleteEmployee(id);
  }

  checkRecord(index) {
    const status = this.currentPageIndexs.includes(index);
    return status;
  }

  // Sorting and searching methods
  onFilter(filterData) {
    console.log(filterData);
    this.empService.fetchEmpDetails(filterData.sortBy, filterData.sortOrder, filterData.searchValue);
  }
}
