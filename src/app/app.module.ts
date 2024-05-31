import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRouting } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { EmpDeatailsComponent } from './home/emp-deatails/emp-deatails.component';
import { AddEmpComponent } from './home/add-emp/add-emp.component';
import { PopUpAlertsComponent } from './pop-up-alerts/pop-up-alerts.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { LoadingSpinComponent } from './loading-spin/loading-spin.component';
import { PaginationComponent } from './pagination/pagination.component';

import { BootstrapPopoverDirective } from './directives/popover.directive';
import { PascalCasePipe } from './pipes/pascel-case.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    EmpDeatailsComponent,
    AddEmpComponent,
    PopUpAlertsComponent,
    EditEmployeeComponent,
    LoadingSpinComponent,
    PaginationComponent,
    BootstrapPopoverDirective,
    PascalCasePipe
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRouting,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
