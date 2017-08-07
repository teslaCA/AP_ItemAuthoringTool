export const environment = {
  production: true,
  idleService: {
    idleDuration: 540,          // Duration in seconds of maximum allowed of time a logged in session is allowed to remain idle
    timeoutDuration: 60,        // Duration in seconds that an alert will be presented to the user giving them an option to remain logged in
    logOutAfterTimeout: true    // Log outs application after timeout. Set to false only in development environments
  }
};
