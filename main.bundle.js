webpackJsonp([1,5],{

/***/ 128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AppConfig__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enum_ScreenType__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_three__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColorHelper; });



var ColorHelper = (function () {
    function ColorHelper() {
    }
    ColorHelper.getColorByPosition = function (screenType) {
        return screenType === __WEBPACK_IMPORTED_MODULE_1__enum_ScreenType__["a" /* ScreenType */].LEFT ? __WEBPACK_IMPORTED_MODULE_0__AppConfig__["a" /* AppConfig */].COLOR_FIRST_COMMIT : __WEBPACK_IMPORTED_MODULE_0__AppConfig__["a" /* AppConfig */].COLOR_SECOND_COMMIT;
    };
    ColorHelper.getContraryColorByColor = function (color) {
        return color === __WEBPACK_IMPORTED_MODULE_0__AppConfig__["a" /* AppConfig */].COLOR_FIRST_COMMIT ? __WEBPACK_IMPORTED_MODULE_0__AppConfig__["a" /* AppConfig */].COLOR_SECOND_COMMIT : __WEBPACK_IMPORTED_MODULE_0__AppConfig__["a" /* AppConfig */].COLOR_FIRST_COMMIT;
    };
    ColorHelper.getColorByMetricValue = function (value, max, min) {
        return this.getColorScale(__WEBPACK_IMPORTED_MODULE_0__AppConfig__["a" /* AppConfig */].COLOR_HEATMAP_RANGE, value, max, min);
    };
    ColorHelper.getColorByBottomValue = function (value, max, min) {
        return this.getColorScale(__WEBPACK_IMPORTED_MODULE_0__AppConfig__["a" /* AppConfig */].COLOR_HIERARCHY_RANGE, value, max, min);
    };
    ColorHelper.getColorScale = function (range, value, max, min) {
        var colorScale = chroma.scale(range);
        var hexValue = colorScale(value / (max + min)).hex();
        return new __WEBPACK_IMPORTED_MODULE_2_three__["Color"](hexValue);
    };
    return ColorHelper;
}());

//# sourceMappingURL=color-helper.js.map

/***/ }),

/***/ 129:
/***/ (function(module, exports) {

//# sourceMappingURL=IFilter.js.map

/***/ }),

/***/ 130:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(19);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommitService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CommitService = (function () {
    function CommitService(http) {
        this.http = http;
    }
    CommitService.prototype.loadCommits = function () {
        return this.http.get('http://localhost:4200/assets/json/commits.json')
            .map(function (res) { return res.json(); });
    };
    return CommitService;
}());
CommitService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], CommitService);

var _a;
//# sourceMappingURL=commit.service.js.map

/***/ }),

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(19);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MetricService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MetricService = (function () {
    function MetricService(http) {
        this.http = http;
    }
    MetricService.prototype.loadDeltaTree = function (leftCommit, rightCommit, metricMapping) {
        var body = {
            'commit1': leftCommit.name,
            'commit2': rightCommit.name,
            'metrics': [metricMapping.heightMetricName, metricMapping.groundAreaMetricName, metricMapping.colorMetricName]
        };
        var id;
        switch (rightCommit.name) {
            case 'b152859ca8d73f5c974c2264107fd0092af310d0':
                id = 1;
                break;
            case '2beb1d1d720c1256cedfdf483331f65861079705':
                id = 2;
                break;
            case 'cbba0662f48f139da4973cc610bd4caa6213ed08':
                id = 3;
                break;
            case '6ffebfad9e79dfa4ddfa7d043d84eb424a28c0cd':
                id = 4;
                break;
        }
        // TODO: this.http.post('http://localhost:4200/assets/json/deltaTree.json', body)
        return this.http.get("http://localhost:4200/assets/json/deltaTree" + id + ".json")
            .delay(1500) // TODO: remove in final version
            .map(function (res) {
            return {
                rootNode: res.json()
            };
        });
    };
    return MetricService;
}());
MetricService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], MetricService);

var _a;
//# sourceMappingURL=metric.service.js.map

/***/ }),

/***/ 132:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__geometry_block__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_enum_NodeType__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AppConfig__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helper_element_analyzer__ = __webpack_require__(40);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbstractView; });




var AbstractView = (function () {
    function AbstractView(screenType) {
        this.blockElements = [];
        this.packer = new GrowingPacker();
        this.minBottomValue = 0;
        this.maxBottomValue = Number.MIN_VALUE;
        this.screenType = screenType;
    }
    AbstractView.prototype.setMetricTree = function (root) {
        this.rootNode = root;
    };
    AbstractView.prototype.recalculate = function () {
        if (!this.rootNode) {
            throw new Error("rootNode is not defined!");
        }
        this.calculateGroundAreas([this.rootNode]);
        this.calculateElements([this.rootNode], null, 0);
    };
    AbstractView.prototype.calculateGroundAreas = function (nodes) {
        if (!Array.isArray(nodes)) {
            nodes = [nodes];
        }
        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
            var node = nodes_1[_i];
            var element = { w: 0, h: 0 };
            if (node.type === __WEBPACK_IMPORTED_MODULE_1_app_enum_NodeType__["a" /* NodeType */].FILE) {
                var groundArea = this.getValueForGroundArea(node.commit1Metrics, node.commit2Metrics);
                if (!groundArea) {
                    element.w = element.h = 0;
                }
                else {
                    element.w = groundArea * __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].GROUND_AREA_FACTOR + __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].GLOBAL_MIN_GROUND_AREA + 2 * __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].BLOCK_SPACING;
                    element.h = groundArea * __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].GROUND_AREA_FACTOR + __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].GLOBAL_MIN_GROUND_AREA + 2 * __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].BLOCK_SPACING;
                }
            }
            // recursion
            if (node.children && node.children.length > 0) {
                var result = this.calculateGroundAreas(node.children);
                element.w = result.w + 2 * __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].BLOCK_SPACING;
                element.h = result.h + 2 * __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].BLOCK_SPACING;
            }
            node.packerInfo = element;
        }
        nodes.sort(function (a, b) {
            return b.packerInfo.w - a.packerInfo.w;
        });
        this.packer.fit(nodes.map(function (node) { return node.packerInfo; }));
        return {
            packer: this.packer.root,
            w: this.packer.root.w,
            h: this.packer.root.h
        };
    };
    AbstractView.prototype.createBlock = function (node, parent, color, currentCommitSize, bottom, height, isTransparent, metrics, commitType, changeTypes) {
        var finalX, finalY, finalZ;
        var finalWidth, finalHeight, finalDepth;
        var cube = new __WEBPACK_IMPORTED_MODULE_0__geometry_block__["a" /* Block */](color, node.name);
        finalX = node.packerInfo.fit.x + (parent ? parent.packerInfo.renderedX : 0) + __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].BLOCK_SPACING;
        finalY = bottom;
        finalZ = node.packerInfo.fit.y + (parent ? parent.packerInfo.renderedY : 0) + __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].BLOCK_SPACING;
        // save the rendered positions to draw children relative to their parent
        node.packerInfo.renderedX = finalX;
        node.packerInfo.renderedY = finalZ;
        finalWidth = node.type === __WEBPACK_IMPORTED_MODULE_1_app_enum_NodeType__["a" /* NodeType */].FILE ? currentCommitSize : node.packerInfo.w - 2 * __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].BLOCK_SPACING;
        finalHeight = height;
        finalDepth = node.type === __WEBPACK_IMPORTED_MODULE_1_app_enum_NodeType__["a" /* NodeType */].FILE ? currentCommitSize : node.packerInfo.h - 2 * __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].BLOCK_SPACING;
        if (isTransparent) {
            cube.material.transparent = true;
            cube.material.opacity = 0.4;
        }
        cube.position.x = finalX;
        cube.position.y = finalY;
        cube.position.z = finalZ;
        cube.scale.x = finalWidth;
        cube.scale.y = finalHeight;
        cube.scale.z = finalDepth;
        cube.userData = this.createUserData(node, parent, bottom, isTransparent, metrics, commitType, changeTypes);
        this.blockElements.push(cube);
    };
    AbstractView.prototype.createUserData = function (node, parent, bottom, isTransparent, metrics, commitType, changeTypes) {
        return {
            parentName: parent ? parent.name : undefined,
            bottom: bottom,
            metrics: metrics,
            type: node.type,
            elementName: node.name,
            isHelper: isTransparent,
            commitType: commitType,
            changeTypes: changeTypes
        };
    };
    AbstractView.prototype.getBlockElements = function () {
        return this.blockElements;
    };
    AbstractView.prototype.getValueForGroundArea = function (commit1Metrics, commit2Metrics) {
        return __WEBPACK_IMPORTED_MODULE_3__helper_element_analyzer__["a" /* ElementAnalyzer */].getMaxMetricValueByMetricName(commit1Metrics, commit2Metrics, __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].GROUND_AREA_METRIC_NAME);
    };
    return AbstractView;
}());

//# sourceMappingURL=abstract-view.js.map

/***/ }),

/***/ 20:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environments_environment__ = __webpack_require__(36);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppConfig; });

var AppConfig = (function () {
    function AppConfig() {
    }
    return AppConfig;
}());

AppConfig.DEBUG_MODE_ENABLED = false;
// CODERADAR CONFIG
AppConfig.BASE_URL = 'http://localhost:8080';
AppConfig.USERNAME = 'radar';
AppConfig.PASSWORD = 'Password12!';
// ALL AVAILABLE METRICS
AppConfig.AVAILABLE_METRICS = [
    { shortName: 'Lines of Code (LOC)', name: 'coderadar:size:loc:java' },
    { shortName: 'Source Lines of Code (SLOC)', name: 'coderadar:size:sloc:java' },
    { shortName: 'Effective Lines of Code (ELOC)', name: 'coderadar:size:eloc:java' },
    { shortName: 'MagicNumber', name: 'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck' },
    { shortName: 'ReturnCount', name: 'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.ReturnCountCheck' },
    { shortName: 'CyclomaticComplexity', name: 'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck' },
    { shortName: 'JavaNCSS', name: 'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.JavaNCSSCheck' },
    { shortName: 'NPathComplexity', name: 'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.NPathComplexityCheck' },
    { shortName: 'ExecutableStatementCount', name: 'checkstyle:com.puppycrawl.tools.checkstyle.checks.sizes.ExecutableStatementCountCheck' },
];
// DEFAULT METRIC MAPPING
AppConfig.HEIGHT_METRIC_NAME = 'coderadar:size:loc:java';
AppConfig.GROUND_AREA_METRIC_NAME = __WEBPACK_IMPORTED_MODULE_0__environments_environment__["a" /* environment */].demo ? 'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck' : 'coderadar:size:sloc:java';
AppConfig.COLOR_METRIC_NAME = __WEBPACK_IMPORTED_MODULE_0__environments_environment__["a" /* environment */].demo ? 'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck' : 'coderadar:size:eloc:java';
// VISUALIZATION SETTINGS
AppConfig.GROUND_AREA_FACTOR = 0.1;
AppConfig.HEIGHT_FACTOR = 0.1;
AppConfig.GLOBAL_MAX_GROUND_AREA = 100;
AppConfig.GLOBAL_MIN_GROUND_AREA = 1;
AppConfig.GLOBAL_MAX_HEIGHT = 100;
AppConfig.GLOBAL_MIN_HEIGHT = 1;
AppConfig.BLOCK_SPACING = 5;
AppConfig.DEFAULT_BLOCK_HEIGHT = 0.2;
AppConfig.SCREEN_PADDING = 0;
// CAMERA SETTINGS
AppConfig.CAMERA_NEAR = 0.1;
AppConfig.CAMERA_FAR = 10000;
AppConfig.CAMERA_DISTANCE_TO_FOCUSSED_ELEMENT = 100;
AppConfig.CAMERA_START_POSITION = {
    x: 100, y: 50, z: 200
};
AppConfig.CAMERA_ANIMATION_DURATION = 1500;
// COLORS
AppConfig.COLOR_HIERARCHY_RANGE = ['#cccccc', '#525252'];
AppConfig.COLOR_HEATMAP_RANGE = ['#ffffff', '#ffc905', '#f78400', '#e92100', '#9b1909', '#4f1609', '#5d0000'];
AppConfig.COLOR_CONNECTION = '#000000';
AppConfig.COLOR_FIRST_COMMIT = '#0e8cf3';
AppConfig.COLOR_SECOND_COMMIT = '#ffb100';
AppConfig.COLOR_ADDED_FILE = '#49c35c';
AppConfig.COLOR_DELETED_FILE = '#d90206';
AppConfig.COLOR_UNCHANGED_FILE = '#cccccc';
//# sourceMappingURL=AppConfig.js.map

/***/ }),

/***/ 297:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 297;


/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(36);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_mocks_mock_data__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular_in_memory_web_api__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(36);
/* harmony export (immutable) */ __webpack_exports__["a"] = XHRBackendFactory;




function XHRBackendFactory(injector, browser, xsrf, options) {
    if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].demo) {
        return new __WEBPACK_IMPORTED_MODULE_2_angular_in_memory_web_api__["a" /* InMemoryBackendService */](injector, new __WEBPACK_IMPORTED_MODULE_1__service_mocks_mock_data__["a" /* MockData */](), {});
    }
    else {
        return new __WEBPACK_IMPORTED_MODULE_0__angular_http__["XHRBackend"](browser, options, xsrf);
    }
}
//# sourceMappingURL=XHRBackendFactory.js.map

/***/ }),

/***/ 326:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(451),
        styles: [__webpack_require__(421)]
    }),
    __metadata("design:paramtypes", [])
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__control_panel_control_panel_module__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__visualization_visualization_module__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_reducers__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngrx_store__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ngrx_effects__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ngrx_store_devtools__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__shared_effects__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__XHRBackendFactory__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__service_screenshot_service__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__service_focus_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__service_tooltip_service__ = __webpack_require__(84);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["HttpModule"],
            __WEBPACK_IMPORTED_MODULE_5__control_panel_control_panel_module__["a" /* ControlPanelModule */],
            __WEBPACK_IMPORTED_MODULE_6__visualization_visualization_module__["a" /* VisualizationModule */],
            __WEBPACK_IMPORTED_MODULE_8__ngrx_store__["a" /* StoreModule */].provideStore(__WEBPACK_IMPORTED_MODULE_7__shared_reducers__["a" /* reducer */]),
            __WEBPACK_IMPORTED_MODULE_9__ngrx_effects__["a" /* EffectsModule */].run(__WEBPACK_IMPORTED_MODULE_11__shared_effects__["a" /* AppEffects */]),
            __WEBPACK_IMPORTED_MODULE_10__ngrx_store_devtools__["a" /* StoreDevtoolsModule */].instrumentOnlyWithExtension()
        ],
        providers: [
            {
                provide: __WEBPACK_IMPORTED_MODULE_3__angular_http__["XHRBackend"],
                useFactory: __WEBPACK_IMPORTED_MODULE_12__XHRBackendFactory__["a" /* XHRBackendFactory */],
                deps: [__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injector"], __WEBPACK_IMPORTED_MODULE_3__angular_http__["BrowserXhr"], __WEBPACK_IMPORTED_MODULE_3__angular_http__["XSRFStrategy"], __WEBPACK_IMPORTED_MODULE_3__angular_http__["ResponseOptions"]]
            },
            __WEBPACK_IMPORTED_MODULE_13__service_screenshot_service__["a" /* ScreenShotService */],
            __WEBPACK_IMPORTED_MODULE_14__service_focus_service__["a" /* FocusService */],
            __WEBPACK_IMPORTED_MODULE_15__service_tooltip_service__["a" /* TooltipService */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 328:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AutosuggestWrapperComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AutosuggestWrapperComponent = (function () {
    function AutosuggestWrapperComponent() {
        this.valueChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    AutosuggestWrapperComponent.prototype.ngOnInit = function () {
    };
    AutosuggestWrapperComponent.prototype.handleClearInputClicked = function () {
        this.model = null;
        this.inputElement.nativeElement.focus();
    };
    AutosuggestWrapperComponent.prototype.handleValueChanged = function (chosenModel) {
        this.valueChanged.emit(chosenModel);
    };
    return AutosuggestWrapperComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('inputElement'),
    __metadata("design:type", Object)
], AutosuggestWrapperComponent.prototype, "inputElement", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AutosuggestWrapperComponent.prototype, "model", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AutosuggestWrapperComponent.prototype, "source", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], AutosuggestWrapperComponent.prototype, "placeholder", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], AutosuggestWrapperComponent.prototype, "noMatchFoundText", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], AutosuggestWrapperComponent.prototype, "matchFormatted", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], AutosuggestWrapperComponent.prototype, "valuePropertyName", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], AutosuggestWrapperComponent.prototype, "displayPropertyName", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AutosuggestWrapperComponent.prototype, "valueFormatter", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AutosuggestWrapperComponent.prototype, "listFormatter", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], AutosuggestWrapperComponent.prototype, "valueChanged", void 0);
AutosuggestWrapperComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-autosuggest-wrapper',
        template: __webpack_require__(452),
        styles: [__webpack_require__(422)]
    }),
    __metadata("design:paramtypes", [])
], AutosuggestWrapperComponent);

//# sourceMappingURL=autosuggest-wrapper.component.js.map

/***/ }),

/***/ 329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interfaces_ICommit__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interfaces_ICommit___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__interfaces_ICommit__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enum_CommitType__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommitChooserComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CommitChooserComponent = (function () {
    function CommitChooserComponent() {
        this.changeCommit = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    CommitChooserComponent.prototype.ngOnInit = function () {
    };
    CommitChooserComponent.prototype.handleCommitChanged = function (chosenModel) {
        this.changeCommit.emit({ commitType: this.commitType, commit: chosenModel });
    };
    CommitChooserComponent.prototype.formatCommit = function (data) {
        var formattedDateAndTime = __WEBPACK_IMPORTED_MODULE_3_moment__(data.timestamp).format('DD.MM.YYYY HH:mm');
        return formattedDateAndTime + ", " + data.author + ", " + data.name.substr(0, 7);
    };
    return CommitChooserComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__enum_CommitType__["a" /* CommitType */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__enum_CommitType__["a" /* CommitType */]) === "function" && _a || Object)
], CommitChooserComponent.prototype, "commitType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], CommitChooserComponent.prototype, "commits", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__interfaces_ICommit__["ICommit"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__interfaces_ICommit__["ICommit"]) === "function" && _b || Object)
], CommitChooserComponent.prototype, "selected", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], CommitChooserComponent.prototype, "loading", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], CommitChooserComponent.prototype, "changeCommit", void 0);
CommitChooserComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-commit-chooser',
        template: __webpack_require__(453),
        styles: [__webpack_require__(423)]
    }),
    __metadata("design:paramtypes", [])
], CommitChooserComponent);

var _a, _b;
//# sourceMappingURL=commit-chooser.component.js.map

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeType; });
var NodeType;
(function (NodeType) {
    NodeType[NodeType["MODULE"] = 'MODULE'] = "MODULE";
    NodeType[NodeType["FILE"] = 'FILE'] = "FILE";
    NodeType[NodeType["CONNECTION"] = 'CONNECTION'] = "CONNECTION";
})(NodeType || (NodeType = {}));
//# sourceMappingURL=NodeType.js.map

/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enum_CommitType__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_reducers__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__control_panel_actions__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_screenshot_service__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_focus_service__ = __webpack_require__(57);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ControlPanelComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ControlPanelComponent = (function () {
    function ControlPanelComponent(store, screenShotService, focusService) {
        this.store = store;
        this.screenShotService = screenShotService;
        this.focusService = focusService;
        this.commitTypes = {
            left: __WEBPACK_IMPORTED_MODULE_1__enum_CommitType__["a" /* CommitType */].LEFT,
            right: __WEBPACK_IMPORTED_MODULE_1__enum_CommitType__["a" /* CommitType */].RIGHT
        };
    }
    ControlPanelComponent.prototype.ngOnInit = function () {
        this.store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__control_panel_actions__["k" /* loadCommits */])());
        this.commits$ = this.store.select(__WEBPACK_IMPORTED_MODULE_3__shared_reducers__["k" /* getCommits */]);
        this.commitsLoading$ = this.store.select(__WEBPACK_IMPORTED_MODULE_3__shared_reducers__["l" /* getCommitsLoading */]);
        this.leftCommit$ = this.store.select(__WEBPACK_IMPORTED_MODULE_3__shared_reducers__["i" /* getLeftCommit */]);
        this.rightCommit$ = this.store.select(__WEBPACK_IMPORTED_MODULE_3__shared_reducers__["j" /* getRightCommit */]);
        this.uniqueFileList$ = this.store.select(__WEBPACK_IMPORTED_MODULE_3__shared_reducers__["m" /* getUniqueFileList */]);
        this.activeViewType$ = this.store.select(__WEBPACK_IMPORTED_MODULE_3__shared_reducers__["g" /* getActiveViewType */]);
        this.screenShots$ = this.screenShotService.getScreenShots();
    };
    ControlPanelComponent.prototype.handleCommitChanged = function (payload) {
        this.store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__control_panel_actions__["l" /* changeCommit */])(payload.commitType, payload.commit));
    };
    ControlPanelComponent.prototype.handleSearchStarted = function (chosenItem) {
        this.focusService.focusElement(chosenItem);
    };
    ControlPanelComponent.prototype.handleTakeScreenshot = function () {
        this.screenShotService.requestScreenShot();
    };
    ControlPanelComponent.prototype.handleRemoveScreenshots = function () {
        this.screenShotService.clearScreenShots();
    };
    return ControlPanelComponent;
}());
ControlPanelComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-control-panel',
        template: __webpack_require__(454),
        styles: [__webpack_require__(424)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["b" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["b" /* Store */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__service_screenshot_service__["a" /* ScreenShotService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__service_screenshot_service__["a" /* ScreenShotService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__service_focus_service__["a" /* FocusService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__service_focus_service__["a" /* FocusService */]) === "function" && _c || Object])
], ControlPanelComponent);

var _a, _b, _c;
//# sourceMappingURL=control-panel.component.js.map

/***/ }),

/***/ 331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__control_panel_component__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_settings_component__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__settings_view_control_view_control_component__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngui_auto_complete__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngui_auto_complete___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__ngui_auto_complete__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__commit_chooser_commit_chooser_component__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__service_commit_service__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__environments_environment__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__service_mocks_commit_mock_service__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__search_search_component__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__settings_filter_filter_component__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__settings_metric_mapping_metric_mapping_component__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__screenshot_screenshot_component__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__autosuggest_wrapper_autosuggest_wrapper_component__ = __webpack_require__(328);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ControlPanelModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var ControlPanelModule = (function () {
    function ControlPanelModule() {
    }
    return ControlPanelModule;
}());
ControlPanelModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_5__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_6__ngui_auto_complete__["NguiAutoCompleteModule"]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__control_panel_component__["a" /* ControlPanelComponent */],
            __WEBPACK_IMPORTED_MODULE_3__settings_settings_component__["a" /* SettingsComponent */],
            __WEBPACK_IMPORTED_MODULE_4__settings_view_control_view_control_component__["a" /* ViewControlComponent */],
            __WEBPACK_IMPORTED_MODULE_7__commit_chooser_commit_chooser_component__["a" /* CommitChooserComponent */],
            __WEBPACK_IMPORTED_MODULE_11__search_search_component__["a" /* SearchComponent */],
            __WEBPACK_IMPORTED_MODULE_12__settings_filter_filter_component__["a" /* FilterComponent */],
            __WEBPACK_IMPORTED_MODULE_13__settings_metric_mapping_metric_mapping_component__["a" /* MetricMappingComponent */],
            __WEBPACK_IMPORTED_MODULE_14__screenshot_screenshot_component__["a" /* ScreenshotComponent */],
            __WEBPACK_IMPORTED_MODULE_15__autosuggest_wrapper_autosuggest_wrapper_component__["a" /* AutosuggestWrapperComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__control_panel_component__["a" /* ControlPanelComponent */]
        ],
        providers: [
            {
                provide: __WEBPACK_IMPORTED_MODULE_8__service_commit_service__["a" /* CommitService */],
                useClass: __WEBPACK_IMPORTED_MODULE_9__environments_environment__["a" /* environment */].demo ? __WEBPACK_IMPORTED_MODULE_10__service_mocks_commit_mock_service__["a" /* CommitMockService */] : __WEBPACK_IMPORTED_MODULE_8__service_commit_service__["a" /* CommitService */]
            }
        ]
    })
], ControlPanelModule);

//# sourceMappingURL=control-panel.module.js.map

/***/ }),

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__control_panel_actions__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enum_CommitType__ = __webpack_require__(82);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ControlPanelReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getCommits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getCommitsLoading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getLeftCommit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getRightCommit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getScreenshots; });


var initialState = {
    commits: [],
    commitsLoading: false,
    leftCommit: null,
    rightCommit: null,
    screenshots: []
};
var ControlPanelReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    var newState;
    switch (action.type) {
        case __WEBPACK_IMPORTED_MODULE_0__control_panel_actions__["c" /* LOAD_COMMITS */]:
            newState = Object.assign({}, state);
            newState.commitsLoading = true;
            return newState;
        case __WEBPACK_IMPORTED_MODULE_0__control_panel_actions__["d" /* LOAD_COMMITS_SUCCESS */]:
            newState = Object.assign({}, state);
            newState.commits = action.payload;
            newState.commitsLoading = false;
            newState.leftCommit = newState.commits[0];
            newState.rightCommit = newState.commits[1];
            return newState;
        case __WEBPACK_IMPORTED_MODULE_0__control_panel_actions__["e" /* LOAD_COMMITS_ERROR */]:
            newState = Object.assign({}, state);
            newState.commitsLoading = false;
            console.error("Error while loading commits: " + action.payload);
            return state;
        case __WEBPACK_IMPORTED_MODULE_0__control_panel_actions__["f" /* CHANGE_COMMIT */]:
            newState = Object.assign({}, state);
            if (action.payload.commitType === __WEBPACK_IMPORTED_MODULE_1__enum_CommitType__["a" /* CommitType */].LEFT) {
                newState.leftCommit = action.payload.commit;
            }
            else if (action.payload.commitType === __WEBPACK_IMPORTED_MODULE_1__enum_CommitType__["a" /* CommitType */].RIGHT) {
                newState.rightCommit = action.payload.commit;
            }
            else {
                throw new Error("Invalid CommitType " + action.payload.commitType + "!");
            }
            return newState;
        case __WEBPACK_IMPORTED_MODULE_0__control_panel_actions__["g" /* ADD_SCREENSHOT */]:
            newState = Object.assign({}, state);
            newState.screenshots = state.screenshots.concat([action.payload]);
            return newState;
        case __WEBPACK_IMPORTED_MODULE_0__control_panel_actions__["h" /* CLEAR_SCREENSHOTS */]:
            newState = Object.assign({}, state);
            newState.screenshots = [];
            return newState;
        default:
            return state;
    }
};
var getCommits = function (state) { return state.commits; };
var getCommitsLoading = function (state) { return state.commitsLoading; };
var getLeftCommit = function (state) { return state.leftCommit; };
var getRightCommit = function (state) { return state.rightCommit; };
var getScreenshots = function (state) { return state.screenshots; };
//# sourceMappingURL=control-panel.reducers.js.map

/***/ }),

/***/ 333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enum_ScreenType__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enum_ViewType__ = __webpack_require__(39);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScreenshotComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ScreenshotComponent = (function () {
    function ScreenshotComponent() {
        this.handleTakeScreenshot = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.handleRemoveScreenshots = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.screenTypes = {
            left: __WEBPACK_IMPORTED_MODULE_1__enum_ScreenType__["a" /* ScreenType */].LEFT,
            right: __WEBPACK_IMPORTED_MODULE_1__enum_ScreenType__["a" /* ScreenType */].RIGHT
        };
        this.viewTypes = {
            split: __WEBPACK_IMPORTED_MODULE_2__enum_ViewType__["a" /* ViewType */].SPLIT,
            merged: __WEBPACK_IMPORTED_MODULE_2__enum_ViewType__["a" /* ViewType */].MERGED
        };
        this.isGenerating = false;
    }
    ScreenshotComponent.prototype.ngOnInit = function () {
        // prevent bootstrap dropdown from being closed by clicking on its content
        $(document).on('click', '#screenshot-dropdown', function (e) {
            e.stopPropagation();
        });
    };
    ScreenshotComponent.prototype.takeScreenshot = function () {
        this.handleTakeScreenshot.emit();
    };
    ScreenshotComponent.prototype.generateGif = function (screenType) {
        var _this = this;
        if (this.screenShots.length > 0) {
            var images = this.screenShots.filter(function (screenShotObject) { return screenShotObject.screenType === screenType; }).map(function (screenShotObject) { return screenShotObject.file; });
            if (!images.length) {
                return;
            }
            this.isGenerating = true;
            gifshot.createGIF({
                images: images,
                interval: 1,
                gifWidth: this.activeViewType === __WEBPACK_IMPORTED_MODULE_2__enum_ViewType__["a" /* ViewType */].SPLIT ? window.innerWidth / 2 : window.innerWidth,
                gifHeight: window.innerHeight
            }, function (obj) {
                if (!obj.error) {
                    _this.gifSource = obj.image;
                }
                _this.isGenerating = false;
            });
        }
        else {
            alert("Es wurden keine gespeicherten Screenshots gefunden.");
        }
    };
    ScreenshotComponent.prototype.removeScreenshots = function () {
        this.handleRemoveScreenshots.emit();
        this.gifSource = undefined;
    };
    return ScreenshotComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__enum_ViewType__["a" /* ViewType */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__enum_ViewType__["a" /* ViewType */]) === "function" && _a || Object)
], ScreenshotComponent.prototype, "activeViewType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], ScreenshotComponent.prototype, "screenShots", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], ScreenshotComponent.prototype, "handleTakeScreenshot", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], ScreenshotComponent.prototype, "handleRemoveScreenshots", void 0);
ScreenshotComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-screenshot',
        template: __webpack_require__(455),
        styles: [__webpack_require__(425)]
    })
], ScreenshotComponent);

var _a;
//# sourceMappingURL=screenshot.component.js.map

/***/ }),

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SearchComponent = (function () {
    function SearchComponent() {
        this.uniqueFileList = [];
        this.startSearch = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    SearchComponent.prototype.ngOnInit = function () {
    };
    SearchComponent.prototype.handleSearchChanged = function (chosenItem) {
        this.startSearch.emit(chosenItem);
    };
    SearchComponent.prototype.autocompleteListFormatter = function (data) {
        return data;
    };
    return SearchComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], SearchComponent.prototype, "uniqueFileList", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], SearchComponent.prototype, "startSearch", void 0);
SearchComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-search',
        template: __webpack_require__(456),
        styles: [__webpack_require__(426)]
    }),
    __metadata("design:paramtypes", [])
], SearchComponent);

//# sourceMappingURL=search.component.js.map

/***/ }),

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_interfaces_IFilter__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_interfaces_IFilter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_app_interfaces_IFilter__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FilterComponent = (function () {
    function FilterComponent() {
        this.filterChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    FilterComponent.prototype.ngOnInit = function () {
        // prevent bootstrap dropdown from being closed by clicking on its content
        $(document).on('click', '#filter-dropdown', function (e) {
            e.stopPropagation();
        });
    };
    FilterComponent.prototype.handleFilterChanged = function () {
        this.filterChanged.emit(this.activeFilter);
    };
    return FilterComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_app_interfaces_IFilter__["IFilter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_interfaces_IFilter__["IFilter"]) === "function" && _a || Object)
], FilterComponent.prototype, "activeFilter", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], FilterComponent.prototype, "filterChanged", void 0);
FilterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-filter',
        template: __webpack_require__(457),
        styles: [__webpack_require__(427)]
    }),
    __metadata("design:paramtypes", [])
], FilterComponent);

var _a;
//# sourceMappingURL=filter.component.js.map

/***/ }),

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interfaces_IMetricMapping__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interfaces_IMetricMapping___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__interfaces_IMetricMapping__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helper_metric_name_helper__ = __webpack_require__(56);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MetricMappingComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MetricMappingComponent = (function () {
    function MetricMappingComponent() {
        this.metricMappingChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    MetricMappingComponent.prototype.ngOnInit = function () {
        this.metricNames = __WEBPACK_IMPORTED_MODULE_2__helper_metric_name_helper__["a" /* MetricNameHelper */].getAll();
        // prevent bootstrap dropdown from being closed by clicking on its content
        $(document).on('click', '#metric-mapping-dropdown', function (e) {
            // if the button is clicked, the popup does need to be closed, so exclude the button from this exception...
            if (e.target.tagName !== 'BUTTON') {
                e.stopPropagation();
            }
        });
    };
    MetricMappingComponent.prototype.applyMetricMappings = function () {
        this.metricMappingChanged.emit();
    };
    return MetricMappingComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__interfaces_IMetricMapping__["IMetricMapping"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__interfaces_IMetricMapping__["IMetricMapping"]) === "function" && _a || Object)
], MetricMappingComponent.prototype, "metricMapping", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], MetricMappingComponent.prototype, "metricMappingChanged", void 0);
MetricMappingComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-metric-mapping',
        template: __webpack_require__(458),
        styles: [__webpack_require__(428)]
    }),
    __metadata("design:paramtypes", [])
], MetricMappingComponent);

var _a;
//# sourceMappingURL=metric-mapping.component.js.map

/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_reducers__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_actions__ = __webpack_require__(80);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SettingsComponent = (function () {
    function SettingsComponent(store) {
        this.store = store;
    }
    SettingsComponent.prototype.ngOnInit = function () {
        this.activeViewType$ = this.store.select(__WEBPACK_IMPORTED_MODULE_2__shared_reducers__["g" /* getActiveViewType */]);
        this.activeFilter$ = this.store.select(__WEBPACK_IMPORTED_MODULE_2__shared_reducers__["h" /* getActiveFilter */]);
        this.metricMapping$ = this.store.select(__WEBPACK_IMPORTED_MODULE_2__shared_reducers__["d" /* getMetricMapping */]);
    };
    SettingsComponent.prototype.handleViewTypeChanged = function (viewType) {
        this.store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__settings_actions__["d" /* changeViewType */])(viewType));
    };
    SettingsComponent.prototype.handleFilterChanged = function (filter) {
        this.store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__settings_actions__["e" /* changeActiveFilter */])(filter));
    };
    SettingsComponent.prototype.handleMetricMappingChanged = function (metricMapping) {
        this.store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__settings_actions__["f" /* setMetricMapping */])(metricMapping));
    };
    return SettingsComponent;
}());
SettingsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-settings',
        template: __webpack_require__(459),
        styles: [__webpack_require__(429)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["b" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["b" /* Store */]) === "function" && _a || Object])
], SettingsComponent);

var _a;
//# sourceMappingURL=settings.component.js.map

/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_actions__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enum_ViewType__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AppConfig__ = __webpack_require__(20);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getActiveViewType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getActiveFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getMetricMapping; });



var initialState = {
    activeViewType: __WEBPACK_IMPORTED_MODULE_1__enum_ViewType__["a" /* ViewType */].SPLIT,
    activeFilter: {
        unchanged: true,
        changed: true,
        deleted: true,
        added: true,
        moved: true
    },
    metricMapping: {
        heightMetricName: __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].HEIGHT_METRIC_NAME,
        groundAreaMetricName: __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].GROUND_AREA_METRIC_NAME,
        colorMetricName: __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].COLOR_METRIC_NAME
    }
};
var SettingsReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    var newState;
    switch (action.type) {
        case __WEBPACK_IMPORTED_MODULE_0__settings_actions__["a" /* CHANGE_VIEW_TYPE */]:
            newState = Object.assign({}, state);
            newState.activeViewType = action.payload;
            return newState;
        case __WEBPACK_IMPORTED_MODULE_0__settings_actions__["b" /* CHANGE_ACTIVE_FILTER */]:
            newState = Object.assign({}, state);
            newState.activeFilter = Object.assign({}, state.activeFilter, action.payload);
            return newState;
        case __WEBPACK_IMPORTED_MODULE_0__settings_actions__["c" /* SET_METRIC_MAPPING */]:
            newState = Object.assign({}, state);
            newState.metricMapping = Object.assign({}, state.metricMapping, action.payload);
            return newState;
        default:
            return state;
    }
};
var getActiveViewType = function (state) { return state.activeViewType; };
var getActiveFilter = function (state) { return state.activeFilter; };
var getMetricMapping = function (state) { return state.metricMapping; };
//# sourceMappingURL=settings.reducers.js.map

/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enum_ViewType__ = __webpack_require__(39);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewControlComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ViewControlComponent = (function () {
    function ViewControlComponent() {
        this.viewTypes = {
            split: __WEBPACK_IMPORTED_MODULE_1__enum_ViewType__["a" /* ViewType */].SPLIT,
            merged: __WEBPACK_IMPORTED_MODULE_1__enum_ViewType__["a" /* ViewType */].MERGED
        };
        this.viewTypeChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    ViewControlComponent.prototype.ngOnInit = function () {
    };
    ViewControlComponent.prototype.changeViewType = function (value) {
        this.viewTypeChanged.emit(value === 0 ? __WEBPACK_IMPORTED_MODULE_1__enum_ViewType__["a" /* ViewType */].SPLIT : __WEBPACK_IMPORTED_MODULE_1__enum_ViewType__["a" /* ViewType */].MERGED);
    };
    return ViewControlComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__enum_ViewType__["a" /* ViewType */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__enum_ViewType__["a" /* ViewType */]) === "function" && _a || Object)
], ViewControlComponent.prototype, "activeViewType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], ViewControlComponent.prototype, "viewTypeChanged", void 0);
ViewControlComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-view-control',
        template: __webpack_require__(460),
        styles: [__webpack_require__(430)]
    }),
    __metadata("design:paramtypes", [])
], ViewControlComponent);

var _a;
//# sourceMappingURL=view-control.component.js.map

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScreenType; });
var ScreenType;
(function (ScreenType) {
    ScreenType[ScreenType["LEFT"] = 0] = "LEFT";
    ScreenType[ScreenType["RIGHT"] = 1] = "RIGHT";
})(ScreenType || (ScreenType = {}));
//# sourceMappingURL=ScreenType.js.map

/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AppConfig__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enum_NodeType__ = __webpack_require__(33);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlockConnection; });



var BlockConnection = (function () {
    function BlockConnection(fromElement, toElement) {
        var from = fromElement.position.clone();
        from.x += fromElement.scale.x / 2;
        from.y += fromElement.scale.y;
        from.z += fromElement.scale.z / 2;
        var to = toElement.position.clone();
        to.x += toElement.scale.x / 2;
        to.y += toElement.scale.y;
        to.z += toElement.scale.z / 2;
        var distance = from.distanceTo(to);
        var via = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector3"]((from.x + to.x) / 2, this.getHeightByDistance(distance), (from.z + to.z) / 2);
        var curve = new __WEBPACK_IMPORTED_MODULE_0_three__["QuadraticBezierCurve3"](from, via, to);
        var geometry = new __WEBPACK_IMPORTED_MODULE_0_three__["Geometry"]();
        geometry.vertices = curve.getPoints(50);
        var material = new __WEBPACK_IMPORTED_MODULE_0_three__["LineBasicMaterial"]({ color: __WEBPACK_IMPORTED_MODULE_1__AppConfig__["a" /* AppConfig */].COLOR_CONNECTION });
        this.curveObject = new __WEBPACK_IMPORTED_MODULE_0_three__["Line"](geometry, material);
        this.curveObject.userData = {
            type: __WEBPACK_IMPORTED_MODULE_2__enum_NodeType__["a" /* NodeType */].CONNECTION,
            changeTypes: {
                moved: true
            }
        };
    }
    BlockConnection.prototype.getCurve = function () {
        return this.curveObject;
    };
    BlockConnection.prototype.getHeightByDistance = function (distance) {
        return 0.0001 * Math.pow(distance, 2) + 0.8 * distance + 30;
    };
    return BlockConnection;
}());

//# sourceMappingURL=block-connection.js.map

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Block; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var geometry = new __WEBPACK_IMPORTED_MODULE_0_three__["BoxGeometry"](1, 1, 1);
// move local coordinate system to scale the block properly
geometry.translate(0.5, 0.5, 0.5);
var Block = (function (_super) {
    __extends(Block, _super);
    function Block(color, name) {
        var _this = this;
        var material = new __WEBPACK_IMPORTED_MODULE_0_three__["MeshLambertMaterial"]({ color: color });
        _this = _super.call(this, geometry, material) || this;
        _this.name = name;
        return _this;
    }
    return Block;
}(__WEBPACK_IMPORTED_MODULE_0_three__["Mesh"]));

//# sourceMappingURL=block.js.map

/***/ }),

/***/ 342:
/***/ (function(module, exports) {

//# sourceMappingURL=ICommit.js.map

/***/ }),

/***/ 343:
/***/ (function(module, exports) {

//# sourceMappingURL=IMetricMapping.js.map

/***/ }),

/***/ 344:
/***/ (function(module, exports) {

//# sourceMappingURL=INode.js.map

/***/ }),

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeyValuePipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var KeyValuePipe = (function () {
    function KeyValuePipe() {
    }
    KeyValuePipe.prototype.transform = function (value, args) {
        if (!value) {
            return undefined;
        }
        var keys = [];
        for (var key in value) {
            keys.push({ key: key, value: value[key] });
        }
        return keys;
    };
    return KeyValuePipe;
}());
KeyValuePipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'keyValue',
        pure: false
    })
], KeyValuePipe);

//# sourceMappingURL=key-value.pipe.js.map

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(19);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommitMockService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CommitMockService = (function () {
    function CommitMockService(http) {
        this.http = http;
    }
    CommitMockService.prototype.loadCommits = function () {
        return this.http.get('api/commits')
            .map(function (res) {
            var mockedResponse = {
                _embedded: {
                    commitResourceList: res.json().data
                }
            };
            return mockedResponse;
        });
    };
    return CommitMockService;
}());
CommitMockService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], CommitMockService);

var _a;
//# sourceMappingURL=commit-mock.service.js.map

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(19);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MetricMockService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MetricMockService = (function () {
    function MetricMockService(http) {
        this.http = http;
    }
    MetricMockService.prototype.loadDeltaTree = function (leftCommit, rightCommit, metricMapping) {
        return this.http.get('api/metrics')
            .map(function (res) {
            var mockedResponse = {
                rootNode: res.json().data
            };
            return mockedResponse;
        });
    };
    return MetricMockService;
}());
MetricMockService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], MetricMockService);

var _a;
//# sourceMappingURL=metric-mock.service.js.map

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MockData; });
var MockData = (function () {
    function MockData() {
    }
    MockData.prototype.createDb = function () {
        var commits = [
            { name: 'da39a3ee5e6b4b0d3255bfef95601890afd80709', author: 'John Doe', timestamp: 1491897949000, analyzed: true },
            { name: 'd6cd1e2bd19e03a81132a23b2025920577f84e37', author: 'Joe Smith', timestamp: 1491909062000, analyzed: true },
            { name: '9bedf67800b2923982bdf60c89c57ce6fd2d9a1c', author: 'John Doe', timestamp: 1491926159000, analyzed: true }
        ];
        var metrics = {
            'name': 'root',
            'type': 'MODULE',
            'commit1Metrics': {
                'coderadar:size:loc:java': 453,
                'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck': 15,
                'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck': 5
            },
            'commit2Metrics': {
                'coderadar:size:loc:java': 155,
                'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck': 2,
                'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck': 4
            },
            'renamedFrom': null,
            'renamedTo': null,
            'changes': null,
            'children': [
                {
                    'name': 'AddedAndRemovedFiles.java',
                    'type': 'MODULE',
                    'commit1Metrics': {
                        'coderadar:size:loc:java': 453,
                        'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck': 15,
                        'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck': 5
                    },
                    'commit2Metrics': {
                        'coderadar:size:loc:java': 155,
                        'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck': 2,
                        'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck': 4
                    },
                    'renamedFrom': null,
                    'renamedTo': null,
                    'changes': null,
                    'children': [
                        {
                            'name': 'OnlyLeft.java',
                            'type': 'FILE',
                            'commit1Metrics': {
                                'coderadar:size:loc:java': 453,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck': 15,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck': 5
                            },
                            'commit2Metrics': null,
                            'renamedFrom': null,
                            'renamedTo': null,
                            'changes': {
                                'renamed': false,
                                'modified': false,
                                'deleted': true,
                                'added': false
                            },
                            'children': []
                        },
                        {
                            'name': 'OnlyRight.java',
                            'type': 'FILE',
                            'commit1Metrics': null,
                            'commit2Metrics': {
                                'coderadar:size:loc:java': 155,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck': 2,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck': 4
                            },
                            'renamedFrom': null,
                            'renamedTo': null,
                            'changes': {
                                'renamed': false,
                                'modified': false,
                                'deleted': false,
                                'added': true
                            },
                            'children': []
                        }
                    ]
                },
                {
                    'name': 'ChangedAndUnchangedFiles.java',
                    'type': 'MODULE',
                    'commit1Metrics': {
                        'coderadar:size:loc:java': 100,
                        'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck': 100,
                        'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck': 100
                    },
                    'commit2Metrics': {
                        'coderadar:size:loc:java': 100,
                        'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck': 100,
                        'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck': 100
                    },
                    'renamedFrom': null,
                    'renamedTo': null,
                    'changes': null,
                    'children': [
                        {
                            'name': 'Smaller.java',
                            'type': 'FILE',
                            'commit1Metrics': {
                                'coderadar:size:loc:java': 475,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck': 1,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck': 1
                            },
                            'commit2Metrics': {
                                'coderadar:size:loc:java': 345,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck': 1,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck': 1
                            },
                            'renamedFrom': null,
                            'renamedTo': null,
                            'changes': {
                                'renamed': false,
                                'modified': true,
                                'deleted': false,
                                'added': false
                            },
                            'children': []
                        },
                        {
                            'name': 'Bigger.java',
                            'type': 'FILE',
                            'commit1Metrics': {
                                'coderadar:size:loc:java': 75,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck': 1,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck': 1
                            },
                            'commit2Metrics': {
                                'coderadar:size:loc:java': 121,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck': 1,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck': 2
                            },
                            'renamedFrom': null,
                            'renamedTo': null,
                            'changes': {
                                'renamed': false,
                                'modified': true,
                                'deleted': false,
                                'added': false
                            },
                            'children': []
                        },
                        {
                            'name': 'Untouched.java',
                            'type': 'FILE',
                            'commit1Metrics': {
                                'coderadar:size:loc:java': 51,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck': 12,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck': 1
                            },
                            'commit2Metrics': {
                                'coderadar:size:loc:java': 51,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck': 12,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck': 1
                            },
                            'renamedFrom': null,
                            'renamedTo': null,
                            'changes': {
                                'renamed': false,
                                'modified': false,
                                'deleted': false,
                                'added': false
                            },
                            'children': []
                        }
                    ]
                }
            ]
        };
        return { commits: commits, metrics: metrics };
    };
    return MockData;
}());

//# sourceMappingURL=mock-data.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__control_panel_control_panel_actions__ = __webpack_require__(55);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__control_panel_control_panel_actions__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__control_panel_control_panel_actions__["i"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__control_panel_control_panel_actions__["j"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__control_panel_settings_settings_actions__ = __webpack_require__(80);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__visualization_visualization_actions__ = __webpack_require__(85);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__visualization_visualization_actions__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_2__visualization_visualization_actions__["e"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_2__visualization_visualization_actions__["f"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_2__visualization_visualization_actions__["g"]; });



//# sourceMappingURL=actions.js.map

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect__ = __webpack_require__(467);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_reselect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__control_panel_control_panel_reducers__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__control_panel_settings_settings_reducers__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__visualization_visualization_reducers__ = __webpack_require__(361);
/* harmony export (immutable) */ __webpack_exports__["a"] = reducer;
/* unused harmony export getControlPanelState */
/* unused harmony export getVisualizationState */
/* unused harmony export getSettingsState */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return getCommitsLoading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return getCommits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return getLeftCommit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return getRightCommit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getScreenshots; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getMetricsLoading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getMetricTree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return getUniqueFileList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getMetricMapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return getActiveFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getActiveViewType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getLeftAndRightCommit; });





var reducers = {
    controlPanelState: __WEBPACK_IMPORTED_MODULE_2__control_panel_control_panel_reducers__["a" /* ControlPanelReducer */],
    settingsState: __WEBPACK_IMPORTED_MODULE_3__control_panel_settings_settings_reducers__["a" /* SettingsReducer */],
    visualizationState: __WEBPACK_IMPORTED_MODULE_4__visualization_visualization_reducers__["a" /* VisualizationReducer */]
};
var combined = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__ngrx_store__["c" /* combineReducers */])(reducers);
function reducer(state, action) {
    return combined(state, action);
}
var getControlPanelState = function (state) { return state.controlPanelState; };
var getVisualizationState = function (state) { return state.visualizationState; };
var getSettingsState = function (state) { return state.settingsState; };
var getCommitsLoading = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(getControlPanelState, __WEBPACK_IMPORTED_MODULE_2__control_panel_control_panel_reducers__["b" /* getCommitsLoading */]);
var getCommits = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(getControlPanelState, __WEBPACK_IMPORTED_MODULE_2__control_panel_control_panel_reducers__["c" /* getCommits */]);
var getLeftCommit = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(getControlPanelState, __WEBPACK_IMPORTED_MODULE_2__control_panel_control_panel_reducers__["d" /* getLeftCommit */]);
var getRightCommit = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(getControlPanelState, __WEBPACK_IMPORTED_MODULE_2__control_panel_control_panel_reducers__["e" /* getRightCommit */]);
var getScreenshots = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(getControlPanelState, __WEBPACK_IMPORTED_MODULE_2__control_panel_control_panel_reducers__["f" /* getScreenshots */]);
var getMetricsLoading = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(getVisualizationState, __WEBPACK_IMPORTED_MODULE_4__visualization_visualization_reducers__["b" /* getMetricsLoading */]);
var getMetricTree = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(getVisualizationState, __WEBPACK_IMPORTED_MODULE_4__visualization_visualization_reducers__["c" /* getMetricTree */]);
var getUniqueFileList = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(getVisualizationState, __WEBPACK_IMPORTED_MODULE_4__visualization_visualization_reducers__["d" /* getUniqueFileList */]);
var getMetricMapping = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(getSettingsState, __WEBPACK_IMPORTED_MODULE_3__control_panel_settings_settings_reducers__["b" /* getMetricMapping */]);
var getActiveFilter = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(getSettingsState, __WEBPACK_IMPORTED_MODULE_3__control_panel_settings_settings_reducers__["c" /* getActiveFilter */]);
var getActiveViewType = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(getSettingsState, __WEBPACK_IMPORTED_MODULE_3__control_panel_settings_settings_reducers__["d" /* getActiveViewType */]);
var getLeftAndRightCommit = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(getLeftCommit, getRightCommit, function (leftCommit, rightCommit) {
    if (leftCommit && rightCommit) {
        return {
            leftCommit: leftCommit,
            rightCommit: rightCommit
        };
    }
});
//# sourceMappingURL=reducers.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_effects__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_actions__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_commit_service__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_metric_service__ = __webpack_require__(131);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppEffects; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AppEffects = (function () {
    function AppEffects(actions$, commitService, metricService) {
        var _this = this;
        this.actions$ = actions$;
        this.commitService = commitService;
        this.metricService = metricService;
        this.loadCommitsEffects$ = this.actions$
            .ofType(__WEBPACK_IMPORTED_MODULE_3__shared_actions__["a" /* LOAD_COMMITS */])
            .switchMap(function () { return _this.commitService.loadCommits()
            .map(function (result) {
            return __WEBPACK_IMPORTED_MODULE_3__shared_actions__["b" /* loadCommitsSuccess */](result._embedded.commitResourceList);
        })
            .catch(function (response) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].of(__WEBPACK_IMPORTED_MODULE_3__shared_actions__["c" /* loadCommitsError */](response.error));
        }); });
        this.loadMetricTreeEffects$ = this.actions$
            .ofType(__WEBPACK_IMPORTED_MODULE_3__shared_actions__["d" /* LOAD_METRIC_TREE */])
            .map(function (action) { return action.payload; })
            .switchMap(function (payload) { return _this.metricService.loadDeltaTree(payload.leftCommit, payload.rightCommit, payload.metricMapping)
            .mergeMap(function (result) {
            return [
                __WEBPACK_IMPORTED_MODULE_3__shared_actions__["e" /* loadMetricTreeSuccess */](result.rootNode),
                __WEBPACK_IMPORTED_MODULE_3__shared_actions__["f" /* generateUniqueFileList */](result.rootNode)
            ];
        })
            .catch(function (response) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].of(__WEBPACK_IMPORTED_MODULE_3__shared_actions__["g" /* loadMetricTreeError */](response.error));
        }); });
    }
    return AppEffects;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__ngrx_effects__["b" /* Effect */])(),
    __metadata("design:type", Object)
], AppEffects.prototype, "loadCommitsEffects$", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__ngrx_effects__["b" /* Effect */])(),
    __metadata("design:type", Object)
], AppEffects.prototype, "loadMetricTreeEffects$", void 0);
AppEffects = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngrx_effects__["c" /* Actions */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngrx_effects__["c" /* Actions */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__service_commit_service__["a" /* CommitService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_commit_service__["a" /* CommitService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__service_metric_service__["a" /* MetricService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__service_metric_service__["a" /* MetricService */]) === "function" && _c || Object])
], AppEffects);

var _a, _b, _c;
//# sourceMappingURL=effects.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_reducers__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helper_element_analyzer__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_focus_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__helper_metric_name_helper__ = __webpack_require__(56);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComparisonPanelComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ComparisonPanelComponent = (function () {
    function ComparisonPanelComponent(store, focusService) {
        this.store = store;
        this.focusService = focusService;
        this.subscriptions = [];
        this.tableRows = [];
    }
    ComparisonPanelComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.comparisonPanel = document.querySelector('#comparison-panel');
        this.subscriptions.push(this.focusService.elementFocussed$.subscribe(function (elementName) {
            _this.elementName = elementName;
            _this.foundElement = __WEBPACK_IMPORTED_MODULE_3__helper_element_analyzer__["a" /* ElementAnalyzer */].findElementByName(_this.metricTree, elementName);
            _this.prepareTableData();
            _this.show();
        }));
        this.subscriptions.push(this.store.select(__WEBPACK_IMPORTED_MODULE_2__shared_reducers__["c" /* getLeftAndRightCommit */]).subscribe(function (result) {
            if (result) {
                _this.leftCommit = result.leftCommit;
                _this.rightCommit = result.rightCommit;
            }
        }));
        this.subscriptions.push(this.store.select(__WEBPACK_IMPORTED_MODULE_2__shared_reducers__["d" /* getMetricMapping */]).subscribe(function (metricMapping) {
            _this.metricMapping = metricMapping;
        }));
        this.subscriptions.push(this.store.select(__WEBPACK_IMPORTED_MODULE_2__shared_reducers__["e" /* getMetricTree */]).subscribe(function (metricTree) {
            _this.metricTree = metricTree;
        }));
    };
    ComparisonPanelComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
    };
    ComparisonPanelComponent.prototype.handleClose = function () {
        this.hide();
    };
    ComparisonPanelComponent.prototype.prepareTableData = function () {
        var rows = [];
        for (var _i = 0, _a = Object.keys(this.metricMapping); _i < _a.length; _i++) {
            var key = _a[_i];
            var metricName = this.metricMapping[key];
            var leftCommitValue = void 0;
            if (this.foundElement.commit1Metrics && this.foundElement.commit1Metrics[metricName]) {
                leftCommitValue = this.foundElement.commit1Metrics[metricName];
            }
            var rightCommitValue = void 0;
            if (this.foundElement.commit2Metrics && this.foundElement.commit2Metrics[metricName]) {
                rightCommitValue = this.foundElement.commit2Metrics[metricName];
            }
            var difference = 0;
            if (leftCommitValue && rightCommitValue) {
                difference = rightCommitValue - leftCommitValue;
            }
            rows.push({
                metricName: __WEBPACK_IMPORTED_MODULE_5__helper_metric_name_helper__["a" /* MetricNameHelper */].getShortNameByFullName(metricName),
                leftCommitValue: leftCommitValue || 'N/A',
                rightCommitValue: rightCommitValue || 'N/A',
                difference: difference
            });
        }
        this.tableRows = rows;
    };
    ComparisonPanelComponent.prototype.show = function () {
        this.comparisonPanel.classList.add('open');
    };
    ComparisonPanelComponent.prototype.hide = function () {
        this.comparisonPanel.classList.remove('open');
    };
    return ComparisonPanelComponent;
}());
ComparisonPanelComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-comparison-panel',
        template: __webpack_require__(461),
        styles: [__webpack_require__(431)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["b" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["b" /* Store */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__service_focus_service__["a" /* FocusService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_focus_service__["a" /* FocusService */]) === "function" && _b || Object])
], ComparisonPanelComponent);

var _a, _b;
//# sourceMappingURL=comparison-panel.component.js.map

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enum_ScreenType__ = __webpack_require__(34);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InteractionHandler; });


var InteractionHandler = (function () {
    function InteractionHandler(scene, renderer, screenType, isMergedView, focusService, tooltipService) {
        this.scene = scene;
        this.renderer = renderer;
        this.screenType = screenType;
        this.isMergedView = isMergedView;
        this.focusService = focusService;
        this.tooltipService = tooltipService;
        this.enabled = false;
        this.raycaster = new __WEBPACK_IMPORTED_MODULE_0_three__["Raycaster"]();
        this.mouse = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"]();
        this.mouseForRaycaster = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"]();
        this.hoveredElementUuid = undefined;
        this.clickedElementUuid = undefined;
        this.startingPosition = {};
        this.bindEvents();
    }
    InteractionHandler.prototype.setIsMergedView = function (isMergedView) {
        this.isMergedView = isMergedView;
    };
    InteractionHandler.prototype.update = function (camera) {
        if (!this.enabled) {
            return;
        }
        this.raycaster.setFromCamera(this.mouseForRaycaster, camera);
        var intersects = this.raycaster.intersectObjects(this.scene.children);
        var target = this.findFirstNonHelperBlock(intersects);
        this.updateTooltip(target);
    };
    InteractionHandler.prototype.findFirstNonHelperBlock = function (intersections) {
        if (intersections.length > 0) {
            for (var i = 0; i < intersections.length; i++) {
                // find the first block that is not a helper block
                // this lets the clicks go through the helper blocks
                if (!intersections[i].object.userData.isHelper) {
                    return intersections[i].object;
                }
            }
        }
        return undefined;
    };
    InteractionHandler.prototype.updateTooltip = function (target) {
        if (target) {
            if (target.uuid != this.hoveredElementUuid) {
                this.tooltipService.setContent({
                    elementName: target.userData.elementName,
                    metrics: target.userData.metrics
                });
                this.hoveredElementUuid = target.uuid;
            }
            this.tooltipService.show();
            this.tooltipService.setMousePosition({ x: this.mouse.x, y: this.mouse.y });
        }
        else {
            this.tooltipService.hide();
        }
    };
    InteractionHandler.prototype.onDocumentMouseOver = function () {
        this.enabled = true;
    };
    InteractionHandler.prototype.onDocumentMouseOut = function () {
        this.enabled = false;
        this.tooltipService.hide();
    };
    InteractionHandler.prototype.onDocumentMouseMove = function (event) {
        if (!this.enabled) {
            return;
        }
        this.mouse.x = event.clientX;
        this.mouse.y = event.clientY;
        var screenOffset = this.screenType === __WEBPACK_IMPORTED_MODULE_1__enum_ScreenType__["a" /* ScreenType */].LEFT ? 0 : this.getScreenWidth();
        this.mouseForRaycaster.x = ((event.clientX - screenOffset) / this.getScreenWidth()) * 2 - 1;
        this.mouseForRaycaster.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    InteractionHandler.prototype.onDocumentMouseDown = function (event) {
        this.renderer.domElement.style.cursor = '-webkit-grabbing';
        this.startingPosition = {
            x: event.clientX,
            y: event.clientY
        };
    };
    InteractionHandler.prototype.onDocumentMouseUp = function (event) {
        this.renderer.domElement.style.cursor = '-webkit-grab';
        if (!this.enabled) {
            return;
        }
        if (Math.abs(event.clientX - this.startingPosition.x) > 0 || Math.abs(event.clientY - this.startingPosition.y) > 0) {
            return;
        }
        var intersects = this.raycaster.intersectObjects(this.scene.children);
        var target = this.findFirstNonHelperBlock(intersects);
        if (target) {
            if (event.which == 1) {
                if (target.uuid != this.clickedElementUuid) {
                    this.clickedElementUuid = target.uuid;
                }
                else {
                    this.clickedElementUuid = undefined;
                }
                this.focusService.focusElement(target.name);
            }
        }
    };
    InteractionHandler.prototype.bindEvents = function () {
        this.renderer.domElement.addEventListener('mouseover', this.onDocumentMouseOver.bind(this), false);
        this.renderer.domElement.addEventListener('mouseout', this.onDocumentMouseOut.bind(this), false);
        this.renderer.domElement.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
        this.renderer.domElement.addEventListener('mousedown', this.onDocumentMouseDown.bind(this), false);
        this.renderer.domElement.addEventListener('mouseup', this.onDocumentMouseUp.bind(this), false);
    };
    InteractionHandler.prototype.getScreenWidth = function () {
        if (this.isMergedView) {
            return window.innerWidth;
        }
        return window.innerWidth / 2;
    };
    return InteractionHandler;
}());

//# sourceMappingURL=interaction-handler.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enum_ViewType__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AppConfig__ = __webpack_require__(20);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LegendComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LegendComponent = (function () {
    function LegendComponent() {
        this.viewTypes = {
            split: __WEBPACK_IMPORTED_MODULE_1__enum_ViewType__["a" /* ViewType */].SPLIT,
            merged: __WEBPACK_IMPORTED_MODULE_1__enum_ViewType__["a" /* ViewType */].MERGED
        };
    }
    LegendComponent.prototype.ngOnInit = function () {
        this.colorFirstCommit = __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].COLOR_FIRST_COMMIT;
        this.colorSecondCommit = __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].COLOR_SECOND_COMMIT;
        this.colorAddedFile = __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].COLOR_ADDED_FILE;
        this.colorDeletedFile = __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].COLOR_DELETED_FILE;
        this.colorUnchangedFile = __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].COLOR_UNCHANGED_FILE;
        this.legendItemCommit1 = document.querySelector('#legend-item-commit-1');
        this.legendItemCommit2 = document.querySelector('#legend-item-commit-2');
        this.legendItemColorCode = document.querySelector('#legend-item-color-code');
        this.legendItemAddedFiles = document.querySelector('#legend-item-added-files');
        this.legendItemDeletedFiles = document.querySelector('#legend-item-deleted-files');
        this.legendItemUnchangedFiles = document.querySelector('#legend-item-unchanged-files');
    };
    return LegendComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__enum_ViewType__["a" /* ViewType */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__enum_ViewType__["a" /* ViewType */]) === "function" && _a || Object)
], LegendComponent.prototype, "activeViewType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], LegendComponent.prototype, "colorMetricName", void 0);
LegendComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-legend',
        template: __webpack_require__(462),
        styles: [__webpack_require__(432)]
    }),
    __metadata("design:paramtypes", [])
], LegendComponent);

var _a;
//# sourceMappingURL=legend.component.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingIndicatorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LoadingIndicatorComponent = (function () {
    function LoadingIndicatorComponent() {
    }
    LoadingIndicatorComponent.prototype.ngOnInit = function () {
    };
    return LoadingIndicatorComponent;
}());
LoadingIndicatorComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-loading-indicator',
        template: __webpack_require__(463),
        styles: [__webpack_require__(433)]
    }),
    __metadata("design:paramtypes", [])
], LoadingIndicatorComponent);

//# sourceMappingURL=loading-indicator.component.js.map

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enum_ScreenType__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__enum_ViewType__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__view_split_view__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__view_merged_view__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__interfaces_IFilter__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__interfaces_IFilter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__interfaces_IFilter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__enum_NodeType__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__interaction_handler_interaction_handler__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__AppConfig__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__interfaces_INode__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__interfaces_INode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__interfaces_INode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__service_screenshot_service__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__service_focus_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__service_tooltip_service__ = __webpack_require__(84);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScreenComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var ScreenComponent = (function () {
    function ScreenComponent(screenShotService, focusService, tooltipService) {
        this.screenShotService = screenShotService;
        this.focusService = focusService;
        this.tooltipService = tooltipService;
        this.subscriptions = [];
        this.isMergedView = false;
        this.renderingIsPaused = false;
        this.scene = new __WEBPACK_IMPORTED_MODULE_2_three__["Scene"]();
    }
    ScreenComponent.prototype.ngOnChanges = function (changes) {
        if (this.activeViewType !== null && this.metricTree !== null && this.activeFilter !== null) {
            this.isMergedView = this.activeViewType === __WEBPACK_IMPORTED_MODULE_3__enum_ViewType__["a" /* ViewType */].MERGED;
            this.interactionHandler.setIsMergedView(this.isMergedView);
            if (this.isMergedView) {
                this.view = new __WEBPACK_IMPORTED_MODULE_5__view_merged_view__["a" /* MergedView */](this.screenType);
                if (this.screenType === __WEBPACK_IMPORTED_MODULE_1__enum_ScreenType__["a" /* ScreenType */].RIGHT) {
                    this.pauseRendering();
                }
                document.querySelector('#stage').classList.remove('split');
            }
            else {
                this.view = new __WEBPACK_IMPORTED_MODULE_4__view_split_view__["a" /* SplitView */](this.screenType);
                if (this.screenType === __WEBPACK_IMPORTED_MODULE_1__enum_ScreenType__["a" /* ScreenType */].RIGHT) {
                    this.resumeRendering();
                }
                document.querySelector('#stage').classList.add('split');
            }
            this.resetScene();
            this.prepareView(this.metricTree);
            this.applyFilter(this.activeFilter);
            this.handleViewChanged();
        }
        if (changes.metricTree && changes.metricTree.currentValue) {
            this.resetCameraAndControls();
        }
    };
    ScreenComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.view = new __WEBPACK_IMPORTED_MODULE_4__view_split_view__["a" /* SplitView */](this.screenType);
        this.createCamera();
        this.createControls();
        this.createLight();
        this.createRenderer();
        this.createInteractionHandler();
        this.initializeEventListeners();
        this.render();
        this.subscriptions.push(this.focusService.elementFocussed$.subscribe(function (elementName) {
            _this.focusElementByName(elementName);
        }));
        this.subscriptions.push(this.screenShotService.screenShotRequested$.subscribe(function () {
            var imgFromCanvas = _this.renderer.domElement.toDataURL('image/png');
            var pngFile = imgFromCanvas.replace(/^data:image\/png/, 'data:application/octet-stream');
            _this.screenShotService.addScreenShot({
                screenType: _this.screenType,
                file: pngFile
            });
        }));
    };
    ScreenComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
    };
    ScreenComponent.prototype.createRenderer = function () {
        this.renderer = new __WEBPACK_IMPORTED_MODULE_2_three__["WebGLRenderer"]({ antialias: true, preserveDrawingBuffer: true });
        this.renderer.setClearColor(0xf0f0f0);
        this.renderer.setSize(this.getScreenWidth() - 0, window.innerHeight);
        document.querySelector('#stage').appendChild(this.renderer.domElement);
    };
    ScreenComponent.prototype.updateRenderer = function () {
        this.renderer.setSize(this.getScreenWidth() - 0, window.innerHeight);
    };
    ScreenComponent.prototype.createLight = function () {
        var ambientLight = new __WEBPACK_IMPORTED_MODULE_2_three__["AmbientLight"](0xcccccc, 0.5);
        this.scene.add(ambientLight);
        var directionalLight = new __WEBPACK_IMPORTED_MODULE_2_three__["DirectionalLight"](0xffffff, 0.4);
        directionalLight.position.set(0, 1, 0);
        this.scene.add(directionalLight);
    };
    ScreenComponent.prototype.createCamera = function () {
        this.camera = new THREE.PerspectiveCamera(45, (this.getScreenWidth() - 0) / window.innerHeight, __WEBPACK_IMPORTED_MODULE_9__AppConfig__["a" /* AppConfig */].CAMERA_NEAR, __WEBPACK_IMPORTED_MODULE_9__AppConfig__["a" /* AppConfig */].CAMERA_FAR);
        this.scene.add(this.camera);
    };
    ScreenComponent.prototype.updateCamera = function () {
        this.camera.aspect = (this.getScreenWidth() - 0) / window.innerHeight;
        this.camera.updateProjectionMatrix();
    };
    ScreenComponent.prototype.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, document.querySelector('#stage'));
    };
    ScreenComponent.prototype.resetCameraAndControls = function () {
        this.camera.position.x = __WEBPACK_IMPORTED_MODULE_9__AppConfig__["a" /* AppConfig */].CAMERA_START_POSITION.x;
        this.camera.position.y = __WEBPACK_IMPORTED_MODULE_9__AppConfig__["a" /* AppConfig */].CAMERA_START_POSITION.y;
        this.camera.position.z = __WEBPACK_IMPORTED_MODULE_9__AppConfig__["a" /* AppConfig */].CAMERA_START_POSITION.z;
        var centralCoordinates = this.getCentralCoordinates();
        this.controls.target.x = centralCoordinates.x;
        this.controls.target.y = centralCoordinates.y;
        this.controls.target.z = centralCoordinates.z;
    };
    ScreenComponent.prototype.render = function () {
        var _this = this;
        this.requestAnimationFrameId = requestAnimationFrame(function () {
            _this.render();
        });
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        this.interactionHandler.update(this.camera);
        TWEEN.update();
    };
    ScreenComponent.prototype.pauseRendering = function () {
        if (this.requestAnimationFrameId) {
            cancelAnimationFrame(this.requestAnimationFrameId);
            this.resetScene();
            this.renderingIsPaused = true;
        }
    };
    ScreenComponent.prototype.resumeRendering = function () {
        if (this.renderingIsPaused) {
            this.render();
            this.renderingIsPaused = false;
        }
    };
    ScreenComponent.prototype.prepareView = function (metricTree) {
        var _this = this;
        this.view.setMetricTree(metricTree);
        this.view.recalculate();
        this.view.getBlockElements().forEach(function (element) {
            _this.scene.add(element);
        });
        if (this.view instanceof __WEBPACK_IMPORTED_MODULE_5__view_merged_view__["a" /* MergedView */]) {
            this.view.calculateConnections(this.scene);
            this.view.getConnections().forEach(function (blockConnection) {
                _this.scene.add(blockConnection.getCurve());
            });
        }
    };
    ScreenComponent.prototype.createInteractionHandler = function () {
        this.interactionHandler = new __WEBPACK_IMPORTED_MODULE_8__interaction_handler_interaction_handler__["a" /* InteractionHandler */](this.scene, this.renderer, this.screenType, this.isMergedView, this.focusService, this.tooltipService);
    };
    ScreenComponent.prototype.resetScene = function () {
        for (var i = this.scene.children.length - 1; i >= 0; i--) {
            var child = this.scene.children[i];
            // only remove Blocks and Lines. Don't remove lights, cameras etc.
            if (child.type === 'Mesh' || child.type === 'Line') {
                this.scene.remove(child);
            }
        }
    };
    ScreenComponent.prototype.focusElementByName = function (elementName) {
        var element = this.scene.getObjectByName(elementName);
        if (!element) {
            return;
        }
        new TWEEN.Tween(this.camera.position)
            .to({
            x: element.position.x + __WEBPACK_IMPORTED_MODULE_9__AppConfig__["a" /* AppConfig */].CAMERA_DISTANCE_TO_FOCUSSED_ELEMENT,
            y: element.position.y + __WEBPACK_IMPORTED_MODULE_9__AppConfig__["a" /* AppConfig */].CAMERA_DISTANCE_TO_FOCUSSED_ELEMENT,
            z: element.position.z + __WEBPACK_IMPORTED_MODULE_9__AppConfig__["a" /* AppConfig */].CAMERA_DISTANCE_TO_FOCUSSED_ELEMENT
        }, __WEBPACK_IMPORTED_MODULE_9__AppConfig__["a" /* AppConfig */].CAMERA_ANIMATION_DURATION)
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .start();
        new TWEEN.Tween(this.controls.target)
            .to({
            x: element.position.x + element.scale.x / 2,
            y: element.position.y,
            z: element.position.z + element.scale.z / 2
        }, __WEBPACK_IMPORTED_MODULE_9__AppConfig__["a" /* AppConfig */].CAMERA_ANIMATION_DURATION)
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .start();
    };
    ScreenComponent.prototype.getCentralCoordinates = function () {
        var root = this.scene.getObjectByName('root');
        if (!root) {
            console.warn("no root found in screen #" + this.screenType);
            return;
        }
        return {
            x: root.scale.x / 2,
            y: __WEBPACK_IMPORTED_MODULE_9__AppConfig__["a" /* AppConfig */].CAMERA_START_POSITION.y,
            z: root.scale.z / 2
        };
    };
    ScreenComponent.prototype.getScreenWidth = function () {
        if (this.isMergedView) {
            return window.innerWidth;
        }
        return window.innerWidth / 2;
    };
    ScreenComponent.prototype.initializeEventListeners = function () {
        window.addEventListener('resize', this.handleViewChanged.bind(this), false);
    };
    ScreenComponent.prototype.handleViewChanged = function () {
        this.updateCamera();
        this.updateRenderer();
    };
    ScreenComponent.prototype.applyFilter = function (activeFilter) {
        if (!this.isMergedView) {
            return;
        }
        for (var i = this.scene.children.length - 1; i >= 0; i--) {
            var node = this.scene.children[i];
            if (node.userData && (node.userData.type === __WEBPACK_IMPORTED_MODULE_7__enum_NodeType__["a" /* NodeType */].FILE || node.userData.type === __WEBPACK_IMPORTED_MODULE_7__enum_NodeType__["a" /* NodeType */].CONNECTION)) {
                node.visible = true;
                if (this.isMergedView) {
                    if (activeFilter.unchanged === false && node.userData.changeTypes && node.userData.changeTypes.modified == false) {
                        node.visible = false;
                    }
                    if (activeFilter.changed === false && node.userData.changeTypes && node.userData.changeTypes.modified == true) {
                        node.visible = false;
                    }
                    if (activeFilter.deleted === false && node.userData.changeTypes && node.userData.changeTypes.deleted == true) {
                        node.visible = false;
                    }
                    if (activeFilter.added === false && node.userData.changeTypes && node.userData.changeTypes.added == true) {
                        node.visible = false;
                    }
                    if (activeFilter.moved === false && node.userData.changeTypes && node.userData.changeTypes.moved == true) {
                        node.visible = false;
                    }
                }
            }
        }
    };
    return ScreenComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__enum_ScreenType__["a" /* ScreenType */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__enum_ScreenType__["a" /* ScreenType */]) === "function" && _a || Object)
], ScreenComponent.prototype, "screenType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__enum_ViewType__["a" /* ViewType */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__enum_ViewType__["a" /* ViewType */]) === "function" && _b || Object)
], ScreenComponent.prototype, "activeViewType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__interfaces_IFilter__["IFilter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__interfaces_IFilter__["IFilter"]) === "function" && _c || Object)
], ScreenComponent.prototype, "activeFilter", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_10__interfaces_INode__["INode"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__interfaces_INode__["INode"]) === "function" && _d || Object)
], ScreenComponent.prototype, "metricTree", void 0);
ScreenComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-screen',
        template: __webpack_require__(464),
        styles: [__webpack_require__(434)]
    }),
    __metadata("design:paramtypes", [typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_11__service_screenshot_service__["a" /* ScreenShotService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__service_screenshot_service__["a" /* ScreenShotService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_12__service_focus_service__["a" /* FocusService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_12__service_focus_service__["a" /* FocusService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_13__service_tooltip_service__["a" /* TooltipService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_13__service_tooltip_service__["a" /* TooltipService */]) === "function" && _g || Object])
], ScreenComponent);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=screen.component.js.map

/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_tooltip_service__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helper_metric_name_helper__ = __webpack_require__(56);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TooltipComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TooltipComponent = (function () {
    function TooltipComponent(tooltipService) {
        this.tooltipService = tooltipService;
    }
    TooltipComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tooltipElement = document.querySelector('#tooltip');
        this.content$ = this.tooltipService.tooltipContent$
            .map(function (tooltipObject) {
            var readableMetrics = {};
            if (tooltipObject.metrics) {
                Object.keys(tooltipObject.metrics).map(function (key) {
                    readableMetrics[__WEBPACK_IMPORTED_MODULE_2__helper_metric_name_helper__["a" /* MetricNameHelper */].getShortNameByFullName(key)] = tooltipObject.metrics[key];
                });
            }
            return {
                elementName: tooltipObject.elementName,
                metrics: readableMetrics
            };
        });
        this.tooltipService.hideTooltip$.subscribe(function () {
            _this.hide();
        });
        this.tooltipService.showTooltip$.subscribe(function () {
            _this.show();
        });
        this.tooltipService.trackPosition$.subscribe(function (position) {
            _this.followPosition(position);
        });
    };
    TooltipComponent.prototype.followPosition = function (position) {
        this.tooltipElement.style.left = position.x + 15 + 'px';
        this.tooltipElement.style.top = position.y + 15 + 'px';
    };
    TooltipComponent.prototype.show = function () {
        this.tooltipElement.classList.add('visible');
    };
    TooltipComponent.prototype.hide = function () {
        this.tooltipElement.classList.remove('visible');
        this.tooltipElement.style.left = '-1000px';
        this.tooltipElement.style.top = '-1000px';
    };
    return TooltipComponent;
}());
TooltipComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-tooltip',
        template: __webpack_require__(465),
        styles: [__webpack_require__(435)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_tooltip_service__["a" /* TooltipService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_tooltip_service__["a" /* TooltipService */]) === "function" && _a || Object])
], TooltipComponent);

var _a;
//# sourceMappingURL=tooltip.component.js.map

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__abstract_view__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_element_analyzer__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AppConfig__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__enum_NodeType__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helper_color_helper__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__enum_CommitReferenceType__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_geometry_block_connection__ = __webpack_require__(340);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MergedView; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();







var MergedView = (function (_super) {
    __extends(MergedView, _super);
    function MergedView(screenType) {
        var _this = _super.call(this, screenType) || this;
        _this.movedElements = [];
        _this.connections = [];
        return _this;
    }
    MergedView.prototype.calculateElements = function (nodes, parent, bottom) {
        var _this = this;
        if (!Array.isArray(nodes)) {
            nodes = [nodes];
        }
        nodes.forEach(function (node) {
            if (!node.packerInfo.fit) {
                console.warn("node " + node.name + " at position " + _this.screenType + " has no fit!");
                return;
            }
            var blueHeight;
            // FILE
            if (node.type === __WEBPACK_IMPORTED_MODULE_3__enum_NodeType__["a" /* NodeType */].FILE) {
                var blueHeightMetric = __WEBPACK_IMPORTED_MODULE_1__helper_element_analyzer__["a" /* ElementAnalyzer */].getMetricValueOfElementAndCommitReferenceType(node, __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].HEIGHT_METRIC_NAME, __WEBPACK_IMPORTED_MODULE_5__enum_CommitReferenceType__["a" /* CommitReferenceType */].THIS, _this.screenType);
                var orangeHeightMetric = __WEBPACK_IMPORTED_MODULE_1__helper_element_analyzer__["a" /* ElementAnalyzer */].getMetricValueOfElementAndCommitReferenceType(node, __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].HEIGHT_METRIC_NAME, __WEBPACK_IMPORTED_MODULE_5__enum_CommitReferenceType__["a" /* CommitReferenceType */].OTHER, _this.screenType);
                var blueGroundAreaMetric = __WEBPACK_IMPORTED_MODULE_1__helper_element_analyzer__["a" /* ElementAnalyzer */].getMetricValueOfElementAndCommitReferenceType(node, __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].GROUND_AREA_METRIC_NAME, __WEBPACK_IMPORTED_MODULE_5__enum_CommitReferenceType__["a" /* CommitReferenceType */].THIS, _this.screenType);
                var orangeGroundAreaMetric = __WEBPACK_IMPORTED_MODULE_1__helper_element_analyzer__["a" /* ElementAnalyzer */].getMetricValueOfElementAndCommitReferenceType(node, __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].GROUND_AREA_METRIC_NAME, __WEBPACK_IMPORTED_MODULE_5__enum_CommitReferenceType__["a" /* CommitReferenceType */].OTHER, _this.screenType);
                var blueColorMetric = __WEBPACK_IMPORTED_MODULE_1__helper_element_analyzer__["a" /* ElementAnalyzer */].getMetricValueOfElementAndCommitReferenceType(node, __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].COLOR_METRIC_NAME, __WEBPACK_IMPORTED_MODULE_5__enum_CommitReferenceType__["a" /* CommitReferenceType */].THIS, _this.screenType);
                var orangeColorMetric = __WEBPACK_IMPORTED_MODULE_1__helper_element_analyzer__["a" /* ElementAnalyzer */].getMetricValueOfElementAndCommitReferenceType(node, __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].COLOR_METRIC_NAME, __WEBPACK_IMPORTED_MODULE_5__enum_CommitReferenceType__["a" /* CommitReferenceType */].OTHER, _this.screenType);
                var blueMetrics = (_a = {},
                    _a[__WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].HEIGHT_METRIC_NAME] = blueHeightMetric,
                    _a[__WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].GROUND_AREA_METRIC_NAME] = blueGroundAreaMetric,
                    _a[__WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].COLOR_METRIC_NAME] = blueColorMetric,
                    _a);
                var orangeMetrics = (_b = {},
                    _b[__WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].HEIGHT_METRIC_NAME] = orangeHeightMetric,
                    _b[__WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].GROUND_AREA_METRIC_NAME] = orangeGroundAreaMetric,
                    _b[__WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].COLOR_METRIC_NAME] = orangeColorMetric,
                    _b);
                blueHeight = blueHeightMetric * __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].HEIGHT_FACTOR + __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].GLOBAL_MIN_HEIGHT;
                var orangeHeight = orangeHeightMetric * __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].HEIGHT_FACTOR + __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].GLOBAL_MIN_HEIGHT;
                var blueGA = blueGroundAreaMetric * __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].GROUND_AREA_FACTOR + __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].GLOBAL_MIN_GROUND_AREA;
                var orangeGA = orangeGroundAreaMetric * __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].GROUND_AREA_FACTOR + __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].GLOBAL_MIN_GROUND_AREA;
                var blueColor = __WEBPACK_IMPORTED_MODULE_4__helper_color_helper__["a" /* ColorHelper */].getColorByPosition(_this.screenType);
                var orangeColor = __WEBPACK_IMPORTED_MODULE_4__helper_color_helper__["a" /* ColorHelper */].getContraryColorByColor(blueColor);
                var blueTransparency = blueHeight >= orangeHeight && blueGA >= orangeGA;
                var orangeTransparency = orangeHeight >= blueHeight && orangeGA >= blueGA;
                if (!isNaN(blueGA) && !isNaN(orangeGA)) {
                    // both blocks
                    if (blueGA < orangeGA) {
                        // draw the bigger block ...
                        _this.createBlock(node, parent, orangeColor, orangeGA, bottom, orangeHeight, orangeTransparency, orangeMetrics, __WEBPACK_IMPORTED_MODULE_5__enum_CommitReferenceType__["a" /* CommitReferenceType */].OTHER, { modified: true });
                        // ... calculate the center position for the smaller block ...
                        node.packerInfo.fit.x += (orangeGA - blueGA) / 2;
                        node.packerInfo.fit.y += (orangeGA - blueGA) / 2;
                        // ... draw the smaller block
                        _this.createBlock(node, parent, blueColor, blueGA, bottom, blueHeight, blueTransparency, blueMetrics, __WEBPACK_IMPORTED_MODULE_5__enum_CommitReferenceType__["a" /* CommitReferenceType */].THIS, { modified: true });
                    }
                    else if (blueGA > orangeGA) {
                        // draw the bigger block ...
                        _this.createBlock(node, parent, blueColor, blueGA, bottom, blueHeight, blueTransparency, blueMetrics, __WEBPACK_IMPORTED_MODULE_5__enum_CommitReferenceType__["a" /* CommitReferenceType */].THIS, { modified: true });
                        // ... calculate the center position for the smaller block ...
                        node.packerInfo.fit.x += (blueGA - orangeGA) / 2;
                        node.packerInfo.fit.y += (blueGA - orangeGA) / 2;
                        // ... draw the smaller block
                        _this.createBlock(node, parent, orangeColor, orangeGA, bottom, orangeHeight, orangeTransparency, orangeMetrics, __WEBPACK_IMPORTED_MODULE_5__enum_CommitReferenceType__["a" /* CommitReferenceType */].OTHER, { modified: true });
                    }
                    else {
                        // ground areas are the same
                        if (blueHeight != orangeHeight) {
                            // heights are different, so draw both blocks
                            _this.createBlock(node, parent, blueColor, blueGA, bottom, blueHeight, blueTransparency, blueMetrics, __WEBPACK_IMPORTED_MODULE_5__enum_CommitReferenceType__["a" /* CommitReferenceType */].THIS, { modified: true });
                            _this.createBlock(node, parent, orangeColor, orangeGA, bottom, orangeHeight, orangeTransparency, orangeMetrics, __WEBPACK_IMPORTED_MODULE_5__enum_CommitReferenceType__["a" /* CommitReferenceType */].OTHER, { modified: true });
                        }
                        else {
                            // heights are the same, so the file has not changed
                            _this.createBlock(node, parent, __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].COLOR_UNCHANGED_FILE, orangeGA, bottom, orangeHeight, false, orangeMetrics, undefined, { modified: false });
                        }
                    }
                }
                else if (isNaN(orangeGA)) {
                    // only blue block
                    var changeTypes = { added: false, deleted: true, moved: false };
                    // cache element to draw connections
                    if (_this.isNodeMoved(node)) {
                        _this.movedElements.push({
                            fromElementName: node.name,
                            toElementName: node.renamedTo
                        });
                        changeTypes.moved = true;
                    }
                    _this.createBlock(node, parent, __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].COLOR_DELETED_FILE, blueGA, bottom, blueHeight, false, blueMetrics, __WEBPACK_IMPORTED_MODULE_5__enum_CommitReferenceType__["a" /* CommitReferenceType */].THIS, changeTypes);
                }
                else if (isNaN(blueGA)) {
                    // only orange block
                    var changeTypes = { added: true, deleted: false, moved: false };
                    if (_this.isNodeMoved(node)) {
                        changeTypes.moved = true;
                    }
                    _this.createBlock(node, parent, __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].COLOR_ADDED_FILE, orangeGA, bottom, orangeHeight, false, orangeMetrics, __WEBPACK_IMPORTED_MODULE_5__enum_CommitReferenceType__["a" /* CommitReferenceType */].OTHER, changeTypes);
                }
                // MODULE
            }
            else {
                // don't draw empty modules
                if (__WEBPACK_IMPORTED_MODULE_1__helper_element_analyzer__["a" /* ElementAnalyzer */].hasChildrenForCurrentCommit(node, true, _this.screenType)) {
                    if (bottom > _this.maxBottomValue) {
                        _this.maxBottomValue = bottom;
                    }
                    blueHeight = __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].DEFAULT_BLOCK_HEIGHT;
                    _this.createBlock(node, parent, __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].COLOR_HIERARCHY_RANGE[0], undefined, bottom, blueHeight, false);
                }
            }
            // recursion
            if (node.children && node.children.length > 0) {
                _this.calculateElements(node.children, node, bottom + blueHeight);
            }
            var _a, _b;
        });
    };
    MergedView.prototype.calculateConnections = function (scene) {
        for (var _i = 0, _a = this.movedElements; _i < _a.length; _i++) {
            var movedElementPair = _a[_i];
            var fromElement = scene.getObjectByName(movedElementPair.fromElementName);
            var toElement = scene.getObjectByName(movedElementPair.toElementName);
            if (fromElement && toElement) {
                this.connections.push(new __WEBPACK_IMPORTED_MODULE_6_app_geometry_block_connection__["a" /* BlockConnection */](fromElement, toElement));
            }
            else {
                console.warn("A connection could not be drawn because at least one element could not be found in the scene.");
            }
        }
    };
    MergedView.prototype.getConnections = function () {
        return this.connections;
    };
    MergedView.prototype.isNodeMoved = function (node) {
        return node.renamedTo != null || node.renamedFrom != null;
    };
    return MergedView;
}(__WEBPACK_IMPORTED_MODULE_0__abstract_view__["a" /* AbstractView */]));

//# sourceMappingURL=merged-view.js.map

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__abstract_view__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enum_NodeType__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AppConfig__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__enum_CommitReferenceType__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helper_color_helper__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__helper_element_analyzer__ = __webpack_require__(40);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SplitView; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var SplitView = (function (_super) {
    __extends(SplitView, _super);
    function SplitView(screenType) {
        return _super.call(this, screenType) || this;
    }
    SplitView.prototype.calculateElements = function (nodes, parent, bottom) {
        var _this = this;
        var minMaxColorValuePair = __WEBPACK_IMPORTED_MODULE_5__helper_element_analyzer__["a" /* ElementAnalyzer */].findSmallestAndBiggestMetricValueByMetricName(this.rootNode.children, __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].COLOR_METRIC_NAME);
        this.minColorMetricValue = minMaxColorValuePair.min;
        this.maxColorMetricValue = minMaxColorValuePair.max;
        if (!Array.isArray(nodes)) {
            nodes = [nodes];
        }
        nodes.forEach(function (node) {
            // don't draw empty modules
            if (node.type == __WEBPACK_IMPORTED_MODULE_1__enum_NodeType__["a" /* NodeType */].MODULE && !__WEBPACK_IMPORTED_MODULE_5__helper_element_analyzer__["a" /* ElementAnalyzer */].hasChildrenForCurrentCommit(node, false, _this.screenType)) {
                return;
            }
            if (!node.packerInfo.fit) {
                console.info("node " + node.name + " at position " + _this.screenType + " has no fit!");
                return;
            }
            var heightMetric = __WEBPACK_IMPORTED_MODULE_5__helper_element_analyzer__["a" /* ElementAnalyzer */].getMetricValueOfElementAndCommitReferenceType(node, __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].HEIGHT_METRIC_NAME, __WEBPACK_IMPORTED_MODULE_3__enum_CommitReferenceType__["a" /* CommitReferenceType */].THIS, _this.screenType);
            var groundAreaMetric = __WEBPACK_IMPORTED_MODULE_5__helper_element_analyzer__["a" /* ElementAnalyzer */].getMetricValueOfElementAndCommitReferenceType(node, __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].GROUND_AREA_METRIC_NAME, __WEBPACK_IMPORTED_MODULE_3__enum_CommitReferenceType__["a" /* CommitReferenceType */].THIS, _this.screenType);
            var colorMetric = __WEBPACK_IMPORTED_MODULE_5__helper_element_analyzer__["a" /* ElementAnalyzer */].getMetricValueOfElementAndCommitReferenceType(node, __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].COLOR_METRIC_NAME, __WEBPACK_IMPORTED_MODULE_3__enum_CommitReferenceType__["a" /* CommitReferenceType */].THIS, _this.screenType);
            var metrics = (_a = {},
                _a[__WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].HEIGHT_METRIC_NAME] = heightMetric,
                _a[__WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].GROUND_AREA_METRIC_NAME] = groundAreaMetric,
                _a[__WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].COLOR_METRIC_NAME] = colorMetric,
                _a);
            var myHeight;
            if (node.type === __WEBPACK_IMPORTED_MODULE_1__enum_NodeType__["a" /* NodeType */].FILE) {
                if (!heightMetric || !groundAreaMetric) {
                    return;
                }
                myHeight = heightMetric * __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].HEIGHT_FACTOR + __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].GLOBAL_MIN_HEIGHT;
                var myGA = groundAreaMetric * __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].GROUND_AREA_FACTOR + __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].GLOBAL_MIN_GROUND_AREA;
                var otherGA = __WEBPACK_IMPORTED_MODULE_5__helper_element_analyzer__["a" /* ElementAnalyzer */].getMetricValueOfElementAndCommitReferenceType(node, __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].GROUND_AREA_METRIC_NAME, __WEBPACK_IMPORTED_MODULE_3__enum_CommitReferenceType__["a" /* CommitReferenceType */].OTHER, _this.screenType) * __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].GROUND_AREA_FACTOR + __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].GLOBAL_MIN_GROUND_AREA;
                var myColor = __WEBPACK_IMPORTED_MODULE_4__helper_color_helper__["a" /* ColorHelper */].getColorByMetricValue(colorMetric, _this.maxColorMetricValue, _this.minColorMetricValue);
                if (myGA < otherGA) {
                    node.packerInfo.fit.x += (otherGA - myGA) / 2;
                    node.packerInfo.fit.y += (otherGA - myGA) / 2;
                }
                _this.createBlock(node, parent, myColor, myGA, bottom, myHeight, false, metrics);
            }
            else {
                if (bottom > _this.maxBottomValue) {
                    _this.maxBottomValue = bottom;
                }
                myHeight = __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].DEFAULT_BLOCK_HEIGHT;
                _this.createBlock(node, parent, __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].COLOR_HIERARCHY_RANGE[0], undefined, bottom, myHeight, false, metrics);
            }
            // recursion
            if (node.children && node.children.length > 0) {
                _this.calculateElements(node.children, node, bottom + myHeight);
            }
            var _a;
        });
    };
    return SplitView;
}(__WEBPACK_IMPORTED_MODULE_0__abstract_view__["a" /* AbstractView */]));

//# sourceMappingURL=split-view.js.map

/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enum_ScreenType__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngrx_store__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_reducers__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__visualization_actions__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__helper_metric_name_helper__ = __webpack_require__(56);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VisualizationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var VisualizationComponent = (function () {
    function VisualizationComponent(store) {
        this.store = store;
        this.subscriptions = [];
        this.screenTypes = {
            left: __WEBPACK_IMPORTED_MODULE_1__enum_ScreenType__["a" /* ScreenType */].LEFT,
            right: __WEBPACK_IMPORTED_MODULE_1__enum_ScreenType__["a" /* ScreenType */].RIGHT
        };
    }
    VisualizationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.metricsLoading$ = this.store.select(__WEBPACK_IMPORTED_MODULE_4__shared_reducers__["f" /* getMetricsLoading */]);
        this.activeViewType$ = this.store.select(__WEBPACK_IMPORTED_MODULE_4__shared_reducers__["g" /* getActiveViewType */]);
        this.activeFilter$ = this.store.select(__WEBPACK_IMPORTED_MODULE_4__shared_reducers__["h" /* getActiveFilter */]);
        this.metricTree$ = this.store.select(__WEBPACK_IMPORTED_MODULE_4__shared_reducers__["e" /* getMetricTree */]);
        this.colorMetricName$ = this.store.select(__WEBPACK_IMPORTED_MODULE_4__shared_reducers__["d" /* getMetricMapping */])
            .map(function (metricMapping) { return metricMapping.colorMetricName; })
            .map(function (colorMetricName) { return __WEBPACK_IMPORTED_MODULE_6__helper_metric_name_helper__["a" /* MetricNameHelper */].getShortNameByFullName(colorMetricName); });
        this.subscriptions.push(__WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].combineLatest(this.store.select(__WEBPACK_IMPORTED_MODULE_4__shared_reducers__["i" /* getLeftCommit */]), this.store.select(__WEBPACK_IMPORTED_MODULE_4__shared_reducers__["j" /* getRightCommit */]), this.store.select(__WEBPACK_IMPORTED_MODULE_4__shared_reducers__["d" /* getMetricMapping */]))
            .filter(function (_a) {
            var leftCommit = _a[0], rightCommit = _a[1], metricMapping = _a[2];
            return !!leftCommit && !!rightCommit;
        })
            .subscribe(function (_a) {
            var leftCommit = _a[0], rightCommit = _a[1], metricMapping = _a[2];
            _this.store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__visualization_actions__["h" /* loadMetricTree */])(leftCommit, rightCommit, metricMapping));
        }));
    };
    VisualizationComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
    };
    return VisualizationComponent;
}());
VisualizationComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-visualization',
        template: __webpack_require__(466),
        styles: [__webpack_require__(436)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__ngrx_store__["b" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ngrx_store__["b" /* Store */]) === "function" && _a || Object])
], VisualizationComponent);

var _a;
//# sourceMappingURL=visualization.component.js.map

/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: false,
    demo: true
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__visualization_component__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__screen_screen_component__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_metric_service__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_mocks_metric_mock_service__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__tooltip_tooltip_component__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__comparison_panel_comparison_panel_component__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__legend_legend_component__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pipes_key_value_pipe__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__loading_indicator_loading_indicator_component__ = __webpack_require__(354);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VisualizationModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var VisualizationModule = (function () {
    function VisualizationModule() {
    }
    return VisualizationModule;
}());
VisualizationModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__visualization_component__["a" /* VisualizationComponent */],
            __WEBPACK_IMPORTED_MODULE_3__screen_screen_component__["a" /* ScreenComponent */],
            __WEBPACK_IMPORTED_MODULE_7__tooltip_tooltip_component__["a" /* TooltipComponent */],
            __WEBPACK_IMPORTED_MODULE_8__comparison_panel_comparison_panel_component__["a" /* ComparisonPanelComponent */],
            __WEBPACK_IMPORTED_MODULE_9__legend_legend_component__["a" /* LegendComponent */],
            __WEBPACK_IMPORTED_MODULE_10__pipes_key_value_pipe__["a" /* KeyValuePipe */],
            __WEBPACK_IMPORTED_MODULE_11__loading_indicator_loading_indicator_component__["a" /* LoadingIndicatorComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__visualization_component__["a" /* VisualizationComponent */]
        ],
        providers: [
            {
                provide: __WEBPACK_IMPORTED_MODULE_4__service_metric_service__["a" /* MetricService */],
                useClass: __WEBPACK_IMPORTED_MODULE_5__environments_environment__["a" /* environment */].demo ? __WEBPACK_IMPORTED_MODULE_6__service_mocks_metric_mock_service__["a" /* MetricMockService */] : __WEBPACK_IMPORTED_MODULE_4__service_metric_service__["a" /* MetricService */]
            }
        ]
    })
], VisualizationModule);

//# sourceMappingURL=visualization.module.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__visualization_actions__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_element_analyzer__ = __webpack_require__(40);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VisualizationReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getMetricsLoading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getMetricTree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getUniqueFileList; });


var initialState = {
    metricsLoading: false,
    metricTree: null,
    uniqueFileList: []
};
var VisualizationReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    var newState;
    switch (action.type) {
        case __WEBPACK_IMPORTED_MODULE_0__visualization_actions__["a" /* LOAD_METRIC_TREE */]:
            newState = Object.assign({}, state);
            newState.metricsLoading = true;
            return newState;
        case __WEBPACK_IMPORTED_MODULE_0__visualization_actions__["b" /* LOAD_METRIC_TREE_SUCCESS */]:
            newState = Object.assign({}, state);
            newState.metricsLoading = false;
            newState.metricTree = action.payload;
            return newState;
        case __WEBPACK_IMPORTED_MODULE_0__visualization_actions__["c" /* GENERATE_UNIQUE_FILE_LIST */]:
            newState = Object.assign({}, state);
            newState.uniqueFileList = __WEBPACK_IMPORTED_MODULE_1__helper_element_analyzer__["a" /* ElementAnalyzer */].generateUniqueElementList(action.payload);
            return newState;
        case __WEBPACK_IMPORTED_MODULE_0__visualization_actions__["d" /* LOAD_METRIC_TREE_ERROR */]:
            newState = Object.assign({}, state);
            newState.metricsLoading = false;
            console.error("Error while loading metrics: " + action.payload);
            return state;
        default:
            return state;
    }
};
var getMetricsLoading = function (state) { return state.metricsLoading; };
var getMetricTree = function (state) { return state.metricTree; };
var getUniqueFileList = function (state) { return state.uniqueFileList; };
//# sourceMappingURL=visualization.reducers.js.map

/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewType; });
var ViewType;
(function (ViewType) {
    ViewType[ViewType["SPLIT"] = 0] = "SPLIT";
    ViewType[ViewType["MERGED"] = 1] = "MERGED";
})(ViewType || (ViewType = {}));
//# sourceMappingURL=ViewType.js.map

/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enum_CommitReferenceType__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enum_ScreenType__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enum_NodeType__ = __webpack_require__(33);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ElementAnalyzer; });



var ElementAnalyzer = (function () {
    function ElementAnalyzer() {
    }
    ElementAnalyzer.findElementByName = function (nodes, elementName) {
        if (!Array.isArray(nodes)) {
            nodes = [nodes];
        }
        var foundElement;
        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
            var node = nodes_1[_i];
            if (node.name === elementName) {
                foundElement = node;
            }
            // recursion
            if (node.children && node.children.length > 0 && !foundElement) {
                foundElement = this.findElementByName(node.children, elementName);
            }
        }
        return foundElement;
    };
    ElementAnalyzer.generateUniqueElementList = function (nodes, uniqueElements) {
        if (uniqueElements === void 0) { uniqueElements = []; }
        if (!Array.isArray(nodes)) {
            nodes = [nodes];
        }
        for (var _i = 0, nodes_2 = nodes; _i < nodes_2.length; _i++) {
            var node = nodes_2[_i];
            if (uniqueElements.indexOf(node.name) < 0) {
                uniqueElements.push(node.name);
            }
            // recursion
            if (node.children && node.children.length > 0) {
                this.generateUniqueElementList(node.children, uniqueElements);
            }
        }
        return uniqueElements;
    };
    ElementAnalyzer.findSmallestAndBiggestMetricValueByMetricName = function (nodes, metricName) {
        if (typeof nodes !== 'object' || nodes === null) {
            throw new Error('elements is not an object or null!');
        }
        if (!Array.isArray(nodes)) {
            nodes = [nodes];
        }
        var min = Number.MAX_VALUE;
        var max = Number.MIN_VALUE;
        for (var _i = 0, nodes_3 = nodes; _i < nodes_3.length; _i++) {
            var node = nodes_3[_i];
            // investigate only FILEs, because only files can have different sizes and colors
            if (node.type == __WEBPACK_IMPORTED_MODULE_2__enum_NodeType__["a" /* NodeType */].FILE) {
                var commit1Metrics = node.commit1Metrics || null;
                var commit2Metrics = node.commit2Metrics || null;
                var big = this.getMaxMetricValueByMetricName(commit1Metrics, commit2Metrics, metricName);
                if (big > max) {
                    max = big;
                }
                var small = this.getMinMetricValueByMetricName(commit1Metrics, commit2Metrics, metricName);
                if (small < min) {
                    min = small;
                }
            }
            // recursion
            if (node.children && node.children.length > 0) {
                var result = this.findSmallestAndBiggestMetricValueByMetricName(node.children, metricName);
                if (result.max > max) {
                    max = result.max;
                }
                if (result.min < min) {
                    min = result.min;
                }
            }
        }
        return {
            min: min,
            max: max
        };
    };
    ElementAnalyzer.getMinMetricValueByMetricName = function (commit1Metrics, commit2Metrics, metricName) {
        if (commit1Metrics === null && commit2Metrics === null) {
            throw new Error("No metric objects given");
        }
        if (commit1Metrics === null) {
            return commit2Metrics[metricName];
        }
        else if (commit2Metrics === null) {
            return commit1Metrics[metricName];
        }
        else {
            return commit1Metrics[metricName] < commit2Metrics[metricName] ? commit1Metrics[metricName] : commit2Metrics[metricName];
        }
    };
    ElementAnalyzer.getMaxMetricValueByMetricName = function (commit1Metrics, commit2Metrics, metricName) {
        if (commit1Metrics === null && commit2Metrics === null) {
            throw new Error("No metric objects given");
        }
        if (commit1Metrics === null) {
            return commit2Metrics[metricName];
        }
        else if (commit2Metrics === null) {
            return commit1Metrics[metricName];
        }
        else {
            return commit1Metrics[metricName] > commit2Metrics[metricName] ? commit1Metrics[metricName] : commit2Metrics[metricName];
        }
    };
    ElementAnalyzer.hasChildrenForCurrentCommit = function (node, isFullScreen, screenType) {
        var found = false;
        for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
            var child = _a[_i];
            if (this.hasMetricValuesForCurrentCommit(child, isFullScreen, screenType)) {
                found = true;
            }
            // recursion
            if (child.children && child.children.length > 0 && !found) {
                found = this.hasChildrenForCurrentCommit(child, isFullScreen, screenType);
            }
        }
        return found;
    };
    ElementAnalyzer.hasMetricValuesForCurrentCommit = function (node, isFullScreen, screenType) {
        // when in fullScreen mode, metrics for at least one commit should be present
        if (isFullScreen) {
            return node.commit1Metrics != null || node.commit2Metrics != null;
        }
        if (screenType == __WEBPACK_IMPORTED_MODULE_1__enum_ScreenType__["a" /* ScreenType */].LEFT) {
            return node.commit1Metrics != null;
        }
        else if (screenType == __WEBPACK_IMPORTED_MODULE_1__enum_ScreenType__["a" /* ScreenType */].RIGHT) {
            return node.commit2Metrics != null;
        }
        else {
            throw new Error("Unknown screenType " + screenType + "!");
        }
    };
    ElementAnalyzer.getMetricValueOfElementAndCommitReferenceType = function (node, metricName, commitReferenceType, screenType) {
        if (screenType == __WEBPACK_IMPORTED_MODULE_1__enum_ScreenType__["a" /* ScreenType */].LEFT) {
            if (commitReferenceType == __WEBPACK_IMPORTED_MODULE_0__enum_CommitReferenceType__["a" /* CommitReferenceType */].THIS) {
                return node.commit1Metrics ? node.commit1Metrics[metricName] : undefined;
            }
            else if (commitReferenceType == __WEBPACK_IMPORTED_MODULE_0__enum_CommitReferenceType__["a" /* CommitReferenceType */].OTHER) {
                return node.commit2Metrics ? node.commit2Metrics[metricName] : undefined;
            }
            else {
                throw new Error("Unknown commitReferenceType " + commitReferenceType + "!");
            }
        }
        else if (screenType == __WEBPACK_IMPORTED_MODULE_1__enum_ScreenType__["a" /* ScreenType */].RIGHT) {
            if (commitReferenceType == __WEBPACK_IMPORTED_MODULE_0__enum_CommitReferenceType__["a" /* CommitReferenceType */].THIS) {
                return node.commit2Metrics ? node.commit2Metrics[metricName] : undefined;
            }
            else if (commitReferenceType == __WEBPACK_IMPORTED_MODULE_0__enum_CommitReferenceType__["a" /* CommitReferenceType */].OTHER) {
                return node.commit1Metrics ? node.commit1Metrics[metricName] : undefined;
            }
            else {
                throw new Error("Unknown commitReferenceType " + commitReferenceType + "!");
            }
        }
        else {
            throw new Error("Unknown screenType " + screenType + "!");
        }
    };
    return ElementAnalyzer;
}());

//# sourceMappingURL=element-analyzer.js.map

/***/ }),

/***/ 421:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 422:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)();
// imports


// module
exports.push([module.i, ".autosuggest-wrapper-container {\n  position: relative; }\n  .autosuggest-wrapper-container button.close {\n    position: absolute;\n    top: 50%;\n    right: 2px;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%);\n    background: #fff;\n    padding: 5px;\n    opacity: 1;\n    outline: 0; }\n    .autosuggest-wrapper-container button.close > span {\n      color: #ccc; }\n      .autosuggest-wrapper-container button.close > span:hover {\n        color: #000; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 423:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 424:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)();
// imports


// module
exports.push([module.i, "#control-panel {\n  position: absolute;\n  top: 0;\n  width: 100%;\n  height: 80px;\n  background: #fff;\n  box-shadow: rgba(0, 0, 0, 0.2) 0 2px 6px 0;\n  z-index: 101; }\n  #control-panel > .control-container {\n    position: relative;\n    float: left;\n    margin: 10px;\n    height: 50px; }\n    #control-panel > .control-container:last-child {\n      float: right; }\n    #control-panel > .control-container .control-item {\n      display: inline-block;\n      padding: 5px; }\n    #control-panel > .control-container .control-label {\n      font-size: 12px;\n      display: block;\n      margin-top: 5px; }\n    #control-panel > .control-container .checkbox-container {\n      position: relative; }\n    #control-panel > .control-container .checkbox-icon {\n      position: absolute;\n      top: 0;\n      width: 30px;\n      height: 30px; }\n    #control-panel > .control-container .checkbox-icon.left {\n      left: 0; }\n    #control-panel > .control-container .checkbox-icon.right {\n      right: 0; }\n    #control-panel > .control-container #search-input {\n      padding-right: 30px; }\n    #control-panel > .control-container button {\n      height: 100%; }\n  #control-panel .divider {\n    height: 60px;\n    border-left: 1px solid #ccc;\n    float: left;\n    margin: 5px 10px; }\n  #control-panel #search-auto-complete-wrapper i {\n    position: absolute;\n    padding: 0 5px;\n    background: #fff;\n    line-height: 30px;\n    color: #ccc; }\n  #control-panel #search-auto-complete-wrapper input[type=text] {\n    text-indent: 28px; }\n  #control-panel #render-calls {\n    position: absolute;\n    top: 0;\n    right: 0;\n    font-size: 10px;\n    z-index: 10000; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 425:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)();
// imports


// module
exports.push([module.i, "img#gif {\n  width: 100%;\n  margin-bottom: 1rem; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 426:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 427:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 428:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 429:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 430:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 431:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)();
// imports


// module
exports.push([module.i, "#comparison-panel {\n  position: absolute;\n  bottom: 0;\n  left: 50%;\n  -webkit-transform: translate3d(-50%, 100%, 0) scale(0.1);\n          transform: translate3d(-50%, 100%, 0) scale(0.1);\n  padding: 5px 20px;\n  max-width: 40%;\n  height: 190px;\n  background: #fff;\n  box-shadow: rgba(0, 0, 0, 0.2) 0 2px 6px 0;\n  z-index: 100;\n  transition: -webkit-transform 1.5s ease;\n  transition: transform 1.5s ease;\n  transition: transform 1.5s ease, -webkit-transform 1.5s ease; }\n  #comparison-panel.open {\n    -webkit-transform: translate3d(-50%, 0%, 0) scale(1);\n            transform: translate3d(-50%, 0%, 0) scale(1); }\n  #comparison-panel > .element-name {\n    display: block;\n    text-overflow: ellipsis;\n    text-align: center;\n    white-space: nowrap;\n    overflow: hidden;\n    direction: rtl;\n    margin: 10px auto;\n    padding: 0 10px; }\n  #comparison-panel table #first-commit-id, #comparison-panel table #second-commit-id {\n    max-width: 100px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap; }\n  #comparison-panel button.close {\n    position: absolute;\n    top: 12px;\n    right: 12px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 432:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)();
// imports


// module
exports.push([module.i, "#legend-container {\n  position: absolute;\n  bottom: 0;\n  left: 10px;\n  background: #fff;\n  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.2);\n  z-index: 99; }\n  #legend-container .legend-item {\n    display: inline-block;\n    padding: 3px 10px; }\n    #legend-container .legend-item .legend-color {\n      display: inline-block;\n      width: 10px;\n      height: 10px; }\n\n#legend-item-color-code .legend-color {\n  width: 30px;\n  background: linear-gradient(to right, #ffffff, #ffc905, #f78400, #e92100, #9b1909, #4f1609, #5d0000); }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 433:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)();
// imports


// module
exports.push([module.i, ".loading-indicator-container {\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.7);\n  top: 80px;\n  left: 0;\n  z-index: 1000; }\n  .loading-indicator-container .uil-cube-css {\n    background: none;\n    position: absolute;\n    width: 200px;\n    height: 200px;\n    -webkit-transform: translateX(-50%) scale(0.5);\n    top: calc(50% - 130px);\n    left: 50%; }\n    .loading-indicator-container .uil-cube-css > div {\n      position: absolute;\n      width: 80px;\n      height: 80px;\n      -webkit-animation: uil-cube-css 1s cubic-bezier(0.2, 0.8, 0.2, 0.8) infinite;\n      animation: uil-cube-css 1s cubic-bezier(0.2, 0.8, 0.2, 0.8) infinite; }\n    .loading-indicator-container .uil-cube-css > div:nth-of-type(1) {\n      top: 10px;\n      left: 10px;\n      background: #fff;\n      opacity: 0.9;\n      -webkit-animation-delay: 0s;\n      animation-delay: 0s; }\n    .loading-indicator-container .uil-cube-css > div:nth-of-type(2) {\n      top: 10px;\n      left: 110px;\n      background: #fff;\n      opacity: 0.8;\n      -webkit-animation-delay: 0.1s;\n      animation-delay: 0.1s; }\n    .loading-indicator-container .uil-cube-css > div:nth-of-type(3) {\n      top: 110px;\n      left: 10px;\n      background: #fff;\n      opacity: 0.7;\n      -webkit-animation-delay: 0.3s;\n      animation-delay: 0.3s; }\n    .loading-indicator-container .uil-cube-css > div:nth-of-type(4) {\n      top: 110px;\n      left: 110px;\n      background: #fff;\n      opacity: 0.6;\n      -webkit-animation-delay: 0.2s;\n      animation-delay: 0.2s; }\n\n@-webkit-keyframes uil-cube-css {\n  0% {\n    -webkit-transform: scale(1.4);\n    transform: scale(1.4); }\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1); } }\n\n@-webkit-keyframes uil-cube-css {\n  0% {\n    -webkit-transform: scale(1.4);\n    transform: scale(1.4); }\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1); } }\n\n@-webkit-keyframes uil-cube-css {\n  0% {\n    -webkit-transform: scale(1.4);\n    transform: scale(1.4); }\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1); } }\n\n@keyframes uil-cube-css {\n  0% {\n    -webkit-transform: scale(1.4);\n    transform: scale(1.4); }\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1); } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 434:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 435:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)();
// imports


// module
exports.push([module.i, "#tooltip {\n  position: absolute;\n  top: 0;\n  left: 0;\n  background-color: #2B222A;\n  color: #fff;\n  padding: 10px;\n  font-size: 14px;\n  max-width: 300px;\n  z-index: 101;\n  opacity: 0;\n  transition: opacity 0.75s ease; }\n  #tooltip.visible {\n    opacity: 1; }\n  #tooltip > .element-name {\n    text-overflow: ellipsis;\n    text-align: left;\n    white-space: nowrap;\n    overflow: hidden;\n    direction: rtl;\n    padding-bottom: 5px; }\n  #tooltip table {\n    width: 100%; }\n    #tooltip table td.metric-value-column {\n      padding-left: 5px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 436:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)();
// imports


// module
exports.push([module.i, "#stage {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  overflow: hidden; }\n  #stage > .vertical-line {\n    position: absolute;\n    top: 0;\n    left: 100%;\n    height: 100%;\n    width: 2px;\n    background: #535353;\n    z-index: 98;\n    transition: left 1s ease; }\n  #stage.split > .vertical-line {\n    left: 50%; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 440:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 147,
	"./af.js": 147,
	"./ar": 154,
	"./ar-dz": 148,
	"./ar-dz.js": 148,
	"./ar-kw": 149,
	"./ar-kw.js": 149,
	"./ar-ly": 150,
	"./ar-ly.js": 150,
	"./ar-ma": 151,
	"./ar-ma.js": 151,
	"./ar-sa": 152,
	"./ar-sa.js": 152,
	"./ar-tn": 153,
	"./ar-tn.js": 153,
	"./ar.js": 154,
	"./az": 155,
	"./az.js": 155,
	"./be": 156,
	"./be.js": 156,
	"./bg": 157,
	"./bg.js": 157,
	"./bn": 158,
	"./bn.js": 158,
	"./bo": 159,
	"./bo.js": 159,
	"./br": 160,
	"./br.js": 160,
	"./bs": 161,
	"./bs.js": 161,
	"./ca": 162,
	"./ca.js": 162,
	"./cs": 163,
	"./cs.js": 163,
	"./cv": 164,
	"./cv.js": 164,
	"./cy": 165,
	"./cy.js": 165,
	"./da": 166,
	"./da.js": 166,
	"./de": 169,
	"./de-at": 167,
	"./de-at.js": 167,
	"./de-ch": 168,
	"./de-ch.js": 168,
	"./de.js": 169,
	"./dv": 170,
	"./dv.js": 170,
	"./el": 171,
	"./el.js": 171,
	"./en-au": 172,
	"./en-au.js": 172,
	"./en-ca": 173,
	"./en-ca.js": 173,
	"./en-gb": 174,
	"./en-gb.js": 174,
	"./en-ie": 175,
	"./en-ie.js": 175,
	"./en-nz": 176,
	"./en-nz.js": 176,
	"./eo": 177,
	"./eo.js": 177,
	"./es": 179,
	"./es-do": 178,
	"./es-do.js": 178,
	"./es.js": 179,
	"./et": 180,
	"./et.js": 180,
	"./eu": 181,
	"./eu.js": 181,
	"./fa": 182,
	"./fa.js": 182,
	"./fi": 183,
	"./fi.js": 183,
	"./fo": 184,
	"./fo.js": 184,
	"./fr": 187,
	"./fr-ca": 185,
	"./fr-ca.js": 185,
	"./fr-ch": 186,
	"./fr-ch.js": 186,
	"./fr.js": 187,
	"./fy": 188,
	"./fy.js": 188,
	"./gd": 189,
	"./gd.js": 189,
	"./gl": 190,
	"./gl.js": 190,
	"./gom-latn": 191,
	"./gom-latn.js": 191,
	"./he": 192,
	"./he.js": 192,
	"./hi": 193,
	"./hi.js": 193,
	"./hr": 194,
	"./hr.js": 194,
	"./hu": 195,
	"./hu.js": 195,
	"./hy-am": 196,
	"./hy-am.js": 196,
	"./id": 197,
	"./id.js": 197,
	"./is": 198,
	"./is.js": 198,
	"./it": 199,
	"./it.js": 199,
	"./ja": 200,
	"./ja.js": 200,
	"./jv": 201,
	"./jv.js": 201,
	"./ka": 202,
	"./ka.js": 202,
	"./kk": 203,
	"./kk.js": 203,
	"./km": 204,
	"./km.js": 204,
	"./kn": 205,
	"./kn.js": 205,
	"./ko": 206,
	"./ko.js": 206,
	"./ky": 207,
	"./ky.js": 207,
	"./lb": 208,
	"./lb.js": 208,
	"./lo": 209,
	"./lo.js": 209,
	"./lt": 210,
	"./lt.js": 210,
	"./lv": 211,
	"./lv.js": 211,
	"./me": 212,
	"./me.js": 212,
	"./mi": 213,
	"./mi.js": 213,
	"./mk": 214,
	"./mk.js": 214,
	"./ml": 215,
	"./ml.js": 215,
	"./mr": 216,
	"./mr.js": 216,
	"./ms": 218,
	"./ms-my": 217,
	"./ms-my.js": 217,
	"./ms.js": 218,
	"./my": 219,
	"./my.js": 219,
	"./nb": 220,
	"./nb.js": 220,
	"./ne": 221,
	"./ne.js": 221,
	"./nl": 223,
	"./nl-be": 222,
	"./nl-be.js": 222,
	"./nl.js": 223,
	"./nn": 224,
	"./nn.js": 224,
	"./pa-in": 225,
	"./pa-in.js": 225,
	"./pl": 226,
	"./pl.js": 226,
	"./pt": 228,
	"./pt-br": 227,
	"./pt-br.js": 227,
	"./pt.js": 228,
	"./ro": 229,
	"./ro.js": 229,
	"./ru": 230,
	"./ru.js": 230,
	"./sd": 231,
	"./sd.js": 231,
	"./se": 232,
	"./se.js": 232,
	"./si": 233,
	"./si.js": 233,
	"./sk": 234,
	"./sk.js": 234,
	"./sl": 235,
	"./sl.js": 235,
	"./sq": 236,
	"./sq.js": 236,
	"./sr": 238,
	"./sr-cyrl": 237,
	"./sr-cyrl.js": 237,
	"./sr.js": 238,
	"./ss": 239,
	"./ss.js": 239,
	"./sv": 240,
	"./sv.js": 240,
	"./sw": 241,
	"./sw.js": 241,
	"./ta": 242,
	"./ta.js": 242,
	"./te": 243,
	"./te.js": 243,
	"./tet": 244,
	"./tet.js": 244,
	"./th": 245,
	"./th.js": 245,
	"./tl-ph": 246,
	"./tl-ph.js": 246,
	"./tlh": 247,
	"./tlh.js": 247,
	"./tr": 248,
	"./tr.js": 248,
	"./tzl": 249,
	"./tzl.js": 249,
	"./tzm": 251,
	"./tzm-latn": 250,
	"./tzm-latn.js": 250,
	"./tzm.js": 251,
	"./uk": 252,
	"./uk.js": 252,
	"./ur": 253,
	"./ur.js": 253,
	"./uz": 255,
	"./uz-latn": 254,
	"./uz-latn.js": 254,
	"./uz.js": 255,
	"./vi": 256,
	"./vi.js": 256,
	"./x-pseudo": 257,
	"./x-pseudo.js": 257,
	"./yo": 258,
	"./yo.js": 258,
	"./zh-cn": 259,
	"./zh-cn.js": 259,
	"./zh-hk": 260,
	"./zh-hk.js": 260,
	"./zh-tw": 261,
	"./zh-tw.js": 261
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 440;


/***/ }),

/***/ 451:
/***/ (function(module, exports) {

module.exports = "<app-control-panel></app-control-panel>\n<app-visualization></app-visualization>"

/***/ }),

/***/ 452:
/***/ (function(module, exports) {

module.exports = "<div class=\"autosuggest-wrapper-container\">\n    <input #inputElement class=\"form-control\"\n           [placeholder]=\"placeholder\"\n           ngui-auto-complete\n           [(ngModel)]=\"model\"\n           [source]=\"source\"\n           value-property-name=\"id\"\n           display-property-name=\"name\"\n           [value-formatter]=\"valueFormatter\"\n           [list-formatter]=\"listFormatter\"\n           [no-match-found-text]=\"noMatchFoundText\"\n           [match-formatted]=\"matchFormatted\"\n           (valueChanged)=\"handleValueChanged($event)\" />\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"handleClearInputClicked()\">\n        <span aria-hidden=\"true\">&times;</span>\n    </button>\n</div>"

/***/ }),

/***/ 453:
/***/ (function(module, exports) {

module.exports = "<app-autosuggest-wrapper\n        [placeholder]=\"'Datum, Commit-ID, Autor'\"\n        [(model)]=\"selected\"\n        [source]=\"commits\"\n        [valuePropertyName]=\"id\"\n        [displayPropertyName]=\"name\"\n        [noMatchFoundText]=\"'Nichts gefunden.'\"\n        [matchFormatted]=\"true\"\n        [valueFormatter]=\"formatCommit\"\n        [listFormatter]=\"formatCommit\"\n        (valueChanged)=\"handleCommitChanged($event)\">\n</app-autosuggest-wrapper>\n\n<p *ngIf=\"loading\">LADE</p>"

/***/ }),

/***/ 454:
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n    <form id=\"control-panel\" class=\"row align-items-center justify-content-between\">\n        <div class=\"col-4\">\n            <div class=\"row\">\n                <div class=\"col-6\">\n                    <small>Erste Revision</small>\n                    <app-commit-chooser\n                            [commitType]=\"commitTypes.left\"\n                            [commits]=\"commits$ | async\"\n                            [loading]=\"commitsLoading$ | async\"\n                            [selected]=\"leftCommit$ | async\"\n                            (changeCommit)=\"handleCommitChanged($event)\"></app-commit-chooser>\n                </div>\n\n                <div class=\"col-6\">\n                    <small>Zweite Revision</small>\n                    <app-commit-chooser\n                            [commitType]=\"commitTypes.right\"\n                            [commits]=\"commits$ | async\"\n                            [loading]=\"commitsLoading$ | async\"\n                            [selected]=\"rightCommit$ | async\"\n                            (changeCommit)=\"handleCommitChanged($event)\"></app-commit-chooser>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-6\">\n            <app-settings></app-settings>\n            <app-screenshot\n                    [activeViewType]=\"activeViewType$ | async\"\n                    [screenShots]=\"screenShots$ | async\"\n                    (handleTakeScreenshot)=\"handleTakeScreenshot($event)\"\n                    (handleRemoveScreenshots)=\"handleRemoveScreenshots($event)\">\n            </app-screenshot>\n        </div>\n        <div class=\"col-2\">\n            <small>Suche</small>\n            <app-search [uniqueFileList]=\"uniqueFileList$ | async\" (startSearch)=\"handleSearchStarted($event)\"></app-search>\n        </div>\n    </form>\n</div>"

/***/ }),

/***/ 455:
/***/ (function(module, exports) {

module.exports = "<div class=\"btn-group\">\n    <button type=\"button\" class=\"btn btn-secondary\" (click)=\"takeScreenshot()\"><i class=\"fa fa-camera\" aria-hidden=\"true\"></i> Screenshot speichern</button>\n    <button type=\"button\" class=\"btn btn-secondary dropdown-toggle dropdown-toggle-split\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n        <span class=\"sr-only\">Toggle Dropdown</span>\n    </button>\n    <div id=\"screenshot-dropdown\" class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\">\n        <div class=\"form-group\">\n            <label>GIF erstellen für:</label>\n            <div class=\"btn-group\">\n                <button type=\"button\" class=\"btn btn-secondary\" (click)=\"generateGif(screenTypes.left)\">{{activeViewType === viewTypes.split ? 'Erster Commit' : 'Kombinierte Ansicht'}}</button>\n                <button type=\"button\" class=\"btn btn-secondary\" (click)=\"generateGif(screenTypes.right)\" *ngIf=\"activeViewType === viewTypes.split\">Zweiter Commit</button>\n            </div>\n        </div>\n\n        <img *ngIf=\"gifSource && !isGenerating\" id=\"gif\" src=\"{{gifSource}}\">\n        <p *ngIf=\"isGenerating\">GIF wird erstellt ...</p>\n        <small *ngIf=\"!gifSource && !isGenerating\">Ein GIF wird aus gespeicherten Screenshots erzeugt (Button \"Screenshot speichern\")</small>\n\n        <div class=\"form-group\" *ngIf=\"gifSource\">\n            <button type=\"button\" class=\"btn btn-danger\" (click)=\"removeScreenshots()\">zurücksetzen</button>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ 456:
/***/ (function(module, exports) {

module.exports = "<app-autosuggest-wrapper\n        [placeholder]=\"'Datei, Modul, ...'\"\n        [source]=\"uniqueFileList\"\n        [noMatchFoundText]=\"'Nichts gefunden.'\"\n        [listFormatter]=\"autocompleteListFormatter\"\n        (valueChanged)=\"handleSearchChanged($event)\">\n</app-autosuggest-wrapper>"

/***/ }),

/***/ 457:
/***/ (function(module, exports) {

module.exports = "<div class=\"btn-group\">\n    <button class=\"btn btn-secondary dropdown-toggle\" type=\"button\" id=\"dropdownMenuButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n        <i class=\"fa fa-filter\" aria-hidden=\"true\"></i> Filter\n    </button>\n    <div id=\"filter-dropdown\" class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\">\n        <div class=\"custom-controls-stacked\">\n            <label class=\"custom-control custom-checkbox\">\n                <input type=\"checkbox\" class=\"custom-control-input\" [(ngModel)]=\"activeFilter.unchanged\" (change)=\"handleFilterChanged()\">\n                <span class=\"custom-control-indicator\"></span>\n                <span class=\"custom-control-description\">unverändert</span>\n            </label>\n            <label class=\"custom-control custom-checkbox\">\n                <input type=\"checkbox\" class=\"custom-control-input\" [(ngModel)]=\"activeFilter.changed\" (change)=\"handleFilterChanged()\">\n                <span class=\"custom-control-indicator\"></span>\n                <span class=\"custom-control-description\">verändert</span>\n            </label>\n            <label class=\"custom-control custom-checkbox\">\n                <input type=\"checkbox\" class=\"custom-control-input\" [(ngModel)]=\"activeFilter.deleted\" (change)=\"handleFilterChanged()\">\n                <span class=\"custom-control-indicator\"></span>\n                <span class=\"custom-control-description\">gelöscht</span>\n            </label>\n            <label class=\"custom-control custom-checkbox\">\n                <input type=\"checkbox\" class=\"custom-control-input\" [(ngModel)]=\"activeFilter.added\" (change)=\"handleFilterChanged()\">\n                <span class=\"custom-control-indicator\"></span>\n                <span class=\"custom-control-description\">hinzugefügt</span>\n            </label>\n            <label class=\"custom-control custom-checkbox\">\n                <input type=\"checkbox\" class=\"custom-control-input\" [(ngModel)]=\"activeFilter.moved\" (change)=\"handleFilterChanged()\">\n                <span class=\"custom-control-indicator\"></span>\n                <span class=\"custom-control-description\">umbenannt/verschoben</span>\n            </label>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ 458:
/***/ (function(module, exports) {

module.exports = "<div class=\"btn-group\">\n    <button class=\"btn btn-secondary dropdown-toggle\" type=\"button\" id=\"dropdownMenuButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n        <i class=\"fa fa-bar-chart\" aria-hidden=\"true\"></i> Mapping\n    </button>\n    <div id=\"metric-mapping-dropdown\" class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\">\n        <div class=\"form-group\">\n            <label for=\"height-metric-name\">Höhe</label>\n            <select id=\"height-metric-name\" class=\"custom-select\" [(ngModel)]=\"metricMapping.heightMetricName\">\n                <option *ngFor=\"let metricName of metricNames\" [ngValue]=\"metricName.name\">{{metricName.shortName}}</option>\n            </select>\n        </div>\n\n        <div class=\"form-group\">\n            <label for=\"groundarea-metric-name\">Grundfläche</label>\n            <select id=\"groundarea-metric-name\" class=\"custom-select\" [(ngModel)]=\"metricMapping.groundAreaMetricName\">\n                <option *ngFor=\"let metricName of metricNames\" [ngValue]=\"metricName.name\">{{metricName.shortName}}</option>\n            </select>\n        </div>\n\n        <div class=\"form-group\">\n            <label for=\"color-metric-name\">Farbe</label>\n            <select id=\"color-metric-name\" class=\"custom-select\" [(ngModel)]=\"metricMapping.colorMetricName\">\n                <option *ngFor=\"let metricName of metricNames\" [ngValue]=\"metricName.name\">{{metricName.shortName}}</option>\n            </select>\n        </div>\n\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"applyMetricMappings()\">übernehmen</button>\n    </div>\n</div>"

/***/ }),

/***/ 459:
/***/ (function(module, exports) {

module.exports = "<div>\n    <small>Einstellungen</small>\n</div>\n<app-view-control [activeViewType]=\"activeViewType$ | async\" (viewTypeChanged)=\"handleViewTypeChanged($event)\"></app-view-control>\n<app-filter [activeFilter]=\"activeFilter$ | async\" (filterChanged)=\"handleFilterChanged($event)\"></app-filter>\n<app-metric-mapping [metricMapping]=\"metricMapping$ | async\" (metricMappingChanged)=\"handleMetricMappingChanged($event)\"></app-metric-mapping>"

/***/ }),

/***/ 460:
/***/ (function(module, exports) {

module.exports = "<label class=\"custom-control custom-radio\">\n    <input id=\"radio-splitscreen\" type=\"radio\" name=\"radio-group-screen\" class=\"custom-control-input\" [value]=\"viewTypes.split\" (click)=\"changeViewType(viewTypes.split)\" [checked]=\"activeViewType === viewTypes.split\" />\n    <span class=\"custom-control-indicator\"></span>\n    <span class=\"custom-control-description\">nebeneinander</span>\n</label>\n<label class=\"custom-control custom-radio\">\n    <input id=\"radio-fullscreen\" type=\"radio\" name=\"radio-group-screen\" class=\"custom-control-input\" [value]=\"viewTypes.merged\" (click)=\"changeViewType(viewTypes.merged)\" [checked]=\"activeViewType === viewTypes.merged\" />\n    <span class=\"custom-control-indicator\"></span>\n    <span class=\"custom-control-description\">kombiniert</span>\n</label>"

/***/ }),

/***/ 461:
/***/ (function(module, exports) {

module.exports = "<div id=\"comparison-panel\">\n    <strong class=\"element-name\">{{elementName}}</strong>\n    <div class=\"table-container\">\n        <table id=\"comparison-table\" class=\"table table-striped table-sm\">\n            <thead>\n            <tr>\n                <th>Metrik</th>\n                <th id=\"first-commit-id\">{{leftCommit?.name}}</th>\n                <th id=\"second-commit-id\">{{rightCommit?.name}}</th>\n                <th>Änderung</th>\n            </tr>\n            </thead>\n            <tbody>\n                <tr *ngFor=\"let row of tableRows\">\n                    <td>{{row.metricName}}</td>\n                    <td>{{row.leftCommitValue}}</td>\n                    <td>{{row.rightCommitValue}}</td>\n                    <td>\n                        <i *ngIf=\"row.difference > 0\" class=\"fa fa-caret-up\" aria-hidden=\"true\"></i>\n                        <i *ngIf=\"row.difference < 0\" class=\"fa fa-caret-down\" aria-hidden=\"true\"></i>\n                        <i *ngIf=\"row.difference === 0\" class=\"fa fa-caret-right\" aria-hidden=\"true\"></i>\n                        {{row.difference}}\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"handleClose()\">\n        <span aria-hidden=\"true\">&times;</span>\n    </button>\n</div>"

/***/ }),

/***/ 462:
/***/ (function(module, exports) {

module.exports = "<div id=\"legend-container\">\n    <div id=\"legend-item-color-code\" class=\"legend-item\" *ngIf=\"activeViewType === viewTypes.split\">\n        <span class=\"legend-color\"></span>\n        <small class=\"legend-label\">{{colorMetricName}}</small>\n    </div>\n    <div id=\"legend-item-commit-1\" class=\"legend-item\" *ngIf=\"activeViewType === viewTypes.merged\">\n        <span class=\"legend-color\" [ngStyle]=\"{'background': colorFirstCommit}\"></span>\n        <small class=\"legend-label\">Erste Revision</small>\n    </div>\n    <div id=\"legend-item-commit-2\" class=\"legend-item\" *ngIf=\"activeViewType === viewTypes.merged\">\n        <span class=\"legend-color\" [ngStyle]=\"{'background': colorSecondCommit}\"></span>\n        <small class=\"legend-label\">Zweite Revision</small>\n    </div>\n    <div id=\"legend-item-added-files\" class=\"legend-item\" *ngIf=\"activeViewType === viewTypes.merged\">\n        <span class=\"legend-color\" [ngStyle]=\"{'background': colorAddedFile}\"></span>\n        <small class=\"legend-label\">hinzugefügt</small>\n    </div>\n    <div id=\"legend-item-deleted-files\" class=\"legend-item\" *ngIf=\"activeViewType === viewTypes.merged\">\n        <span class=\"legend-color\" [ngStyle]=\"{'background': colorDeletedFile}\"></span>\n        <small class=\"legend-label\">gelöscht</small>\n    </div>\n    <div id=\"legend-item-unchanged-files\" class=\"legend-item\" *ngIf=\"activeViewType === viewTypes.merged\">\n        <span class=\"legend-color\" [ngStyle]=\"{'background': colorUnchangedFile}\"></span>\n        <small class=\"legend-label\">unverändert</small>\n    </div>\n</div>"

/***/ }),

/***/ 463:
/***/ (function(module, exports) {

module.exports = "<div class=\"loading-indicator-container\">\n    <div class=\"uil-cube-css\">\n        <div></div>\n        <div></div>\n        <div></div>\n        <div></div>\n    </div>\n</div>"

/***/ }),

/***/ 464:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 465:
/***/ (function(module, exports) {

module.exports = "<div id=\"tooltip\">\n    <div class=\"element-name\">{{(content$ | async)?.elementName}}</div>\n    <table>\n        <tr *ngFor=\"let metric of (content$ | async)?.metrics | keyValue\">\n            <td class=\"metric-name-column\"><small>{{metric.key}}</small></td>\n            <td class=\"metric-value-column\"><small>{{metric.value || 'N/A'}}</small></td>\n        </tr>\n    </table>\n</div>"

/***/ }),

/***/ 466:
/***/ (function(module, exports) {

module.exports = "<div id=\"stage\" class=\"split\">\n    <div class=\"vertical-line\"></div>\n    <app-loading-indicator *ngIf=\"metricsLoading$ | async\"></app-loading-indicator>\n    <app-screen\n            [screenType]=\"screenTypes.left\"\n            [activeViewType]=\"activeViewType$ | async\"\n            [activeFilter]=\"activeFilter$ | async\"\n            [metricTree]=\"metricTree$ | async\">\n    </app-screen>\n    <app-screen\n            [screenType]=\"screenTypes.right\"\n            [activeViewType]=\"activeViewType$ | async\"\n            [activeFilter]=\"activeFilter$ | async\"\n            [metricTree]=\"metricTree$ | async\">\n    </app-screen>\n    <app-comparison-panel></app-comparison-panel>\n    <app-legend [activeViewType]=\"activeViewType$ | async\" [colorMetricName]=\"colorMetricName$ | async\"></app-legend>\n</div>\n<app-tooltip></app-tooltip>"

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return LOAD_COMMITS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return LOAD_COMMITS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return LOAD_COMMITS_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return CHANGE_COMMIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return ADD_SCREENSHOT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return CLEAR_SCREENSHOTS; });
/* harmony export (immutable) */ __webpack_exports__["k"] = loadCommits;
/* harmony export (immutable) */ __webpack_exports__["i"] = loadCommitsSuccess;
/* harmony export (immutable) */ __webpack_exports__["j"] = loadCommitsError;
/* harmony export (immutable) */ __webpack_exports__["l"] = changeCommit;
/* harmony export (immutable) */ __webpack_exports__["a"] = addScreenshot;
/* harmony export (immutable) */ __webpack_exports__["b"] = clearScreenshots;
var LOAD_COMMITS = 'LOAD_COMMITS';
var LOAD_COMMITS_SUCCESS = 'LOAD_COMMITS_SUCCESS';
var LOAD_COMMITS_ERROR = 'LOAD_COMMITS_ERROR';
var CHANGE_COMMIT = 'CHANGE_COMMIT';
var ADD_SCREENSHOT = 'ADD_SCREENSHOT';
var CLEAR_SCREENSHOTS = 'CLEAR_SCREENSHOTS';
function loadCommits() {
    return {
        type: LOAD_COMMITS
    };
}
function loadCommitsSuccess(commits) {
    return {
        type: LOAD_COMMITS_SUCCESS,
        payload: commits
    };
}
function loadCommitsError(error) {
    return {
        type: LOAD_COMMITS_ERROR,
        payload: error
    };
}
function changeCommit(commitType, commit) {
    return {
        type: CHANGE_COMMIT,
        payload: {
            commitType: commitType,
            commit: commit
        }
    };
}
function addScreenshot(screenshotObject) {
    return {
        type: ADD_SCREENSHOT,
        payload: screenshotObject
    };
}
function clearScreenshots() {
    return {
        type: CLEAR_SCREENSHOTS
    };
}
//# sourceMappingURL=control-panel.actions.js.map

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AppConfig__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environments_environment__ = __webpack_require__(36);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MetricNameHelper; });


var MetricNameHelper = (function () {
    function MetricNameHelper() {
    }
    MetricNameHelper.getAll = function () {
        if (__WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].demo) {
            return __WEBPACK_IMPORTED_MODULE_0__AppConfig__["a" /* AppConfig */].AVAILABLE_METRICS.filter(function (metric) {
                return metric.name === 'coderadar:size:loc:java'
                    || metric.name === 'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck'
                    || metric.name === 'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck';
            });
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_0__AppConfig__["a" /* AppConfig */].AVAILABLE_METRICS;
        }
    };
    MetricNameHelper.getMetricNameByShortName = function (shortName) {
        return __WEBPACK_IMPORTED_MODULE_0__AppConfig__["a" /* AppConfig */].AVAILABLE_METRICS.find(function (metric) { return metric.shortName === shortName; }).name;
    };
    MetricNameHelper.getShortNameByFullName = function (fullName) {
        return __WEBPACK_IMPORTED_MODULE_0__AppConfig__["a" /* AppConfig */].AVAILABLE_METRICS.find(function (metric) { return metric.name === fullName; }).shortName;
    };
    return MetricNameHelper;
}());

//# sourceMappingURL=metric-name-helper.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FocusService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var FocusService = (function () {
    function FocusService() {
        this.focusElementSource = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.elementFocussed$ = this.focusElementSource.asObservable();
    }
    FocusService.prototype.focusElement = function (elementName) {
        this.focusElementSource.next(elementName);
    };
    return FocusService;
}());
FocusService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], FocusService);

//# sourceMappingURL=focus.service.js.map

/***/ }),

/***/ 734:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(298);


/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CHANGE_VIEW_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CHANGE_ACTIVE_FILTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SET_METRIC_MAPPING; });
/* harmony export (immutable) */ __webpack_exports__["d"] = changeViewType;
/* harmony export (immutable) */ __webpack_exports__["e"] = changeActiveFilter;
/* harmony export (immutable) */ __webpack_exports__["f"] = setMetricMapping;
var CHANGE_VIEW_TYPE = 'CHANGE_VIEW_TYPE';
var CHANGE_ACTIVE_FILTER = 'CHANGE_ACTIVE_FILTER';
var SET_METRIC_MAPPING = 'SET_METRIC_MAPPING';
function changeViewType(viewType) {
    return {
        type: CHANGE_VIEW_TYPE,
        payload: viewType
    };
}
function changeActiveFilter(filter) {
    return {
        type: CHANGE_ACTIVE_FILTER,
        payload: filter
    };
}
function setMetricMapping(mapping) {
    return {
        type: SET_METRIC_MAPPING,
        payload: mapping
    };
}
//# sourceMappingURL=settings.actions.js.map

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommitReferenceType; });
var CommitReferenceType;
(function (CommitReferenceType) {
    CommitReferenceType[CommitReferenceType["THIS"] = 0] = "THIS";
    CommitReferenceType[CommitReferenceType["OTHER"] = 1] = "OTHER";
})(CommitReferenceType || (CommitReferenceType = {}));
//# sourceMappingURL=CommitReferenceType.js.map

/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommitType; });
var CommitType;
(function (CommitType) {
    CommitType[CommitType["LEFT"] = 0] = "LEFT";
    CommitType[CommitType["RIGHT"] = 1] = "RIGHT";
})(CommitType || (CommitType = {}));
//# sourceMappingURL=CommitType.js.map

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_reducers__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__control_panel_control_panel_actions__ = __webpack_require__(55);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScreenShotService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ScreenShotService = (function () {
    function ScreenShotService(store) {
        this.store = store;
        this.screenShotRequestedSource = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.screenShotRequested$ = this.screenShotRequestedSource.asObservable();
    }
    ScreenShotService.prototype.requestScreenShot = function () {
        this.screenShotRequestedSource.next();
    };
    ScreenShotService.prototype.addScreenShot = function (screenShot) {
        this.store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__control_panel_control_panel_actions__["a" /* addScreenshot */])(screenShot));
    };
    ScreenShotService.prototype.clearScreenShots = function () {
        this.store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__control_panel_control_panel_actions__["b" /* clearScreenshots */])());
    };
    ScreenShotService.prototype.getScreenShots = function () {
        return this.store.select(__WEBPACK_IMPORTED_MODULE_3__shared_reducers__["b" /* getScreenshots */]);
    };
    return ScreenShotService;
}());
ScreenShotService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["b" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["b" /* Store */]) === "function" && _a || Object])
], ScreenShotService);

var _a;
//# sourceMappingURL=screenshot.service.js.map

/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TooltipService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TooltipService = (function () {
    function TooltipService() {
        this.tooltipSource = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.showTooltipSource = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.hideTooltipSource = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.trackPositionSource = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.tooltipContent$ = this.tooltipSource.asObservable();
        this.showTooltip$ = this.showTooltipSource.asObservable();
        this.hideTooltip$ = this.hideTooltipSource.asObservable();
        this.trackPosition$ = this.trackPositionSource.asObservable();
    }
    TooltipService.prototype.setContent = function (tooltipObject) {
        this.tooltipSource.next(tooltipObject);
    };
    TooltipService.prototype.setMousePosition = function (position) {
        this.trackPositionSource.next(position);
    };
    TooltipService.prototype.hide = function () {
        this.hideTooltipSource.next();
    };
    TooltipService.prototype.show = function () {
        this.showTooltipSource.next();
    };
    return TooltipService;
}());
TooltipService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], TooltipService);

//# sourceMappingURL=tooltip.service.js.map

/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LOAD_METRIC_TREE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LOAD_METRIC_TREE_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return LOAD_METRIC_TREE_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return GENERATE_UNIQUE_FILE_LIST; });
/* harmony export (immutable) */ __webpack_exports__["h"] = loadMetricTree;
/* harmony export (immutable) */ __webpack_exports__["e"] = loadMetricTreeSuccess;
/* harmony export (immutable) */ __webpack_exports__["g"] = loadMetricTreeError;
/* harmony export (immutable) */ __webpack_exports__["f"] = generateUniqueFileList;
var LOAD_METRIC_TREE = 'LOAD_METRIC_TREE';
var LOAD_METRIC_TREE_SUCCESS = 'LOAD_METRIC_TREE_SUCCESS';
var LOAD_METRIC_TREE_ERROR = 'LOAD_METRIC_TREE_ERROR';
var GENERATE_UNIQUE_FILE_LIST = 'GENERATE_UNIQUE_FILE_LIST';
function loadMetricTree(leftCommit, rightCommit, metricMapping) {
    return {
        type: LOAD_METRIC_TREE,
        payload: {
            leftCommit: leftCommit,
            rightCommit: rightCommit,
            metricMapping: metricMapping
        }
    };
}
function loadMetricTreeSuccess(metricTree) {
    return {
        type: LOAD_METRIC_TREE_SUCCESS,
        payload: metricTree
    };
}
function loadMetricTreeError(error) {
    return {
        type: LOAD_METRIC_TREE_ERROR,
        payload: error
    };
}
function generateUniqueFileList(metricTree) {
    return {
        type: GENERATE_UNIQUE_FILE_LIST,
        payload: metricTree
    };
}
//# sourceMappingURL=visualization.actions.js.map

/***/ })

},[734]);
//# sourceMappingURL=main.bundle.js.map