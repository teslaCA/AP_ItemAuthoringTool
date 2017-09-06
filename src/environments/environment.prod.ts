export const environment = {
  production: true,
  idleService: {
    idleDuration: 3300,         // Duration in seconds of maximum allowed idle time before an alert message is displayed
    timeoutDuration: 300,       // Duration in seconds that an alert will be presented to the user giving them an option to remain logged in
    logOutAfterTimeout: true    // Log outs application after timeout. Set to false only in development environments
  }
};
