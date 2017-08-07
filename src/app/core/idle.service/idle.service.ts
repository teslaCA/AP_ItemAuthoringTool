import {Injectable } from '@angular/core';
import {Idle} from "@ng-idle/core";
import {Subject} from "rxjs/Subject";
import {Logger} from "../logger.service/logger.service";
import {Http} from "@angular/http";
import {environment} from "../../../environments/environment";
/**
 * Service for displaying a modal message alerting the user that their session is about to timeout
 * If the user responds Yes, the message goes away and a call to keep their web session alive takes place
 * If the user responds No, the user is logged out from the application and their current url is passed to the SSO service
 *
 * This service uses the ng2-idle component https://github.com/HackedByChinese/ng2-idle to track idle time
 */
@Injectable()
export class IdleService {
  idleDuration = 600;
  timeoutDuration = 60;
  logMessages = true;
  logOutAfterTimeout  = true;

  private subject = new Subject<boolean>();
  state = this.subject.asObservable();

  constructor(private idle: Idle,
              private logger: Logger,
              private http: Http) {

    // Duration in seconds of maximum allowed of time a logged in session is allowed to remain idle
    this.idleDuration = environment.idleService.idleDuration;

    // Duration in seconds that an alert will be presented to the user giving them an option to remain logged in
    this.timeoutDuration = environment.idleService.timeoutDuration;

    // Log outs application after timeout. Set to false only in development environments
    this.logOutAfterTimeout = environment.idleService.logOutAfterTimeout;

    this.idle.setIdle(this.idleDuration);

    this.idle.setTimeout(this.timeoutDuration);

    this.idle.onIdleStart.subscribe(() => {
      if (this.logMessages) {
        this.logger.info('Idle detected');
      }
    });

    this.idle.onIdleEnd.subscribe(() => {
      if (this.logMessages) {
        this.logger.info('No longer Idle');
      }
    });

    this.idle.onTimeoutWarning.subscribe((countdown) => {
      if (this.logMessages) {
        this.logger.info('You will time out in ' + countdown + ' seconds!');
      }
      this.subject.next(true);
    });

    this.idle.onTimeout.subscribe(() => {
      if (this.logMessages) {
        this.logger.info('Session has timed out');
      }
      if (this.logOutAfterTimeout) {
        this.logOut();
      }
    });

    // Start counting idle time
    this.idle.watch();
  }

  /**
   * Restarts the idle countdown. Called from idle-modal.component.
   */
  restartIdle(): void {
    if (this.idle.isRunning()) {
      this.idle.interrupt();
      this.extendWebSession();
    }
  }

  /**
   * Stops the idle service. Logs user out of application.
   */
  logOut(): void {
    this.idle.stop();
    window.location.href = '/saml/logout';
  }

  /**
   * Extend web session by calling spring boot app keepalive endpoint
   */
  extendWebSession() {
    if (this.logMessages) {
      this.logger.info('Calling extendWebSession');
    }
    this.http.get('/keepalive')
      .subscribe(() => {
        if (this.logMessages) {
          this.logger.info('Keepalive successful');
        }
      });
  }

}
