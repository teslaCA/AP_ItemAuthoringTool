import {AfterContentInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {Idle, EventTargetInterruptSource, DocumentInterruptSource} from '@ng-idle/core';

@Component({
  selector: 'session-timeout',
  templateUrl: './session-timeout.component.html',
  styleUrls: ['./session-timeout.component.less']
})
export class SessionTimeoutComponent {
  idleState = 'Not started';
  timeOut = false;
  @Output() extendSession = new EventEmitter<String>();

  constructor(private idle: Idle,
              private element: ElementRef) {
    this.idle.setIdle(5);

    this.idle.setTimeout(10);

    //this.idle.setInterrupts([new DocumentInterruptSource("sessionExtended")]);

    this.idle.setInterrupts([new EventTargetInterruptSource(
      this.element.nativeElement, "extendSession")
    ]);

    this.idle.onIdleStart.subscribe(() => {
      console.log('Idle detected')
    });
    this.idle.onIdleEnd.subscribe(() => {
      console.log('No longer idle')
    });

    this.idle.onTimeoutWarning.subscribe((countdown) => {
      console.log('You will time out in ' + countdown + ' seconds!');
    });
    this.idle.onTimeout.subscribe(() => {
      console.log('Session has timed out')
    });

    this.reset();
  }

  // ngAfterContentInit() {
  //   this.idle.setInterrupts([new EventTargetInterruptSource(
  //     this.sessionElement.nativeElement, "extendSession")
  //   ]);
  // }

  reset() {
    this.idle.watch();
    this.idleState = 'Started';
    this.timeOut = false;
  }

  stopIdle() {
    this.extendSession.emit("-Extend Session Request");
  }
}
