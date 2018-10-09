## Preface
The whole application was rewritten using **Angular 6** - checkout the [angular-ui](https://github.com/pschild/CodeRadarVisualization/tree/angular-ui) branch and the **[demo](https://pschild.github.io/CodeRadarVisualization/)** Feel free to contribute :-)

# Visualization of software quality and evolution

## Background
In the context of my bachelor thesis, I developed a prototypic application that can **visualize the structure and quality of software**. It has been developed with the help of web technologies HTML, CSS and JavaScript. For the three-dimensional visualization, the library [Three.js](https://github.com/mrdoob/three.js/) was used.

With the **comparison of different versions** of this software, tendencies of the **software's evolution** shall be revealed and become visible.
According to that, the aim of this application is that developers and also project managers are able to **intuitively explore and localize flaws and possibilities to improve their projects**.
Therefore, **results of static code analyses are visualized** in the form of a city with buildings representing the files and districts representing the modules of the project.

## How to install
### Checkout and install dependencies
After checking out the project to your local harddrive, you can install all needed dependencies with npm:
```
npm install
```

### Coderadar
The application is yet designed to visualize results of static code analyses of the tool **Coderadar** exclusively. So at the moment, you would need to have a locally running Coderadar server and a fully analyzed sample project in order to use the application.
To see how this works, just have a look at the [GitHub project](https://github.com/reflectoring/coderadar) and at the [administration guide](http://www.reflectoring.io/coderadar/current/docs/admin.html).

## How to develop
### Transpiling to ES5
Because ES6 is used for writing the JavaScript code, you need to transpile the code into ES5 to make the app run in all browsers. You can easily do that with the help of gulp:
```
gulp
```
To make the development a lot more comfortable, you can also start a code watcher with gulp. It will automatically transpile the JavaScript code to ES5 whenever it detects a change in the source files:
```
gulp watch
```

### Execute tests
To make sure the code works properly, you can run unit tests with
```
npm test
```

# Screenshots
Just choose two versions of your software project (based on GIT) and the type of view:

![Choose Versions](https://cloud.githubusercontent.com/assets/1246566/23557895/fbbbf66e-0031-11e7-8192-5d9c41db98a6.PNG)

You can compare the two versions either side by side ...

![Split View](https://cloud.githubusercontent.com/assets/1246566/22399780/f8e23356-e5a4-11e6-9871-d08730dedda5.png)

... or in a merged view:

![Merged View](https://cloud.githubusercontent.com/assets/1246566/23557874/e3137ff6-0031-11e7-9174-f8ceb05f1550.PNG)

You can filter for specific properties of your classes ...

![filter](https://cloud.githubusercontent.com/assets/1246566/23557936/1872fe88-0032-11e7-8437-ae6f0a79ae3e.PNG)

... and map different types of metrics to your personal visualization.

![mapping](https://cloud.githubusercontent.com/assets/1246566/23557926/11553c7e-0032-11e7-9661-5968ab5226db.PNG)

Of course, you can also search for certain files in your project and highlight them in the visualization

![search](https://cloud.githubusercontent.com/assets/1246566/23557911/08b60db4-0032-11e7-8ca4-01bd8d27d6fc.PNG)
