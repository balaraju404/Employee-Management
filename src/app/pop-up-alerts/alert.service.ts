import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })

export class AlertService {
  successMsg: string;
  errorMsg: string;

  alertBoxStatus = new BehaviorSubject<string>(null);

  onSuccess(msg) {
    this.successMsg = msg;
    this.errorMsg = null;
    this.alertBoxStatus.next('success');
  }
  onError(msg) {
    this.errorMsg = msg;
    this.successMsg = null;
    this.alertBoxStatus.next('error');
  }
}
