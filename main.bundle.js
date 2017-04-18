webpackJsonp([1,5],{

/***/ 124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AppConfig__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enum_ScreenType__ = __webpack_require__(35);
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
        return new THREE.Color(hexValue);
    };
    return ColorHelper;
}());

//# sourceMappingURL=color-helper.js.map

/***/ }),

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(20);
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

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(20);
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
        // TODO: this.http.post('http://localhost:4200/assets/json/deltaTree.json', body)
        return this.http.get('http://localhost:4200/assets/json/deltaTree.json')
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

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__geometry_block__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_enum_NodeType__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AppConfig__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helper_element_analyzer__ = __webpack_require__(55);
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
            tooltipLabel: this.generateTooltipHtml(node.name, metrics),
            isHelper: isTransparent,
            commitType: commitType,
            changeTypes: changeTypes
        };
    };
    AbstractView.prototype.generateTooltipHtml = function (elementName, metrics) {
        var tooltipHtml = ['<div class="element-name">' + elementName + '</div>'];
        if (metrics) {
            tooltipHtml.push('<table>');
            for (var _i = 0, _a = Object.keys(metrics); _i < _a.length; _i++) {
                var metricName = _a[_i];
                tooltipHtml.push(this.generateTableRow(metricName, metrics[metricName]));
            }
            tooltipHtml.push('</table>');
        }
        return tooltipHtml.join('');
    };
    AbstractView.prototype.generateTableRow = function (metricName, metricValue) {
        var html = ['<tr>'];
        html.push('<td class="metric-name-column">' + metricName + ':</td>');
        html.push('<td class="metric-value-column">' + (metricValue || 'N/A') + '</td>');
        html.push('</tr>');
        return html.join('');
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

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect__ = __webpack_require__(444);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_reselect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__control_panel_control_panel_reducers__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__control_panel_settings_settings_reducers__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__visualization_visualization_reducers__ = __webpack_require__(347);
/* harmony export (immutable) */ __webpack_exports__["a"] = reducer;
/* unused harmony export getControlPanelState */
/* unused harmony export getVisualizationState */
/* unused harmony export getSettingsState */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return getCommitsLoading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return getCommits; });
/* unused harmony export getLeftCommit */
/* unused harmony export getRightCommit */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isScreenshotRequested; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return getScreenshots; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getMetricsLoading; });
/* unused harmony export getMetricTree */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return getUniqueFileList; });
/* unused harmony export getMinColorMetricValue */
/* unused harmony export getMaxColorMetricValue */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return getMetricMapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getActiveFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return getActiveViewType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return isReadyForLoadingMetrics; });
/* unused harmony export isReadyForDrawing */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getViewChanged; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getMinAndMaxColorMetricValues; });





var reducers = {
    controlPanelState: __WEBPACK_IMPORTED_MODULE_2__control_panel_control_panel_reducers__["a" /* ControlPanelReducer */],
    settingsState: __WEBPACK_IMPORTED_MODULE_3__control_panel_settings_settings_reducers__["a" /* SettingsReducer */],
    visualizationState: __WEBPACK_IMPORTED_MODULE_4__visualization_visualization_reducers__["a" /* VisualizationReducer */]
};
var combined = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__ngrx_store__["h" /* combineReducers */])(reducers);
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
var isScreenshotRequested = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(getControlPanelState, __WEBPACK_IMPORTED_MODULE_2__control_panel_control_panel_reducers__["f" /* isScreenshotRequested */]);
var getScreenshots = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(getControlPanelState, __WEBPACK_IMPORTED_MODULE_2__control_panel_control_panel_reducers__["g" /* getScreenshots */]);
var getMetricsLoading = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(getVisualizationState, __WEBPACK_IMPORTED_MODULE_4__visualization_visualization_reducers__["b" /* getMetricsLoading */]);
var getMetricTree = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(getVisualizationState, __WEBPACK_IMPORTED_MODULE_4__visualization_visualization_reducers__["c" /* getMetricTree */]);
var getUniqueFileList = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(getVisualizationState, __WEBPACK_IMPORTED_MODULE_4__visualization_visualization_reducers__["d" /* getUniqueFileList */]);
var getMinColorMetricValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(getVisualizationState, __WEBPACK_IMPORTED_MODULE_4__visualization_visualization_reducers__["e" /* getMinColorMetricValue */]);
var getMaxColorMetricValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(getVisualizationState, __WEBPACK_IMPORTED_MODULE_4__visualization_visualization_reducers__["f" /* getMaxColorMetricValue */]);
var getMetricMapping = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(getSettingsState, __WEBPACK_IMPORTED_MODULE_3__control_panel_settings_settings_reducers__["b" /* getMetricMapping */]);
var getActiveFilter = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(getSettingsState, __WEBPACK_IMPORTED_MODULE_3__control_panel_settings_settings_reducers__["c" /* getActiveFilter */]);
var getActiveViewType = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(getSettingsState, __WEBPACK_IMPORTED_MODULE_3__control_panel_settings_settings_reducers__["d" /* getActiveViewType */]);
var isReadyForLoadingMetrics = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(getCommits, getLeftCommit, getRightCommit, getMetricMapping, function (commits, leftCommit, rightCommit, metricMapping) {
    if (commits && commits.length > 2 && leftCommit !== null && rightCommit !== null) {
        return {
            leftCommit: leftCommit,
            rightCommit: rightCommit,
            metricMapping: metricMapping
        };
    }
});
var isReadyForDrawing = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(getMetricsLoading, getMetricTree, getMinColorMetricValue, getMaxColorMetricValue, function (metricsLoading, metricTree, minColorMetricValue, maxColorMetricValue) {
    if (!metricsLoading && metricTree !== null && minColorMetricValue && maxColorMetricValue) {
        return {
            metricTree: metricTree,
            minColorMetricValue: minColorMetricValue,
            maxColorMetricValue: maxColorMetricValue
        };
    }
});
var getViewChanged = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(getActiveViewType, isReadyForDrawing, getActiveFilter, function (activeViewType, isReadyForDrawing, activeFilter) {
    if (isReadyForDrawing) {
        return {
            activeViewType: activeViewType,
            isReadyForDrawing: isReadyForDrawing,
            activeFilter: activeFilter
        };
    }
});
var getMinAndMaxColorMetricValues = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(getMetricsLoading, getMetricTree, getMinColorMetricValue, getMaxColorMetricValue, function (metricsLoading, metricTree, minColorMetricValue, maxColorMetricValue) {
    if (!metricsLoading && metricTree !== null && minColorMetricValue && maxColorMetricValue) {
        return {
            minColorMetricValue: minColorMetricValue,
            maxColorMetricValue: maxColorMetricValue
        };
    }
});
//# sourceMappingURL=reducers.js.map

/***/ }),

/***/ 26:
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
AppConfig.CAMERA_NEAR = 1;
AppConfig.CAMERA_FAR = 100000;
AppConfig.CAMERA_DISTANCE_TO_FOCUSSED_ELEMENT = 200;
AppConfig.CAMERA_START_POSITION = {
    x: 1000, y: 1000, z: 1000
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

/***/ 291:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 291;


/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(36);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 31:
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

/***/ 318:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_mocks_mock_data__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular_in_memory_web_api__ = __webpack_require__(351);
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

/***/ 319:
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
        template: __webpack_require__(432),
        styles: [__webpack_require__(407)]
    }),
    __metadata("design:paramtypes", [])
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__control_panel_control_panel_module__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__visualization_visualization_module__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_reducers__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngrx_store__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ngrx_effects__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ngrx_store_devtools__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__shared_effects__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__XHRBackendFactory__ = __webpack_require__(318);
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
            }
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_reducers__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__control_panel_actions__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__enum_CommitType__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
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
    function CommitChooserComponent(store) {
        this.store = store;
    }
    CommitChooserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading$ = this.store.select(__WEBPACK_IMPORTED_MODULE_2__shared_reducers__["l" /* getCommitsLoading */]);
        this.subscription = this.store.select(__WEBPACK_IMPORTED_MODULE_2__shared_reducers__["m" /* getCommits */]).subscribe(function (commits) {
            _this.commits = commits;
        });
        this.store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__control_panel_actions__["m" /* loadCommits */])());
    };
    CommitChooserComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    CommitChooserComponent.prototype.handleValueChanged = function (chosenModel) {
        this.store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__control_panel_actions__["n" /* changeCommit */])(this.commitType, chosenModel));
    };
    CommitChooserComponent.prototype.formatCommit = function (data) {
        var formattedDateAndTime = __WEBPACK_IMPORTED_MODULE_5_moment__(data.timestamp).format('DD.MM.YYYY HH:mm');
        return formattedDateAndTime + ", " + data.author + ", " + data.name.substr(0, 7);
    };
    return CommitChooserComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__enum_CommitType__["a" /* CommitType */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__enum_CommitType__["a" /* CommitType */]) === "function" && _a || Object)
], CommitChooserComponent.prototype, "commitType", void 0);
CommitChooserComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-commit-chooser',
        template: __webpack_require__(433),
        styles: [__webpack_require__(408)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["g" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["g" /* Store */]) === "function" && _b || Object])
], CommitChooserComponent);

var _a, _b;
//# sourceMappingURL=commit-chooser.component.js.map

/***/ }),

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enum_CommitType__ = __webpack_require__(79);
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
    function ControlPanelComponent() {
        this.commitTypes = {
            left: __WEBPACK_IMPORTED_MODULE_1__enum_CommitType__["a" /* CommitType */].LEFT,
            right: __WEBPACK_IMPORTED_MODULE_1__enum_CommitType__["a" /* CommitType */].RIGHT
        };
    }
    ControlPanelComponent.prototype.ngOnInit = function () {
    };
    return ControlPanelComponent;
}());
ControlPanelComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-control-panel',
        template: __webpack_require__(434),
        styles: [__webpack_require__(409)]
    }),
    __metadata("design:paramtypes", [])
], ControlPanelComponent);

//# sourceMappingURL=control-panel.component.js.map

/***/ }),

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__control_panel_component__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_settings_component__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__settings_view_control_view_control_component__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngui_auto_complete__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngui_auto_complete___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__ngui_auto_complete__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__commit_chooser_commit_chooser_component__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__service_commit_service__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__environments_environment__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__service_mocks_commit_mock_service__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__search_search_component__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__settings_filter_filter_component__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__settings_metric_mapping_metric_mapping_component__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__screenshot_screenshot_component__ = __webpack_require__(325);
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
            __WEBPACK_IMPORTED_MODULE_14__screenshot_screenshot_component__["a" /* ScreenshotComponent */]
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

/***/ 324:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__control_panel_actions__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enum_CommitType__ = __webpack_require__(79);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ControlPanelReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getCommits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getCommitsLoading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getLeftCommit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getRightCommit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return isScreenshotRequested; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getScreenshots; });


var initialState = {
    commits: [],
    commitsLoading: false,
    leftCommit: null,
    rightCommit: null,
    screenshotRequested: false,
    screenshots: []
};
var ControlPanelReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    var newState;
    switch (action.type) {
        case __WEBPACK_IMPORTED_MODULE_0__control_panel_actions__["a" /* LOAD_COMMITS */]:
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
        case __WEBPACK_IMPORTED_MODULE_0__control_panel_actions__["g" /* REQUEST_SCREENSHOT */]:
            newState = Object.assign({}, state);
            newState.screenshotRequested = true;
            return newState;
        case __WEBPACK_IMPORTED_MODULE_0__control_panel_actions__["h" /* ADD_SCREENSHOT */]:
            newState = Object.assign({}, state);
            newState.screenshots = state.screenshots.concat([action.payload]);
            newState.screenshotRequested = false;
            return newState;
        case __WEBPACK_IMPORTED_MODULE_0__control_panel_actions__["i" /* CLEAR_SCREENSHOTS */]:
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
var isScreenshotRequested = function (state) { return state.screenshotRequested; };
var getScreenshots = function (state) { return state.screenshots; };
//# sourceMappingURL=control-panel.reducers.js.map

/***/ }),

/***/ 325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_reducers__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__control_panel_actions__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__enum_ScreenType__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__enum_ViewType__ = __webpack_require__(54);
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
    function ScreenshotComponent(store) {
        this.store = store;
        this.subscriptions = [];
        this.screenTypes = {
            left: __WEBPACK_IMPORTED_MODULE_4__enum_ScreenType__["a" /* ScreenType */].LEFT,
            right: __WEBPACK_IMPORTED_MODULE_4__enum_ScreenType__["a" /* ScreenType */].RIGHT
        };
        this.viewTypes = {
            merged: __WEBPACK_IMPORTED_MODULE_5__enum_ViewType__["a" /* ViewType */].MERGED,
            split: __WEBPACK_IMPORTED_MODULE_5__enum_ViewType__["a" /* ViewType */].SPLIT
        };
        this.isGenerating = false;
    }
    ScreenshotComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions.push(this.store.select(__WEBPACK_IMPORTED_MODULE_1__shared_reducers__["h" /* getActiveViewType */]).subscribe(function (activeViewType) {
            _this.activeViewType = activeViewType;
            _this.removeScreenshots();
        }));
    };
    ScreenshotComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
    };
    ScreenshotComponent.prototype.takeScreenshot = function () {
        this.store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__control_panel_actions__["k" /* requestScreenshot */])());
    };
    ScreenshotComponent.prototype.generateGif = function (screenType) {
        var _this = this;
        this.store.select(__WEBPACK_IMPORTED_MODULE_1__shared_reducers__["i" /* getScreenshots */]).subscribe(function (screenshots) {
            if (screenshots.length > 0) {
                var images = screenshots.filter(function (screenshotObject) { return screenshotObject.screenType === screenType; }).map(function (screenshotObject) { return screenshotObject.file; });
                if (!images.length) {
                    return;
                }
                _this.isGenerating = true;
                gifshot.createGIF({
                    images: images,
                    interval: 1,
                    gifWidth: _this.activeViewType === __WEBPACK_IMPORTED_MODULE_5__enum_ViewType__["a" /* ViewType */].SPLIT ? window.innerWidth / 2 : window.innerWidth,
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
        }).unsubscribe();
    };
    ScreenshotComponent.prototype.removeScreenshots = function () {
        this.store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__control_panel_actions__["l" /* clearScreenshots */])());
        this.gifSource = undefined;
    };
    return ScreenshotComponent;
}());
ScreenshotComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-screenshot',
        template: __webpack_require__(435),
        styles: [__webpack_require__(410)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["g" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["g" /* Store */]) === "function" && _a || Object])
], ScreenshotComponent);

var _a;
//# sourceMappingURL=screenshot.component.js.map

/***/ }),

/***/ 326:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_reducers__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__(14);
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
    function SearchComponent(store) {
        this.store = store;
        this.uniqueFileList = [];
    }
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.store.select(__WEBPACK_IMPORTED_MODULE_1__shared_reducers__["k" /* getUniqueFileList */]).subscribe(function (fileList) {
            _this.uniqueFileList = fileList;
        });
    };
    SearchComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    SearchComponent.prototype.handleValueChanged = function (chosenItem) {
        console.log(chosenItem);
    };
    SearchComponent.prototype.autocompleteListFormatter = function (data) {
        return data;
    };
    return SearchComponent;
}());
SearchComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-search',
        template: __webpack_require__(436),
        styles: [__webpack_require__(411)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["g" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["g" /* Store */]) === "function" && _a || Object])
], SearchComponent);

var _a;
//# sourceMappingURL=search.component.js.map

/***/ }),

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_reducers__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_actions__ = __webpack_require__(40);
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
    function FilterComponent(store) {
        this.store = store;
    }
    FilterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.store.select(__WEBPACK_IMPORTED_MODULE_2__shared_reducers__["c" /* getActiveFilter */]).subscribe(function (activeFilter) {
            _this.activeFilter = activeFilter;
        });
    };
    FilterComponent.prototype.handleFilterChanged = function () {
        this.store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__settings_actions__["e" /* changeActiveFilter */])(this.activeFilter));
    };
    FilterComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    return FilterComponent;
}());
FilterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-filter',
        template: __webpack_require__(437),
        styles: [__webpack_require__(412)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["g" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["g" /* Store */]) === "function" && _a || Object])
], FilterComponent);

var _a;
//# sourceMappingURL=filter.component.js.map

/***/ }),

/***/ 328:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_reducers__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_actions__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helper_metric_name_helper__ = __webpack_require__(334);
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
    function MetricMappingComponent(store) {
        this.store = store;
    }
    MetricMappingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.metricNames = __WEBPACK_IMPORTED_MODULE_4__helper_metric_name_helper__["a" /* MetricNameHelper */].getAll();
        this.subscription = this.store.select(__WEBPACK_IMPORTED_MODULE_2__shared_reducers__["j" /* getMetricMapping */]).subscribe(function (metricMapping) {
            _this.metricMapping = metricMapping;
        });
    };
    MetricMappingComponent.prototype.applyMetricMappings = function () {
        this.store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__settings_actions__["d" /* setMetricMapping */])(this.metricMapping));
    };
    MetricMappingComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    return MetricMappingComponent;
}());
MetricMappingComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-metric-mapping',
        template: __webpack_require__(438),
        styles: [__webpack_require__(413)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["g" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["g" /* Store */]) === "function" && _a || Object])
], MetricMappingComponent);

var _a;
//# sourceMappingURL=metric-mapping.component.js.map

/***/ }),

/***/ 329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
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
    function SettingsComponent() {
    }
    SettingsComponent.prototype.ngOnInit = function () {
        // prevent bootstrap dropdown from being closed by clicking on its content
        $(document).on('click', '.dropdown-menu', function (e) {
            e.stopPropagation();
        });
    };
    return SettingsComponent;
}());
SettingsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-settings',
        template: __webpack_require__(439),
        styles: [__webpack_require__(414)]
    }),
    __metadata("design:paramtypes", [])
], SettingsComponent);

//# sourceMappingURL=settings.component.js.map

/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_actions__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enum_ViewType__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AppConfig__ = __webpack_require__(26);
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

/***/ 331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enum_ViewType__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_reducers__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__settings_actions__ = __webpack_require__(40);
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
    function ViewControlComponent(store) {
        this.store = store;
        this.viewTypes = {
            split: __WEBPACK_IMPORTED_MODULE_1__enum_ViewType__["a" /* ViewType */].SPLIT,
            merged: __WEBPACK_IMPORTED_MODULE_1__enum_ViewType__["a" /* ViewType */].MERGED
        };
    }
    ViewControlComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.store.select(__WEBPACK_IMPORTED_MODULE_3__shared_reducers__["h" /* getActiveViewType */]).subscribe(function (activeViewType) {
            _this.activeViewType = activeViewType;
        });
    };
    ViewControlComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    ViewControlComponent.prototype.changeViewType = function (value) {
        this.store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__settings_actions__["f" /* changeViewType */])(value === 0 ? __WEBPACK_IMPORTED_MODULE_1__enum_ViewType__["a" /* ViewType */].SPLIT : __WEBPACK_IMPORTED_MODULE_1__enum_ViewType__["a" /* ViewType */].MERGED));
    };
    return ViewControlComponent;
}());
ViewControlComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-view-control',
        template: __webpack_require__(440),
        styles: [__webpack_require__(415)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["g" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["g" /* Store */]) === "function" && _a || Object])
], ViewControlComponent);

var _a;
//# sourceMappingURL=view-control.component.js.map

/***/ }),

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AppConfig__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enum_NodeType__ = __webpack_require__(31);
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

/***/ 333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(110);
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

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AppConfig__ = __webpack_require__(26);
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

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(20);
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

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(20);
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

/***/ 337:
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

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__control_panel_control_panel_actions__ = __webpack_require__(39);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__control_panel_control_panel_actions__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__control_panel_control_panel_actions__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__control_panel_control_panel_actions__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__control_panel_settings_settings_actions__ = __webpack_require__(40);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__visualization_visualization_actions__ = __webpack_require__(80);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__visualization_visualization_actions__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_2__visualization_visualization_actions__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_2__visualization_visualization_actions__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_2__visualization_visualization_actions__["d"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_2__visualization_visualization_actions__["e"]; });



//# sourceMappingURL=actions.js.map

/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_effects__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(446);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_actions__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_commit_service__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_metric_service__ = __webpack_require__(126);
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
                __WEBPACK_IMPORTED_MODULE_3__shared_actions__["f" /* calculateMinimumAndMaximumValues */](result.rootNode),
                __WEBPACK_IMPORTED_MODULE_3__shared_actions__["g" /* generateUniqueFileList */](result.rootNode)
            ];
        })
            .catch(function (response) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].of(__WEBPACK_IMPORTED_MODULE_3__shared_actions__["h" /* loadMetricTreeError */](response.error));
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

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enum_ScreenType__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_enum_NodeType__ = __webpack_require__(31);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InteractionHandler; });
var Raycaster = THREE.Raycaster;
var Vector2 = THREE.Vector2;


var InteractionHandler = (function () {
    function InteractionHandler(scene, renderer, screenType, isMergedView) {
        this.enabled = false;
        this.raycaster = new Raycaster();
        this.mouse = new Vector2();
        this.mouseForRaycaster = new Vector2();
        this.tooltipElement = document.querySelector('#tooltip');
        this.hoveredElementUuid = undefined;
        this.clickedElementUuid = undefined;
        this.startingPosition = {};
        this.scene = scene;
        this.renderer = renderer;
        this.screenType = screenType;
        this.isMergedView = isMergedView;
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
                this.tooltipElement.innerHTML = target.userData.tooltipLabel;
                this.hoveredElementUuid = target.uuid;
            }
            if (!this.tooltipElement.classList.contains('visible')) {
                this.tooltipElement.classList.add('visible');
            }
            this.tooltipElement.style.left = this.mouse.x + 15 + 'px';
            this.tooltipElement.style.top = this.mouse.y + 15 + 'px';
        }
        else {
            if (this.tooltipElement.classList.contains('visible')) {
                this.hideTooltip();
            }
        }
    };
    InteractionHandler.prototype.hideTooltip = function () {
        this.tooltipElement.classList.remove('visible');
        this.tooltipElement.style.left = '-1000px';
        this.tooltipElement.style.top = '-1000px';
    };
    InteractionHandler.prototype.onDocumentMouseOver = function () {
        this.enabled = true;
    };
    InteractionHandler.prototype.onDocumentMouseOut = function () {
        this.enabled = false;
        this.hideTooltip();
    };
    InteractionHandler.prototype.onDocumentMouseMove = function (event) {
        if (!this.enabled) {
            return;
        }
        this.mouse.x = event.clientX;
        this.mouse.y = event.clientY;
        var screenOffset = this.screenType === __WEBPACK_IMPORTED_MODULE_0__enum_ScreenType__["a" /* ScreenType */].LEFT ? 0 : this.getScreenWidth();
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
                var doReset = void 0;
                if (target.uuid != this.clickedElementUuid) {
                    doReset = false;
                    this.clickedElementUuid = target.uuid;
                }
                else {
                    doReset = true;
                    this.clickedElementUuid = undefined;
                }
                console.log('element clicked');
                // PubSub.publish('elementClicked', { elementName: target.name, doReset: doReset });
            }
            else if (event.which == 3) {
                if (target.userData && target.userData.type === __WEBPACK_IMPORTED_MODULE_1_app_enum_NodeType__["a" /* NodeType */].MODULE) {
                    event.preventDefault();
                    // PubSub.publish('elementRightClicked', { elementName: target.name, position: { x: event.clientX, y: event.clientY } });
                }
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

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enum_ScreenType__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngrx_store__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_reducers__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__enum_ViewType__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__view_split_view__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__view_merged_view__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__enum_NodeType__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__control_panel_control_panel_actions__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__interaction_handler_interaction_handler__ = __webpack_require__(340);
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
    function ScreenComponent(store) {
        this.store = store;
        this.subscriptions = [];
        this.isMergedView = false;
        this.renderingIsPaused = false;
        this.scene = new __WEBPACK_IMPORTED_MODULE_2_three__["Scene"]();
        // use THREE.PerspectiveCamera instead of importing PerspectiveCamera to avoid warning for panning and zooming are disabled (see https://github.com/nicolaspanel/three-orbitcontrols-ts/issues/1)
        this.camera = new THREE.PerspectiveCamera(45, (this.getScreenWidth() - 0) / window.innerHeight, 0.1, 10000);
    }
    ScreenComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.view = new __WEBPACK_IMPORTED_MODULE_6__view_split_view__["a" /* SplitView */](this.screenType, this.store);
        this.createCamera();
        this.createLight();
        this.createRenderer();
        this.createInteractionHandler();
        this.controls = new THREE.OrbitControls(this.camera, document.querySelector('#stage'));
        this.initializeEventListeners();
        this.render();
        this.subscriptions.push(this.store.select(__WEBPACK_IMPORTED_MODULE_4__shared_reducers__["b" /* getViewChanged */]).subscribe(function (result) {
            if (result) {
                _this.isMergedView = result.activeViewType === __WEBPACK_IMPORTED_MODULE_5__enum_ViewType__["a" /* ViewType */].MERGED;
                _this.interactionHandler.setIsMergedView(_this.isMergedView);
                if (_this.isMergedView) {
                    _this.view = new __WEBPACK_IMPORTED_MODULE_7__view_merged_view__["a" /* MergedView */](_this.screenType);
                    if (_this.screenType === __WEBPACK_IMPORTED_MODULE_1__enum_ScreenType__["a" /* ScreenType */].RIGHT) {
                        _this.pauseRendering();
                    }
                    document.querySelector('#stage').classList.remove('split');
                }
                else {
                    _this.view = new __WEBPACK_IMPORTED_MODULE_6__view_split_view__["a" /* SplitView */](_this.screenType, _this.store);
                    if (_this.screenType === __WEBPACK_IMPORTED_MODULE_1__enum_ScreenType__["a" /* ScreenType */].RIGHT) {
                        _this.resumeRendering();
                    }
                    document.querySelector('#stage').classList.add('split');
                }
                _this.resetScene();
                _this.prepareView(result.isReadyForDrawing.metricTree);
                _this.applyFilter(result.activeFilter);
                _this.handleViewChanged();
            }
        }));
        this.subscriptions.push(this.store.select(__WEBPACK_IMPORTED_MODULE_4__shared_reducers__["c" /* getActiveFilter */]).subscribe(function (activeFilter) {
            _this.applyFilter(activeFilter);
        }));
        this.subscriptions.push(this.store.select(__WEBPACK_IMPORTED_MODULE_4__shared_reducers__["d" /* isScreenshotRequested */]).subscribe(function (isRequested) {
            if (isRequested) {
                var imgFromCanvas = _this.renderer.domElement.toDataURL('image/png');
                var pngFile = imgFromCanvas.replace(/^data:image\/png/, 'data:application/octet-stream');
                _this.store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__control_panel_control_panel_actions__["j" /* addScreenshot */])({
                    screenType: _this.screenType,
                    file: pngFile
                }));
            }
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
        this.camera.position.z = 100;
        this.scene.add(this.camera);
    };
    ScreenComponent.prototype.updateCamera = function () {
        this.camera.aspect = (this.getScreenWidth() - 0) / window.innerHeight;
        this.camera.updateProjectionMatrix();
    };
    ScreenComponent.prototype.render = function () {
        var _this = this;
        this.requestAnimationFrameId = requestAnimationFrame(function () {
            _this.render();
        });
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        this.interactionHandler.update(this.camera);
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
        if (this.view instanceof __WEBPACK_IMPORTED_MODULE_7__view_merged_view__["a" /* MergedView */]) {
            this.view.calculateConnections(this.scene);
            this.view.getConnections().forEach(function (blockConnection) {
                _this.scene.add(blockConnection.getCurve());
            });
        }
    };
    ScreenComponent.prototype.createInteractionHandler = function () {
        this.interactionHandler = new __WEBPACK_IMPORTED_MODULE_10__interaction_handler_interaction_handler__["a" /* InteractionHandler */](this.scene, this.renderer, this.screenType, this.isMergedView);
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
            if (node.userData && (node.userData.type === __WEBPACK_IMPORTED_MODULE_8__enum_NodeType__["a" /* NodeType */].FILE || node.userData.type === __WEBPACK_IMPORTED_MODULE_8__enum_NodeType__["a" /* NodeType */].CONNECTION)) {
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
ScreenComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-screen',
        template: __webpack_require__(441),
        styles: [__webpack_require__(416)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__ngrx_store__["g" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ngrx_store__["g" /* Store */]) === "function" && _b || Object])
], ScreenComponent);

var _a, _b;
//# sourceMappingURL=screen.component.js.map

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
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
    function TooltipComponent() {
    }
    TooltipComponent.prototype.ngOnInit = function () {
    };
    return TooltipComponent;
}());
TooltipComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-tooltip',
        template: __webpack_require__(442),
        styles: [__webpack_require__(417)]
    }),
    __metadata("design:paramtypes", [])
], TooltipComponent);

//# sourceMappingURL=tooltip.component.js.map

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__abstract_view__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_element_analyzer__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AppConfig__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__enum_NodeType__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helper_color_helper__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__enum_CommitReferenceType__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_geometry_block_connection__ = __webpack_require__(332);
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

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__abstract_view__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enum_NodeType__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AppConfig__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__enum_CommitReferenceType__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helper_color_helper__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__helper_element_analyzer__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_reducers__ = __webpack_require__(18);
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
    function SplitView(screenType, store) {
        var _this = _super.call(this, screenType) || this;
        // no dependency injection as the view class are constructed with "new" instead with Angular
        _this.store = store;
        _this.subscription = _this.store.select(__WEBPACK_IMPORTED_MODULE_6__shared_reducers__["e" /* getMinAndMaxColorMetricValues */]).subscribe(function (result) {
            if (result) {
                _this.minColorMetricValue = result.minColorMetricValue;
                _this.maxColorMetricValue = result.maxColorMetricValue;
            }
        });
        return _this;
    }
    SplitView.prototype.calculateElements = function (nodes, parent, bottom) {
        var _this = this;
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

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enum_ScreenType__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_reducers__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__visualization_actions__ = __webpack_require__(80);
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
        this.metricsLoading$ = this.store.select(__WEBPACK_IMPORTED_MODULE_3__shared_reducers__["f" /* getMetricsLoading */]);
        this.subscriptions.push(this.store.select(__WEBPACK_IMPORTED_MODULE_3__shared_reducers__["g" /* isReadyForLoadingMetrics */]).subscribe(function (result) {
            if (result) {
                _this.store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__visualization_actions__["j" /* loadMetricTree */])(result.leftCommit, result.rightCommit, result.metricMapping));
            }
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
        template: __webpack_require__(443),
        styles: [__webpack_require__(418)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["g" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["g" /* Store */]) === "function" && _a || Object])
], VisualizationComponent);

var _a;
//# sourceMappingURL=visualization.component.js.map

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__visualization_component__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__screen_screen_component__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_metric_service__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_mocks_metric_mock_service__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__tooltip_tooltip_component__ = __webpack_require__(342);
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
            __WEBPACK_IMPORTED_MODULE_7__tooltip_tooltip_component__["a" /* TooltipComponent */]
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

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__visualization_actions__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_element_analyzer__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AppConfig__ = __webpack_require__(26);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VisualizationReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getMetricsLoading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getMetricTree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getUniqueFileList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getMinColorMetricValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getMaxColorMetricValue; });



var initialState = {
    metricsLoading: false,
    metricTree: null,
    uniqueFileList: [],
    minColorMetricValue: undefined,
    maxColorMetricValue: undefined
};
var VisualizationReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    var newState;
    switch (action.type) {
        case __WEBPACK_IMPORTED_MODULE_0__visualization_actions__["a" /* LOAD_METRIC_TREE */]:
            newState = Object.assign({}, state);
            newState.metricsLoading = true;
            return newState;
        case __WEBPACK_IMPORTED_MODULE_0__visualization_actions__["f" /* LOAD_METRIC_TREE_SUCCESS */]:
            newState = Object.assign({}, state);
            newState.metricsLoading = false;
            newState.metricTree = action.payload;
            return newState;
        case __WEBPACK_IMPORTED_MODULE_0__visualization_actions__["g" /* CALCULATE_MINIMUM_AND_MAXIMUM_VALUES */]:
            newState = Object.assign({}, state);
            var minMaxPairOfColorMetric = __WEBPACK_IMPORTED_MODULE_1__helper_element_analyzer__["a" /* ElementAnalyzer */].findSmallestAndBiggestMetricValueByMetricName(newState.metricTree, __WEBPACK_IMPORTED_MODULE_2__AppConfig__["a" /* AppConfig */].COLOR_METRIC_NAME);
            newState.minColorMetricValue = minMaxPairOfColorMetric.min;
            newState.maxColorMetricValue = minMaxPairOfColorMetric.max;
            return newState;
        case __WEBPACK_IMPORTED_MODULE_0__visualization_actions__["h" /* GENERATE_UNIQUE_FILE_LIST */]:
            newState = Object.assign({}, state);
            newState.uniqueFileList = __WEBPACK_IMPORTED_MODULE_1__helper_element_analyzer__["a" /* ElementAnalyzer */].generateUniqueElementList(action.payload);
            return newState;
        case __WEBPACK_IMPORTED_MODULE_0__visualization_actions__["i" /* LOAD_METRIC_TREE_ERROR */]:
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
var getMinColorMetricValue = function (state) { return state.minColorMetricValue; };
var getMaxColorMetricValue = function (state) { return state.maxColorMetricValue; };
//# sourceMappingURL=visualization.reducers.js.map

/***/ }),

/***/ 35:
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

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LOAD_COMMITS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return LOAD_COMMITS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return LOAD_COMMITS_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return CHANGE_COMMIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return REQUEST_SCREENSHOT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return ADD_SCREENSHOT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return CLEAR_SCREENSHOTS; });
/* harmony export (immutable) */ __webpack_exports__["m"] = loadCommits;
/* harmony export (immutable) */ __webpack_exports__["b"] = loadCommitsSuccess;
/* harmony export (immutable) */ __webpack_exports__["c"] = loadCommitsError;
/* harmony export (immutable) */ __webpack_exports__["n"] = changeCommit;
/* harmony export (immutable) */ __webpack_exports__["k"] = requestScreenshot;
/* harmony export (immutable) */ __webpack_exports__["j"] = addScreenshot;
/* harmony export (immutable) */ __webpack_exports__["l"] = clearScreenshots;
var LOAD_COMMITS = 'LOAD_COMMITS';
var LOAD_COMMITS_SUCCESS = 'LOAD_COMMITS_SUCCESS';
var LOAD_COMMITS_ERROR = 'LOAD_COMMITS_ERROR';
var CHANGE_COMMIT = 'CHANGE_COMMIT';
var REQUEST_SCREENSHOT = 'REQUEST_SCREENSHOT';
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
function requestScreenshot() {
    return {
        type: REQUEST_SCREENSHOT
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

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CHANGE_VIEW_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CHANGE_ACTIVE_FILTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SET_METRIC_MAPPING; });
/* harmony export (immutable) */ __webpack_exports__["f"] = changeViewType;
/* harmony export (immutable) */ __webpack_exports__["e"] = changeActiveFilter;
/* harmony export (immutable) */ __webpack_exports__["d"] = setMetricMapping;
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

/***/ 407:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 408:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 409:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, "#control-panel {\n  position: absolute;\n  top: 0;\n  width: 100%;\n  height: 80px;\n  background: #fff;\n  box-shadow: rgba(0, 0, 0, 0.2) 0 2px 6px 0;\n  z-index: 101; }\n  #control-panel > .control-container {\n    position: relative;\n    float: left;\n    margin: 10px;\n    height: 50px; }\n    #control-panel > .control-container:last-child {\n      float: right; }\n    #control-panel > .control-container .control-item {\n      display: inline-block;\n      padding: 5px; }\n    #control-panel > .control-container .control-label {\n      font-size: 12px;\n      display: block;\n      margin-top: 5px; }\n    #control-panel > .control-container .checkbox-container {\n      position: relative; }\n    #control-panel > .control-container .checkbox-icon {\n      position: absolute;\n      top: 0;\n      width: 30px;\n      height: 30px; }\n    #control-panel > .control-container .checkbox-icon.left {\n      left: 0; }\n    #control-panel > .control-container .checkbox-icon.right {\n      right: 0; }\n    #control-panel > .control-container #search-input {\n      padding-right: 30px; }\n    #control-panel > .control-container button {\n      height: 100%; }\n  #control-panel .divider {\n    height: 60px;\n    border-left: 1px solid #ccc;\n    float: left;\n    margin: 5px 10px; }\n  #control-panel #search-auto-complete-wrapper i {\n    position: absolute;\n    padding: 0 5px;\n    background: #fff;\n    line-height: 30px;\n    color: #ccc; }\n  #control-panel #search-auto-complete-wrapper input[type=text] {\n    text-indent: 28px; }\n  #control-panel #render-calls {\n    position: absolute;\n    top: 0;\n    right: 0;\n    font-size: 10px;\n    z-index: 10000; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 410:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, "img#gif {\n  width: 100%;\n  margin-bottom: 1rem; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 411:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 412:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 413:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 414:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 415:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 416:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 417:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, "#tooltip {\n  position: absolute;\n  top: 0;\n  left: 0;\n  background-color: #2B222A;\n  color: #fff;\n  padding: 10px;\n  font-size: 14px;\n  max-width: 300px;\n  z-index: 99;\n  opacity: 0;\n  transition: opacity 0.75s ease; }\n  #tooltip.visible {\n    opacity: 1; }\n  #tooltip > .element-name {\n    text-overflow: ellipsis;\n    text-align: left;\n    white-space: nowrap;\n    overflow: hidden;\n    direction: rtl;\n    padding-bottom: 10px; }\n  #tooltip table td.metric-name-column {\n    font-weight: bold; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 418:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, "#stage {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  overflow: hidden; }\n  #stage > .vertical-line {\n    position: absolute;\n    top: 0;\n    left: 100%;\n    height: 100%;\n    width: 2px;\n    background: #535353;\n    z-index: 98;\n    transition: left 1s ease; }\n  #stage.split > .vertical-line {\n    left: 50%; }\n  #stage.split > .loading-indicator-container > .left {\n    left: 25%; }\n  #stage.split > .loading-indicator-container > .right {\n    left: 75%; }\n  #stage > .loading-indicator-container {\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    background: rgba(0, 0, 0, 0.7);\n    top: 70px;\n    left: 0;\n    z-index: 99; }\n    #stage > .loading-indicator-container > .left {\n      left: 50%; }\n    #stage > .loading-indicator-container > .right {\n      left: 200%; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 422:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 142,
	"./af.js": 142,
	"./ar": 149,
	"./ar-dz": 143,
	"./ar-dz.js": 143,
	"./ar-kw": 144,
	"./ar-kw.js": 144,
	"./ar-ly": 145,
	"./ar-ly.js": 145,
	"./ar-ma": 146,
	"./ar-ma.js": 146,
	"./ar-sa": 147,
	"./ar-sa.js": 147,
	"./ar-tn": 148,
	"./ar-tn.js": 148,
	"./ar.js": 149,
	"./az": 150,
	"./az.js": 150,
	"./be": 151,
	"./be.js": 151,
	"./bg": 152,
	"./bg.js": 152,
	"./bn": 153,
	"./bn.js": 153,
	"./bo": 154,
	"./bo.js": 154,
	"./br": 155,
	"./br.js": 155,
	"./bs": 156,
	"./bs.js": 156,
	"./ca": 157,
	"./ca.js": 157,
	"./cs": 158,
	"./cs.js": 158,
	"./cv": 159,
	"./cv.js": 159,
	"./cy": 160,
	"./cy.js": 160,
	"./da": 161,
	"./da.js": 161,
	"./de": 164,
	"./de-at": 162,
	"./de-at.js": 162,
	"./de-ch": 163,
	"./de-ch.js": 163,
	"./de.js": 164,
	"./dv": 165,
	"./dv.js": 165,
	"./el": 166,
	"./el.js": 166,
	"./en-au": 167,
	"./en-au.js": 167,
	"./en-ca": 168,
	"./en-ca.js": 168,
	"./en-gb": 169,
	"./en-gb.js": 169,
	"./en-ie": 170,
	"./en-ie.js": 170,
	"./en-nz": 171,
	"./en-nz.js": 171,
	"./eo": 172,
	"./eo.js": 172,
	"./es": 174,
	"./es-do": 173,
	"./es-do.js": 173,
	"./es.js": 174,
	"./et": 175,
	"./et.js": 175,
	"./eu": 176,
	"./eu.js": 176,
	"./fa": 177,
	"./fa.js": 177,
	"./fi": 178,
	"./fi.js": 178,
	"./fo": 179,
	"./fo.js": 179,
	"./fr": 182,
	"./fr-ca": 180,
	"./fr-ca.js": 180,
	"./fr-ch": 181,
	"./fr-ch.js": 181,
	"./fr.js": 182,
	"./fy": 183,
	"./fy.js": 183,
	"./gd": 184,
	"./gd.js": 184,
	"./gl": 185,
	"./gl.js": 185,
	"./gom-latn": 186,
	"./gom-latn.js": 186,
	"./he": 187,
	"./he.js": 187,
	"./hi": 188,
	"./hi.js": 188,
	"./hr": 189,
	"./hr.js": 189,
	"./hu": 190,
	"./hu.js": 190,
	"./hy-am": 191,
	"./hy-am.js": 191,
	"./id": 192,
	"./id.js": 192,
	"./is": 193,
	"./is.js": 193,
	"./it": 194,
	"./it.js": 194,
	"./ja": 195,
	"./ja.js": 195,
	"./jv": 196,
	"./jv.js": 196,
	"./ka": 197,
	"./ka.js": 197,
	"./kk": 198,
	"./kk.js": 198,
	"./km": 199,
	"./km.js": 199,
	"./kn": 200,
	"./kn.js": 200,
	"./ko": 201,
	"./ko.js": 201,
	"./ky": 202,
	"./ky.js": 202,
	"./lb": 203,
	"./lb.js": 203,
	"./lo": 204,
	"./lo.js": 204,
	"./lt": 205,
	"./lt.js": 205,
	"./lv": 206,
	"./lv.js": 206,
	"./me": 207,
	"./me.js": 207,
	"./mi": 208,
	"./mi.js": 208,
	"./mk": 209,
	"./mk.js": 209,
	"./ml": 210,
	"./ml.js": 210,
	"./mr": 211,
	"./mr.js": 211,
	"./ms": 213,
	"./ms-my": 212,
	"./ms-my.js": 212,
	"./ms.js": 213,
	"./my": 214,
	"./my.js": 214,
	"./nb": 215,
	"./nb.js": 215,
	"./ne": 216,
	"./ne.js": 216,
	"./nl": 218,
	"./nl-be": 217,
	"./nl-be.js": 217,
	"./nl.js": 218,
	"./nn": 219,
	"./nn.js": 219,
	"./pa-in": 220,
	"./pa-in.js": 220,
	"./pl": 221,
	"./pl.js": 221,
	"./pt": 223,
	"./pt-br": 222,
	"./pt-br.js": 222,
	"./pt.js": 223,
	"./ro": 224,
	"./ro.js": 224,
	"./ru": 225,
	"./ru.js": 225,
	"./sd": 226,
	"./sd.js": 226,
	"./se": 227,
	"./se.js": 227,
	"./si": 228,
	"./si.js": 228,
	"./sk": 229,
	"./sk.js": 229,
	"./sl": 230,
	"./sl.js": 230,
	"./sq": 231,
	"./sq.js": 231,
	"./sr": 233,
	"./sr-cyrl": 232,
	"./sr-cyrl.js": 232,
	"./sr.js": 233,
	"./ss": 234,
	"./ss.js": 234,
	"./sv": 235,
	"./sv.js": 235,
	"./sw": 236,
	"./sw.js": 236,
	"./ta": 237,
	"./ta.js": 237,
	"./te": 238,
	"./te.js": 238,
	"./tet": 239,
	"./tet.js": 239,
	"./th": 240,
	"./th.js": 240,
	"./tl-ph": 241,
	"./tl-ph.js": 241,
	"./tlh": 242,
	"./tlh.js": 242,
	"./tr": 243,
	"./tr.js": 243,
	"./tzl": 244,
	"./tzl.js": 244,
	"./tzm": 246,
	"./tzm-latn": 245,
	"./tzm-latn.js": 245,
	"./tzm.js": 246,
	"./uk": 247,
	"./uk.js": 247,
	"./ur": 248,
	"./ur.js": 248,
	"./uz": 250,
	"./uz-latn": 249,
	"./uz-latn.js": 249,
	"./uz.js": 250,
	"./vi": 251,
	"./vi.js": 251,
	"./x-pseudo": 252,
	"./x-pseudo.js": 252,
	"./yo": 253,
	"./yo.js": 253,
	"./zh-cn": 254,
	"./zh-cn.js": 254,
	"./zh-hk": 255,
	"./zh-hk.js": 255,
	"./zh-tw": 256,
	"./zh-tw.js": 256
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
webpackContext.id = 422;


/***/ }),

/***/ 432:
/***/ (function(module, exports) {

module.exports = "<app-control-panel></app-control-panel>\n<app-visualization></app-visualization>"

/***/ }),

/***/ 433:
/***/ (function(module, exports) {

module.exports = "<input class=\"form-control\"\n       placeholder=\"Datum, Commit-ID, Autor\"\n       ngui-auto-complete [(ngModel)]=\"selected\"\n       [source]=\"commits\"\n       [value-formatter]=\"formatCommit\"\n       [list-formatter]=\"formatCommit\"\n       value-property-name=\"id\"\n       display-property-name=\"name\"\n       no-match-found-text=\"Nichts gefunden.\"\n       match-formatted=\"true\"\n       (valueChanged)=\"handleValueChanged($event)\" />\n<p *ngIf=\"loading$ | async\">LADE</p>"

/***/ }),

/***/ 434:
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n    <form id=\"control-panel\" class=\"row align-items-center justify-content-between\">\n        <div class=\"col-4\">\n            <div class=\"row\">\n                <div class=\"col-6\">\n                    <small>Erste Revision</small>\n                    <app-commit-chooser [commitType]=\"commitTypes.left\"></app-commit-chooser>\n                </div>\n\n                <div class=\"col-6\">\n                    <small>Zweite Revision</small>\n                    <app-commit-chooser [commitType]=\"commitTypes.right\"></app-commit-chooser>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-6\">\n            <app-settings></app-settings>\n            <app-screenshot></app-screenshot>\n        </div>\n        <div class=\"col-2\">\n            <small>Suche</small>\n            <app-search></app-search>\n        </div>\n    </form>\n</div>"

/***/ }),

/***/ 435:
/***/ (function(module, exports) {

module.exports = "<div class=\"btn-group\">\n    <button type=\"button\" class=\"btn btn-secondary\" (click)=\"takeScreenshot()\"><i class=\"fa fa-camera\" aria-hidden=\"true\"></i> Screenshot speichern</button>\n    <button type=\"button\" class=\"btn btn-secondary dropdown-toggle dropdown-toggle-split\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n        <span class=\"sr-only\">Toggle Dropdown</span>\n    </button>\n    <div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\">\n        <div class=\"form-group\">\n            <label>GIF erstellen für:</label>\n            <div class=\"btn-group\">\n                <button type=\"button\" class=\"btn btn-secondary\" (click)=\"generateGif(screenTypes.left)\">Erster Commit</button>\n                <button type=\"button\" class=\"btn btn-secondary\" (click)=\"generateGif(screenTypes.right)\">Zweiter Commit</button>\n            </div>\n        </div>\n\n        <img *ngIf=\"gifSource && !isGenerating\" id=\"gif\" src=\"{{gifSource}}\">\n        <p *ngIf=\"isGenerating\">GIF wird erstellt ...</p>\n        <small *ngIf=\"!gifSource && !isGenerating\">Ein GIF wird aus gespeicherten Screenshots erzeugt (Button \"Screenshot speichern\")</small>\n\n        <div class=\"form-group\" *ngIf=\"gifSource\">\n            <button type=\"button\" class=\"btn btn-danger\" (click)=\"removeScreenshots()\">zurücksetzen</button>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ 436:
/***/ (function(module, exports) {

module.exports = "<input class=\"form-control\"\n       placeholder=\"Datei, Modul, ...\"\n       ngui-auto-complete [(ngModel)]=\"searchTerm\"\n       [source]=\"uniqueFileList\"\n       [list-formatter]=\"autocompleteListFormatter\"\n       no-match-found-text=\"Nichts gefunden.\"\n       (valueChanged)=\"handleValueChanged($event)\" />"

/***/ }),

/***/ 437:
/***/ (function(module, exports) {

module.exports = "<div class=\"btn-group\">\n    <button class=\"btn btn-secondary dropdown-toggle\" type=\"button\" id=\"dropdownMenuButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n        <i class=\"fa fa-filter\" aria-hidden=\"true\"></i> Filter\n    </button>\n    <div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\">\n        <div class=\"custom-controls-stacked\">\n            <label class=\"custom-control custom-checkbox\">\n                <input type=\"checkbox\" class=\"custom-control-input\" [(ngModel)]=\"activeFilter.unchanged\" (change)=\"handleFilterChanged()\">\n                <span class=\"custom-control-indicator\"></span>\n                <span class=\"custom-control-description\">unverändert</span>\n            </label>\n            <label class=\"custom-control custom-checkbox\">\n                <input type=\"checkbox\" class=\"custom-control-input\" [(ngModel)]=\"activeFilter.changed\" (change)=\"handleFilterChanged()\">\n                <span class=\"custom-control-indicator\"></span>\n                <span class=\"custom-control-description\">verändert</span>\n            </label>\n            <label class=\"custom-control custom-checkbox\">\n                <input type=\"checkbox\" class=\"custom-control-input\" [(ngModel)]=\"activeFilter.deleted\" (change)=\"handleFilterChanged()\">\n                <span class=\"custom-control-indicator\"></span>\n                <span class=\"custom-control-description\">gelöscht</span>\n            </label>\n            <label class=\"custom-control custom-checkbox\">\n                <input type=\"checkbox\" class=\"custom-control-input\" [(ngModel)]=\"activeFilter.added\" (change)=\"handleFilterChanged()\">\n                <span class=\"custom-control-indicator\"></span>\n                <span class=\"custom-control-description\">hinzugefügt</span>\n            </label>\n            <label class=\"custom-control custom-checkbox\">\n                <input type=\"checkbox\" class=\"custom-control-input\" [(ngModel)]=\"activeFilter.moved\" (change)=\"handleFilterChanged()\">\n                <span class=\"custom-control-indicator\"></span>\n                <span class=\"custom-control-description\">umbenannt/verschoben</span>\n            </label>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ 438:
/***/ (function(module, exports) {

module.exports = "<div class=\"btn-group\">\n    <button class=\"btn btn-secondary dropdown-toggle\" type=\"button\" id=\"dropdownMenuButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n        <i class=\"fa fa-bar-chart\" aria-hidden=\"true\"></i> Mapping\n    </button>\n    <div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\">\n        <div class=\"form-group\">\n            <label for=\"height-metric-name\">Höhe</label>\n            <select id=\"height-metric-name\" class=\"custom-select\" [(ngModel)]=\"metricMapping.heightMetricName\">\n                <option *ngFor=\"let metricName of metricNames\" [ngValue]=\"metricName.name\">{{metricName.shortName}}</option>\n            </select>\n        </div>\n\n        <div class=\"form-group\">\n            <label for=\"groundarea-metric-name\">Grundfläche</label>\n            <select id=\"groundarea-metric-name\" class=\"custom-select\" [(ngModel)]=\"metricMapping.groundAreaMetricName\">\n                <option *ngFor=\"let metricName of metricNames\" [ngValue]=\"metricName.name\">{{metricName.shortName}}</option>\n            </select>\n        </div>\n\n        <div class=\"form-group\">\n            <label for=\"color-metric-name\">Farbe</label>\n            <select id=\"color-metric-name\" class=\"custom-select\" [(ngModel)]=\"metricMapping.colorMetricName\">\n                <option *ngFor=\"let metricName of metricNames\" [ngValue]=\"metricName.name\">{{metricName.shortName}}</option>\n            </select>\n        </div>\n\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"applyMetricMappings()\">übernehmen</button>\n    </div>\n</div>"

/***/ }),

/***/ 439:
/***/ (function(module, exports) {

module.exports = "<div>\n    <small>Einstellungen</small>\n</div>\n<app-view-control></app-view-control>\n<app-filter></app-filter>\n<app-metric-mapping></app-metric-mapping>"

/***/ }),

/***/ 440:
/***/ (function(module, exports) {

module.exports = "<label class=\"custom-control custom-radio\">\n    <input id=\"radio-splitscreen\" type=\"radio\" name=\"radio-group-screen\" class=\"custom-control-input\" [value]=\"viewTypes.split\" (click)=\"changeViewType(viewTypes.split)\" [checked]=\"activeViewType === viewTypes.split\" />\n    <span class=\"custom-control-indicator\"></span>\n    <span class=\"custom-control-description\">nebeneinander</span>\n</label>\n<label class=\"custom-control custom-radio\">\n    <input id=\"radio-fullscreen\" type=\"radio\" name=\"radio-group-screen\" class=\"custom-control-input\" [value]=\"viewTypes.merged\" (click)=\"changeViewType(viewTypes.merged)\" [checked]=\"activeViewType === viewTypes.merged\" />\n    <span class=\"custom-control-indicator\"></span>\n    <span class=\"custom-control-description\">kombiniert</span>\n</label>"

/***/ }),

/***/ 441:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 442:
/***/ (function(module, exports) {

module.exports = "<div id=\"tooltip\"></div>"

/***/ }),

/***/ 443:
/***/ (function(module, exports) {

module.exports = "<div id=\"stage\" class=\"split\">\n    <div class=\"vertical-line\"></div>\n    <app-screen [screenType]=\"screenTypes.left\"></app-screen>\n    <app-screen [screenType]=\"screenTypes.right\"></app-screen>\n</div>\n<app-tooltip></app-tooltip>\n<p *ngIf=\"metricsLoading$ | async\">LADE</p>"

/***/ }),

/***/ 54:
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

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enum_CommitReferenceType__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enum_ScreenType__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enum_NodeType__ = __webpack_require__(31);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ElementAnalyzer; });



var ElementAnalyzer = (function () {
    function ElementAnalyzer() {
    }
    ElementAnalyzer.generateUniqueElementList = function (nodes, uniqueElements) {
        if (uniqueElements === void 0) { uniqueElements = []; }
        if (!Array.isArray(nodes)) {
            nodes = [nodes];
        }
        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
            var node = nodes_1[_i];
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
        for (var _i = 0, nodes_2 = nodes; _i < nodes_2.length; _i++) {
            var node = nodes_2[_i];
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

/***/ 712:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(292);


/***/ }),

/***/ 78:
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

/***/ 79:
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

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LOAD_METRIC_TREE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return LOAD_METRIC_TREE_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return LOAD_METRIC_TREE_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return CALCULATE_MINIMUM_AND_MAXIMUM_VALUES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return GENERATE_UNIQUE_FILE_LIST; });
/* harmony export (immutable) */ __webpack_exports__["j"] = loadMetricTree;
/* harmony export (immutable) */ __webpack_exports__["b"] = loadMetricTreeSuccess;
/* harmony export (immutable) */ __webpack_exports__["e"] = loadMetricTreeError;
/* harmony export (immutable) */ __webpack_exports__["c"] = calculateMinimumAndMaximumValues;
/* harmony export (immutable) */ __webpack_exports__["d"] = generateUniqueFileList;
var LOAD_METRIC_TREE = 'LOAD_METRIC_TREE';
var LOAD_METRIC_TREE_SUCCESS = 'LOAD_METRIC_TREE_SUCCESS';
var LOAD_METRIC_TREE_ERROR = 'LOAD_METRIC_TREE_ERROR';
var CALCULATE_MINIMUM_AND_MAXIMUM_VALUES = 'CALCULATE_MINIMUM_AND_MAXIMUM_VALUES';
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
function calculateMinimumAndMaximumValues(metricTree) {
    return {
        type: CALCULATE_MINIMUM_AND_MAXIMUM_VALUES,
        payload: metricTree
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

},[712]);
//# sourceMappingURL=main.bundle.js.map