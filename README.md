[![CircleCI](https://circleci.com/gh/pschild/CodeRadarVisualization/tree/angular-ui.svg?style=svg)](https://circleci.com/gh/pschild/CodeRadarVisualization/tree/angular-ui)

# Visualization of software quality and evolution

## Background
In the context of my bachelor thesis, I developed a prototypic application that can **visualize the structure and quality of software**. It has been developed with the help of web technologies HTML, CSS and JavaScript. For the three-dimensional visualization, the library [Three.js](https://github.com/mrdoob/three.js/) was used.

With the **comparison of different versions** of this software, tendencies of the **software's evolution** shall be revealed and become visible.
According to that, the aim of this application is that developers and also project managers are able to **intuitively explore and localize flaws and possibilities to improve their projects**.
Therefore, **results of static code analyses are visualized** in the form of a city with buildings representing the files and districts representing the modules of the project.

## How to install
### Checkout and install dependencies
As the project was generated with [Angular CLI](https://github.com/angular/angular-cli), it's recommended to install that tool globally:
```
npm install -g @angular/cli
```

After checking out the project to your local harddrive, you can install all needed dependencies with npm:
```
npm install
```

### Coderadar
The application is yet designed to visualize results of static code analyses of the tool **Coderadar** exclusively. So at the moment, you would need to have a locally running Coderadar server and a fully analyzed sample project in order to use the application.
To see how this works, just have a look at the [GitHub project](https://github.com/reflectoring/coderadar) and at the [administration guide](http://www.reflectoring.io/coderadar/current/docs/admin.html).

## How to develop
### Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Environments
| environment | command              | optimized | endpoint                                      |
|-------------|----------------------|-----------|-----------------------------------------------|
| production  | `npm run serve:prod` | Yes       | `BASE_URL` in `AppConfig.ts`                  |
| dev         | `npm run serve:dev`  | No        | `BASE_URL` in `AppConfig.ts`                  |
| demo        | `npm run serve:demo` | No        | static JSON files, located in `assets/*.json` |

### Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Special hints
#### Version of @types/three
As TypeScript is used in version `~2.7.2`, we must use `@types/three` in version `^0.92.22`. See <https://www.npmjs.com/package/@types/three> (tab *Versions*) for an overview for which version can be used with which TypeScript version.

## Demo
The latest state of the angular-ui branch will always be automatically deployed to the [demo](https://pschild.github.io/CodeRadarVisualization/).