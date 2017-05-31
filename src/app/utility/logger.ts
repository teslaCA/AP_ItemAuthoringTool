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

/**
 * Logger to be used throughout the app instead of directly sending messages to console.
 */
@Injectable()
export class Logger {
  // TODO: Integrate with JavaScript error tracking solution such as Sentry (https://sentry.io/for/javascript/)

  /**
   * Log a debug level message.
   * @param message to be logged.
   */
  debug(message: string): void {
    console.debug(message);
  }

  /**
   * Log an info level message.
   * @param message to be logged.
   */
  info(message: string): void {
    console.info(message);
  }

  /**
   * Log a warn level message.
   * @param message to be logged.
   */
  warn(message: string): void {
    console.warn(message);
  }

  /**
   * Log an error level message.
   * @param message to be logged.
   */
  error(message: string): void {
    console.error(message);
  }
}
