export var config = {
    // CODERADAR CONFIG
    BASE_URL: 'http://localhost:8080',
    USERNAME: 'radar',
    PASSWORD: 'Password12!',

    // DEFAULT METRIC MAPPING
    GROUND_AREA_METRIC_NAME: 'coderadar:size:sloc:java',
    HEIGHT_METRIC_NAME: 'coderadar:size:loc:java',
    COLOR_METRIC_NAME: 'coderadar:size:eloc:java',

    // VISUALIZATION SETTINGS
    GROUND_AREA_FACTOR: 1,
    HEIGHT_FACTOR: 1,
    GLOBAL_MAX_GROUND_AREA: 100,
    GLOBAL_MIN_GROUND_AREA: 10,
    GLOBAL_MAX_HEIGHT: 100,
    GLOBAL_MIN_HEIGHT: 10,
    BLOCK_SPACING: 10,
    DEFAULT_BLOCK_HEIGHT: 10,
    SCREEN_PADDING: 0,

    // COLORS
    COLOR_MODULE_FROM: '#cccccc',
    COLOR_MODULE_TO: '#525252',
    COLOR_METRIC_RANGE: ['#ffffff','#ffc905','#f78400','#e92100','#9b1909','#4f1609','#5d0000'],
    COLOR_FIRST_COMMIT: '#0e8cf3',
    COLOR_SECOND_COMMIT: '#ffb100',
    COLOR_ADDED_FILE: '#49c35c',
    COLOR_DELETED_FILE: '#d90206',
    COLOR_UNCHANGED_FILE: '#cccccc'
};