# Assessment Production - Item Authoring Tool

Web-based application for the creation and review of assessment items.  This repo contains the source for a greenfield implementation of the item authoring tool.  Once complete this implementation will replace the old item authoring tool.

Note, "AP" is short for Assessment Production which means the creation of assessment items (questions) and assessments (tests) for the purpose of administering those assessments to students.  All repos for libraries, services, and apps associated with assessment production are prefixed with AP.

## Getting Started

### Node and NPM

Install the latest version of Node.  Installing Node installs Npm.  

Npm is required for managing frontend libraries including the angular cli.  

[Node Download](https://nodejs.org/en/download/)
  
[Mac Install Node with HomeBrew](http://blog.teamtreehouse.com/install-node-js-npm-mac) - see the "Prerequisites" section talking about XCode and HomeBrew.


### Angular-cli

[Angular Cli Website](https://cli.angular.io/)

In a terminal window, from any directory run  ```npm install -g angular-cli```

This installs the angular-cli globally.

Once installed, run ```ng help``` to get a list of commands and their associated options.

### Development

#### Setup

In a terminal window, navigate to the root of the project.

It is common to start with: ```npm install```

Each time you pull new features or switch branches you should execute ```npm install.```  
 
Doing this ensures you have the correct packages to build, test, and run.
 
Running the app using dev settings: ```ng serve```

Running the app using production settings: ```ng serve --prod```

Open in a browser ```http://localhost:4200```

**IDE**

Intellij has good support for Typescript and is the recommended IDE.  With Ultimate Edition integrating the angular-cli with Intellij 
is easy - [See Docs](https://www.jetbrains.com/help/idea/2016.3/using-angular-cli.html).

Visual Studio Code is an alternate IDE.  It has good support for Typescript.

#### Testing

**Unit Testing**

Run unit tests:  ```ng test```

Run unit tests once with code coverage: ```ng test --single-run --code-coverage```

Unit tests use Karma.  The project is configured with Karma using the Chrome browser. 
If you don't have Chrome installed the test execution will fail.

Karma can be configured to use other browsers.  
1. Install the launcher:  ```npm install karma-firefox-launcher --save-dev```.  
2. Update **karma.conf.js**

**Static Code Analysis**

Run static code analysis:  ```ng lint```

See the **tslint.json** file.  It was created by the angular-cli.

**End To End Testing**

Run end-to-end tests: ```ng e2e```

End to end tests require the app to be running (i.e. ```ng serve```).  then from a different
 terminal run the end-to-end tests.

#### Builds

Development Build: ```ng build```

Production Build: ```ng build --prod```

The build output is the **/dist** folder.

All builds make use of bundling.  Using the **--prod** flag will also make use of uglifying and tree-shaking functionality.  

