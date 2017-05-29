import { Injectable } from '@angular/core';

/**
 * Logger to be used throughout the app instead of directly sending messages to console.
 */
@Injectable()
export class Logger {
  // TODO: Integrate with JavaScript error tracking solution such as Sentry (https://sentry.io/for/javascript/)

  debug(message: string): void {
    console.debug(message);
  }

  info(message: string): void {
    console.info(message);
  }

  warn(message: string): void {
    console.warn(message);
  }

  error(message: string): void {
    console.error(message);
  }
}
