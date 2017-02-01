export var config = {
    DEBUG_MODE_ENABLED: false,

    // CODERADAR CONFIG
    BASE_URL: 'http://localhost:8080',
    USERNAME: 'radar',
    PASSWORD: 'Password12!',

    // DEFAULT METRIC MAPPING
    GROUND_AREA_METRIC_NAME: 'coderadar:size:sloc:java',
    HEIGHT_METRIC_NAME: 'coderadar:size:loc:java',
    COLOR_METRIC_NAME: 'coderadar:size:eloc:java',

    // VISUALIZATION SETTINGS
    GROUND_AREA_FACTOR: 0.1,
    HEIGHT_FACTOR: 0.1,
    GLOBAL_MAX_GROUND_AREA: 10,
    GLOBAL_MIN_GROUND_AREA: 1,
    GLOBAL_MAX_HEIGHT: 10,
    GLOBAL_MIN_HEIGHT: 1,
    BLOCK_SPACING: 5,
    DEFAULT_BLOCK_HEIGHT: 0.2,
    SCREEN_PADDING: 0,

    // COLORS
    COLOR_HIERARCHY_RANGE: ['#cccccc', '#525252'],
    COLOR_HEATMAP_RANGE: ['#ffffff','#ffc905','#f78400','#e92100','#9b1909','#4f1609','#5d0000'],
    COLOR_CONNECTION: '#ff0000',

    COLOR_FIRST_COMMIT: '#0e8cf3',
    COLOR_SECOND_COMMIT: '#ffb100',

    COLOR_ADDED_FILE: '#49c35c',
    COLOR_DELETED_FILE: '#d90206',
    COLOR_UNCHANGED_FILE: '#cccccc'
};