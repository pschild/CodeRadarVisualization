export var config = {
    BASE_URL: 'http://localhost:8080',

    SCREEN_PADDING: 0,

    GROUND_AREA_METRIC_NAME: 'coderadar:size:sloc:java',
    GROUND_AREA_FACTOR: 1,
    GLOBAL_MAX_GROUND_AREA: 100,
    GLOBAL_MIN_GROUND_AREA: 10,

    HEIGHT_METRIC_NAME: 'coderadar:size:loc:java',
    HEIGHT_FACTOR: 1,
    GLOBAL_MAX_HEIGHT: 100,
    GLOBAL_MIN_HEIGHT: 10,

    COLOR_METRIC_NAME: 'coderadar:size:eloc:java',

    BLOCK_SPACING: 10,
    DEFAULT_BLOCK_HEIGHT: 10,
    DEFAULT_BLOCK_DIMENSIONS: 10,

    HELPER_BLOCK_HEIGHT: 10,
    HELPER_BLOCK_VISIBLE: true,

    COLOR_MODULE: '#cccccc',
    COLOR_FIRST_COMMIT: '#0e8cf3',
    COLOR_SECOND_COMMIT: '#ffb100',
    COLOR_ADDED_FILE: '#49c35c',
    COLOR_DELETED_FILE: '#d90206',
    COLOR_UNCHANGED_FILE: '#cccccc'
};