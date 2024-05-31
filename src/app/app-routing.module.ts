import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AddEmpComponent } from "./home/add-emp/add-emp.component";
import { EmpDeatailsComponent } from "./home/emp-deatails/emp-deatails.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, children: [
      // { path: '', redirectTo: 'emp-details', pathMatch: 'full' },
      { path: '', component: EmpDeatailsComponent },
      { path: 'emp-details', component: EmpDeatailsComponent },
      // { path: 'add-emp', component: AddEmpComponent },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRouting { }
