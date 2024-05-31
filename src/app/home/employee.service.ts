import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AlertService } from "../pop-up-alerts/alert.service";


export interface Employee {
  _id?: any;
  name: string;
  age: number;
  workMail: string;
  position: string;
  team: string;
}

@Injectable({ providedIn: 'root' })

export class EmployeeService {

  private apiURL = 'https://employee-api-five.vercel.app';
  // private apiURL = 'http://localhost:3000';

  employeesList: Employee[] = []
  employeeSubject = new BehaviorSubject<any>([])

  addEmpStatus = new BehaviorSubject<boolean>(false);
  editEmpStatus = new BehaviorSubject<boolean>(false);

  editEmpSubject = new BehaviorSubject<any>(null);

  loadingStatus = new BehaviorSubject<boolean>(true);

  displayRecordsIndexes = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient, private alertService: AlertService) { }

  createEmployee(emp) {
    this.loadingStatus.next(true)
    this.http.post(`${this.apiURL}/emp`, emp).subscribe((res) => {
      console.log(res);
      this.alertService.onSuccess("Employee Added Successfully");
      this.employeeSubject.next(res)
      this.loadingStatus.next(false)
      this.fetchEmpDetails();
    }, (error) => {
      console.log(error.error.message);
      this.loadingStatus.next(false)
      this.alertService.onError(error.error.message || "Error Adding Employee");
    })
  }

  fetchEmpDetails(sortBy = '_id', order = "asc", filterValue = '') {
    this.loadingStatus.next(true)
    return this.http.get(`${this.apiURL}/emp`, {
      params: {
        sortBy: sortBy,
        sortOrder: order,
        filterValue: filterValue,
      }
    }).subscribe((res: []) => {
      // this.employees = res;
      this.employeesList = res;
      this.employeeSubject.next(res)
      this.loadingStatus.next(false);
    }, error => {
      console.log(error.error.message);
      this.loadingStatus.next(false);
      this.alertService.onError(error.error.message || "Error Fetching Employee Details");
    });
  }

  getEmployee(id) {
    const employee = this.employeesList.filter(emp => emp._id === id)
    return employee;
  }

  updateEmployee(id, emp) {
    this.loadingStatus.next(true)
    this.http.patch(`${this.apiURL}/emp/${id}`, emp).subscribe((res) => {
      console.log(res);
      this.loadingStatus.next(false)
      this.alertService.onSuccess("Employee Updated Successfully");
    }, (error) => {
      console.log(error);
      this.loadingStatus.next(false)
      this.alertService.onError("Error Updating Employee");
    })
  }

  deleteEmployee(id) {
    this.loadingStatus.next(true)
    this.http.delete(`${this.apiURL}/emp/${id}`).subscribe((res) => {
      console.log(res);
      this.loadingStatus.next(false)
      this.alertService.onSuccess("Employee Deleted Successfully");
      this.fetchEmpDetails();
    }, (error) => {
      console.log(error);
      this.loadingStatus.next(false)
      this.alertService.onError("Error Deleting Employee");
    })
  }
}
