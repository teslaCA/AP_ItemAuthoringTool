import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {BusyService} from "./busy.service";
import {BusyState} from "./busy-state";

/**
 * Component that renders a busy overlay over the entire window when BusyService.show is called.
 * A busy-overlay element must be added to app.component.html in order for the busy overlay to be displayed.
 */
@Component({
  selector: 'busy-overlay',
  templateUrl: './busy-overlay.component.html',
  styleUrls: ['./busy-overlay.component.less']
})
export class BusyOverlayComponent implements OnInit, OnDestroy {
  message = '';
  show = false;
  private subscription: Subscription;

  constructor(private loaderService: BusyService) {
  }

  ngOnInit() {
    this.subscription = this.loaderService.state
      .subscribe((state: BusyState) => {
        this.message = state.message;
        this.show = state.show;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
