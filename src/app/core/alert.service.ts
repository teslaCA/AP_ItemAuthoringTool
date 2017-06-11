import {Injectable} from "@angular/core";
import {ToastOptions, ToastyConfig, ToastyService} from "ng2-toasty";

/**
 * Service for showing growl-style alerts to the user.
 *
 * This service uses the ng2-toasty library (https://github.com/akserg/ng2-toasty/blob/master/README.md) to display
 * the alerts.
 */
@Injectable()
export class AlertService {
  constructor(private toastyService: ToastyService,
              private toastyConfig: ToastyConfig) {
    this.toastyConfig.limit = 5;
    this.toastyConfig.showClose = true;
    this.toastyConfig.theme = 'bootstrap';
    this.toastyConfig.timeout = 5000;
  }

  /**
   * Show an alert indicating success.
   * @param title the title of the alert.
   * @param message the message of the alert.
   */
  success(title: string, message: string) {
    this.toastyService.success(AlertService.buildToastOptions(title, message));
  }

  /**
   * Show an alert indicating general info.
   * @param title the title of the alert.
   * @param message the message of the alert.
   */
  info(title: string, message: string) {
    this.toastyService.info(AlertService.buildToastOptions(title, message));
  }

  /**
   * Show an alert indicating a warning.
   * @param title the title of the alert.
   * @param message the message of the alert.
   */
  warning(title: string, message: string) {
    this.toastyService.warning(AlertService.buildToastOptions(title, message));
  }

  /**
   * Show an alert indicating an error.
   * @param title the title of the alert.
   * @param message the message of the alert.
   */
  error(title: string, message: string) {
    this.toastyService.error(AlertService.buildToastOptions(title, message));
  }

  /**
   * Show an alert indicating processing is under way.
   * @param title the title of the alert.
   * @param message the message of the alert.
   */
  processing(title: string, message: string) {
    this.toastyService.wait(AlertService.buildToastOptions(title, message));
  }

  private static buildToastOptions(title: string, message: string): ToastOptions {
    const options = new ToastOptions();
    options.msg = message;
    options.title = title;
    return options;
  }
}
