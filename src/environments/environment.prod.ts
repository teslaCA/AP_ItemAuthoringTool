export const environment = {
  production: true,
  idleService: {
    idleDuration: 600,          // Duration in seconds of maximum allowed of time a logged in session is allowed to remain idle
    timeoutDuration: 60,        // Duration in seconds that an alert will be presented to the user giving them an option to remain logged in
    logMessages: false,         // Log idle related messages to the console. Set to true only in development environments
    logOutAfterTimeout: true    // Log outs application after timeout. Set to false only in development environments
  }
};
