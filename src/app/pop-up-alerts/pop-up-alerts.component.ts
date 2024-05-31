import { Component, OnInit } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-pop-up-alerts',
  templateUrl: './pop-up-alerts.component.html',
  styleUrls: ['./pop-up-alerts.component.scss']
})
export class PopUpAlertsComponent implements OnInit {

  status: string = null;

  success: string;
  error: string;

  intervalID;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertService.alertBoxStatus.subscribe((status) => {
      this.status = status;
      this.success = this.alertService.successMsg;
      this.error = this.alertService.errorMsg;
      this.clearAlert()
    });
  }

  clearAlert() {
    if (this.intervalID) {
      clearTimeout(this.intervalID);
    }
    this.intervalID = setTimeout(() => this.onClose(), 3000);
  }

  onClose() {
    clearTimeout(this.intervalID);
    this.alertService.alertBoxStatus.next(null);
  }
}
