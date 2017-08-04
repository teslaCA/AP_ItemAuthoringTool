import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from "ngx-bootstrap";
import {Subscription} from "rxjs";
import {IdleService} from "./idle.service";

@Component({
  selector: 'idle-modal',
  templateUrl: './idle-modal.component.html',
  styleUrls: ['./idle-modal.component.less']
})
export class IdleModalComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  @ViewChild('logoutModal') logoutModal: ModalDirective;

  constructor(private idleService: IdleService) {
  }

  ngOnInit() {
    this.subscription = this.idleService.state
      .subscribe((state: boolean) => {
        if (state) {
          if (!this.logoutModal.isShown) {
            this.logoutModal.show();
          }
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  restartIdle() {
    this.idleService.restartIdle();
  }
}
