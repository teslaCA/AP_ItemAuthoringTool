# Assessment Production - Item Authoring Tool

Web-based application for the creation and review of assessment items.  This repo contains the source for a greenfield implementation of the item authoring tool.  Once complete this implementation will replace the old item authoring tool.

Note, "AP" is short for Assessment Production which means the creation of assessment items (questions) and assessments (tests) for the purpose of administering those assessments to students.  All repos for libraries, services, and apps associated with assessment production are prefixed with AP.

## Intro

The item authoring tool (ap-iat) is a Spring Boot backend and an Angular 2 frontend.

## Requires

* JDK 8
* NPM 
* Angular CLI

## Security

The application is secured and requires a valid security configuration.  

If the security configuration is not valid the application will not start.

## Backend

The application can be enabled to retrieve its configuration from a [Spring Cloud Config Server](https://cloud.spring.io/spring-cloud-config/spring-cloud-config.html).

See ```src/main/resources/bootstrap.yml```

#### Building with Gradle 

Use the Gradle wrapper when developing - "gradlew"  

The script "gw" is equivalent to "gradlew".

"gw" is preferred over "gradlew" when developing.

"gw" starts the gradle daemon and sets important env vars.  The env vars are required when running the app.

**It is important to navigate into the project's root folder when executing build commands.**  

Doing so means the working directory is the project's root which then means the application.yml in the project root is picked up 
and takes precendence over src/main/resources/application.yml when the application is run.
 
This only happens when developing and running the app locally.  The project's root application.yml is not packaged with the app.

#### Development Profile

The project's root appication.yml is effectively the development profile.
  
The development profile defines backend routes to other services.  

See the section below describing docker compose.  It is the recommended way for 
standing up the app dependencies.  

The development profile routes are configured to match how docker compose stands 
up the dependency.  

Build ```./gw build```
 
Run ```./gw bootRun```  

# Frontend

#### NVM

Install the Node Version Manager (NVM).

[NVM Home](https://github.com/creationix/nvm/blob/master/README.markdown)

[Mac Install NVM with HomeBrew](http://dev.topheman.com/install-nvm-with-homebrew-to-use-multiple-versions-of-node-and-iojs-easily/)

#### Node and NPM

NPM is required for managing frontend libraries including the angular cli.  Installing Node installs NPM.

Install version 7.7.4 of Node using NVM.

```nvm install 7.7.4```


#### Angular-cli

[Angular Cli Website](https://cli.angular.io/)

Install the angular-cli globally.

In a terminal window and from any directory run  ```npm install -g @angular/cli```


Once installed, run ```ng help``` to get a list of commands and their associated options.

### Development

In a terminal window, navigate to the root of the project.

It is common to start with: ```npm install```

Each time you pull new features or switch branches you should execute ```npm install.```  
 
Doing this ensures you have the correct packages to build, test, and run.
 
Run app using dev settings: ```npm start```

Run app using production settings: ```npm run start-prod```

Open in a browser ```http://localhost:4200```

**IDE**

Intellij has good support for Typescript and is the recommended IDE.  With Ultimate Edition integrating the angular-cli with Intellij 
is easy - [See Docs](https://www.jetbrains.com/help/idea/2016.3/using-angular-cli.html).

Visual Studio Code is an alternate IDE.  It has good support for Typescript.

### Testing

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

### Builds

Development Build: ```ng build```

Production Build: ```ng build --prod```

The build output is the **/dist** folder.

All builds make use of bundling.  Using the **--prod** flag will also make use of uglifying and tree-shaking functionality.  


### Docker

**Prerequisite** 

Docker is required - https://docs.docker.com/engine/installation/ - The installation should
include docker compose which is also needed.

**Build Tasks**

There are Gradle tasks for Docker commands.

Copy docker files: ```./gw dockerCopyFiles``` - copies and filters the files under ```src/main/docker```

Build docker image: ```./gw dockerBuildImage``` - build a docker image using the Dockerfile in ```build/docker```

Publish docker image: ```./gw dockerPushImage``` - publishes the image to docker hub.

**Docker Compose**

Docker Compose is used to stand up all the services ap-iat depends on.  It is useful when
developing.

The project root has a file docker.sh.

Run multiple containers: ```./docker.sh up``` - stand up all dependencies.  Uses the docker-compose.yml under ```build/docker```

Stop docker image: ```./docker.sh down``` - stop all containers.

**Docker Push Image**

You could use docker directly to push the image to docker hub.  You can also use 
the gradle tasks ```dockerPushImage```.  

Using the gradle task requires credentials.  To achieve this create a file named ```gradle.properties```
and save it to ```${HOME}/.gradle/```.  The file must contain three properties:

* dockerHubUser =
* dockerHubPass =
* dockerHubEmail =
