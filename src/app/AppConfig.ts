import {environment} from '../environments/environment';

export class AppConfig {
    static DEBUG_MODE_ENABLED = false;

    // CODERADAR SERVER CONFIG
    static BASE_URL = 'http://192.168.1.37:8080';
    static USERNAME = 'radar';
    static PASSWORD = 'Password12!';

    // ALL AVAILABLE METRICS
    static AVAILABLE_METRICS = [
        { shortName: 'Lines of Code (LOC)', name: 'coderadar:size:loc:java' },
        { shortName: 'Source Lines of Code (SLOC)', name: 'coderadar:size:sloc:java' },
        { shortName: 'Effective Lines of Code (ELOC)', name: 'coderadar:size:eloc:java' },
        { shortName: 'MagicNumber', name: 'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck' },
        { shortName: 'ReturnCount', name: 'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.ReturnCountCheck' },
        { shortName: 'CyclomaticComplexity', name: 'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck' },
        { shortName: 'JavaNCSS', name: 'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.JavaNCSSCheck' },
        { shortName: 'NPathComplexity', name: 'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.NPathComplexityCheck' },
        // tslint:disable-next-line:max-line-length
        { shortName: 'ExecutableStatementCount', name: 'checkstyle:com.puppycrawl.tools.checkstyle.checks.sizes.ExecutableStatementCountCheck' },
    ];

    // DEFAULT METRIC MAPPING
    static HEIGHT_METRIC_NAME = 'coderadar:size:loc:java';
    static GROUND_AREA_METRIC_NAME: string = environment.development
        ? 'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck'
        : 'coderadar:size:sloc:java';
    static COLOR_METRIC_NAME: string = environment.development
        ? 'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck'
        : 'coderadar:size:eloc:java';

    // VISUALIZATION SETTINGS
    static EDGE_LENGTH_FACTOR = 2;
    static HEIGHT_FACTOR = 0.1;
    // static GLOBAL_MAX_GROUND_AREA = 100;
    // static GLOBAL_MIN_GROUND_AREA = 1;
    // static GLOBAL_MAX_HEIGHT = 100;
    // static GLOBAL_MIN_HEIGHT = 1;
    static BLOCK_SPACING = 5;
    static MODULE_BLOCK_HEIGHT = 5;

    // CAMERA SETTINGS
    static CAMERA_NEAR = 0.1;
    static CAMERA_FAR = 100000;
    static CAMERA_DISTANCE_TO_FOCUSSED_ELEMENT = 100;
    static CAMERA_ANIMATION_DURATION = 1500;

    // COLORS
    static COLOR_HIERARCHY_RANGE: string[] = ['#cccccc', '#525252'];
    static COLOR_HEATMAP_RANGE: string[] = ['#ffffff', '#ffc905', '#f78400', '#e92100', '#9b1909', '#4f1609', '#5d0000'];
    static COLOR_CONNECTION = '#000000';

    static COLOR_FIRST_COMMIT = '#0e8cf3';
    static COLOR_SECOND_COMMIT = '#ffb100';

    static COLOR_ADDED_FILE = '#49c35c';
    static COLOR_DELETED_FILE = '#d90206';
    static COLOR_UNCHANGED_FILE = '#cccccc'
}
