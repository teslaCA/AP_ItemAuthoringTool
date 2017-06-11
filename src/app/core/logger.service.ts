import {Injectable} from "@angular/core";

// TODO: Integrate with JavaScript error tracking solution such as Sentry (https://sentry.io/for/javascript/)
/**
 * Logger to be used throughout the app instead of directly sending messages to console.
 */
@Injectable()
export class Logger {
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
