// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
export const environment = {
  production: false,
  idleService: {
    idleDuration: 540,          // Duration in seconds of maximum allowed of time a logged in session is allowed to remain idle
    timeoutDuration: 60,        // Duration in seconds that an alert will be presented to the user giving them an option to remain logged in
    logOutAfterTimeout: true    // Log outs application after timeout. Set to false only in development environments
  }
};
