import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../home/employee.service';
import { AlertService } from '../pop-up-alerts/alert.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit {

  employees: any;

  pageLimitArray = [2,5,10,20,50];
  pageListLimit: number = 2;
  listLength: number;
  totalPages: number;
  pagesArray: number[] = [];

  currentPage: number = 1;

  constructor(private empService: EmployeeService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.empService.fetchEmpDetails()
    this.empService.employeeSubject.subscribe((res) => {
      this.employees = this.empService.employeesList;
      this.listLength = this.employees.length;
      this.totalPages = Math.ceil(this.listLength / this.pageListLimit);
      this.generateTotalPagesArray()
      this.currentPageRecords();
    })
    console.log(this.employees);
  }

  private generateTotalPagesArray() {
    this.pagesArray = []
    for (let i = 1; i <= this.totalPages; i++) {
      this.pagesArray.push(i);
    }
    console.log(this.pagesArray);

  }

  onPageLimitChange(element){
    this.pageListLimit = element.target.value;
    this.totalPages = Math.ceil(this.listLength / this.pageListLimit);
    this.generateTotalPagesArray()
    this.currentPageRecords();
  }

  onPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.currentPageRecords();
    }
  }

  onGotoPage(page) {
    this.currentPage = page;
    this.currentPageRecords();
  }

  onNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.currentPageRecords();
    }
  }

  currentPageRecords() {
    let start = (this.currentPage - 1) * this.pageListLimit;
    let end = start + this.pageListLimit;
    this.empService.displayRecordsIndexes.next(this.generateIndexArray(start, end));
  }

  generateIndexArray(start, end) {
    let arr = [];
    for (let i = start; i < end; i++) {
      arr.push(i);
    }
    return arr;
  }

}
