import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {BusyState} from "./busy-state";

/**
 * Service for showing a busy indicator when a lengthy operation is underway.  While the busy indicator is
 * displayed a transparent overlay prevents the user from interacting with the UI.
 */
@Injectable()
export class BusyService {
  private subject = new Subject<BusyState>();
  state = this.subject.asObservable();

  /**
   * Show the busy indicator with the given message and prevent the user from interacting with the UI.
   * @param message to be displayed.
   */
  show(message?: string) {
    this.subject.next(<BusyState>{message: message, show: true});
  }

  /**
   * Hide the busy indicator and allow the user to interact with the UI.
   */
  hide() {
    this.subject.next(<BusyState>{message: '', show: false});
  }
}
