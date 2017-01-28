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
You can compare two versions of your software project either side by side ...
![Split View](https://cloud.githubusercontent.com/assets/1246566/22399780/f8e23356-e5a4-11e6-9871-d08730dedda5.png)

... or in a merged view:
![Merged View](https://cloud.githubusercontent.com/assets/1246566/22399788/21de226a-e5a5-11e6-9ea7-1756f073dd4d.png)
