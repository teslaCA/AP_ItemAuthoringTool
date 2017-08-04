import {Injectable } from '@angular/core';
import {Idle} from "@ng-idle/core";
import {Subject} from "rxjs";

@Injectable()
export class IdleService {
  idleDuration = 5;
  timeoutDuration = 20;
  private subject = new Subject<boolean>();
  state = this.subject.asObservable();

  constructor(private idle: Idle) {

    //this.idleModal = new IdleModalComponent();

    this.idle.setIdle(this.idleDuration);

    this.idle.setTimeout(this.timeoutDuration);

    this.idle.onIdleStart.subscribe(() => {
      console.log('Idle detected');
    });

    this.idle.onIdleEnd.subscribe(() => {
      console.log('No longer idle');
    });

    this.idle.onTimeoutWarning.subscribe((countdown) => {
      console.log('You will time out in ' + countdown + ' seconds!');
      this.subject.next(true);
      //if (!this.idleModal.isShown) {
        //this.idleModal.show();
      //}
    });

    this.idle.onTimeout.subscribe(() => {
      console.log('Session has timed out');
      //this.logOut();
    });

    this.idle.watch();
  }

  /**
   *
   */
  restartIdle() {
    this.idle.interrupt();
  }

  /**
   *
   */
  logOut(): void {
    window.location.href = '/saml/logout';
  }

  /**
   *
   */
  refreshSession(): void {
    // window.location.href  = this.location.path() == "" ?  "/" : this.location.path();
    // console.log(this.location.path());
    // this.restartIdle();
    // this.logoutModal.hide();
  }
}
