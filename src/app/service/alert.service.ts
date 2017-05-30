/*
 * Copyright 2017 Regents of the University of California.
 *
 * Licensed under the Educational Community License, Version 2.0 (the "license");
 * you may not use this file except in compliance with the License. You may
 * obtain a copy of the license at
 *
 * https://opensource.org/licenses/ECL-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {Injectable} from "@angular/core";
import {ToastOptions, ToastyConfig, ToastyService} from "ng2-toasty";

/**
 * Service for showing growl-style alerts to the user.
 *
 * This service uses the ng2-toasty library (https://github.com/akserg/ng2-toasty/blob/master/README.md).
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
   * @param message the message to display.
   */
  success(message: string) {
    this.toastyService.success(AlertService.buildToastOptions(message));
  }

  /**
   * Show an alert indicating general info.
   * @param message the message to display.
   */
  info(message: string) {
    this.toastyService.info(AlertService.buildToastOptions(message));
  }

  /**
   * Show an alert indicating a warning.
   * @param message the message to display.
   */
  warning(message: string) {
    this.toastyService.warning(AlertService.buildToastOptions(message, "Warning"));
  }

  /**
   * Show an alert indicating an error.
   * @param message the message to display.
   */
  error(message: string) {
    this.toastyService.error(AlertService.buildToastOptions(message, "Error"));
  }

  /**
   * Show an alert indicating processing is under way.
   * @param message the message to display.
   */
  processing(message: string) {
    this.toastyService.wait(AlertService.buildToastOptions(message));
  }

  private static buildToastOptions(message: string, title?: string): ToastOptions {
    let options = new ToastOptions();
    options.msg = message;
    options.title = title;
    return options;
  }
}
