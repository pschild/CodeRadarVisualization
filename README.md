# CodeRadarVisualization

## Installing dependencies
After checking out the project to your local harddrive, just install all needed dependencies with npm:
```
npm install
```

## Transform to ES5
Because ES6 is used for writing the JavaScript code, you need to transpile the code into ES5. You can easily do that with the help of gulp:
```
gulp
```
To make the development a lot more comfortable, you can also start a code watcher with gulp. It will automatically transpile the JavaScript code to ES5 whenever it detects a change:
```
gulp watch
```

## Execute tests
To make sure the code works properly, you can run unit tests with
```
npm test
```

# Screenshots
Just choose two versions of your software project (based on GIT) and the type of view:
![Choose Versions](https://cloud.githubusercontent.com/assets/1246566/22399865/b43c4a3c-e5a6-11e6-829e-3ee483129843.PNG)

You can compare the two versions either side by side ...
![Split View](https://cloud.githubusercontent.com/assets/1246566/22399780/f8e23356-e5a4-11e6-9871-d08730dedda5.png)

... or in a merged view:
![Merged View](https://cloud.githubusercontent.com/assets/1246566/22399788/21de226a-e5a5-11e6-9ea7-1756f073dd4d.png)

You can filter for specific properties of your classes ...
![filter](https://cloud.githubusercontent.com/assets/1246566/22399866/b43d7d80-e5a6-11e6-8c64-b368556ac82a.PNG)

... and map different types of metrics to your personal visualization.
![mapping](https://cloud.githubusercontent.com/assets/1246566/22399867/b43f1316-e5a6-11e6-95ce-2cc9fb560a67.PNG)

Of course, you can also search for certain files in your project and highlight them in the visualization
![search](https://cloud.githubusercontent.com/assets/1246566/22399864/b43befba-e5a6-11e6-8b12-bdd23b369efa.PNG)
