export class AppConfig {
    static DEBUG_MODE_ENABLED: boolean = false;

    // CODERADAR CONFIG
    static BASE_URL: string = 'http://localhost:8080';
    static USERNAME: string = 'radar';
    static PASSWORD: string = 'Password12!';

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
        { shortName: 'ExecutableStatementCount', name: 'checkstyle:com.puppycrawl.tools.checkstyle.checks.sizes.ExecutableStatementCountCheck' },
    ];

    // DEFAULT METRIC MAPPING
    static GROUND_AREA_METRIC_NAME: string = 'coderadar:size:sloc:java';
    static HEIGHT_METRIC_NAME: string = 'coderadar:size:loc:java';
    static COLOR_METRIC_NAME: string = 'coderadar:size:eloc:java';

    // VISUALIZATION SETTINGS
    static GROUND_AREA_FACTOR: number = 0.1;
    static HEIGHT_FACTOR: number = 0.1;
    static GLOBAL_MAX_GROUND_AREA: number = 100;
    static GLOBAL_MIN_GROUND_AREA: number = 1;
    static GLOBAL_MAX_HEIGHT: number = 100;
    static GLOBAL_MIN_HEIGHT: number = 1;
    static BLOCK_SPACING: number = 5;
    static DEFAULT_BLOCK_HEIGHT: number = 0.2;
    static SCREEN_PADDING: number = 0;

    // CAMERA SETTINGS
    static CAMERA_NEAR: number = 1;
    static CAMERA_FAR: number = 100000;
    static CAMERA_DISTANCE_TO_FOCUSSED_ELEMENT: number = 200;
    static CAMERA_START_POSITION: any = {
        x: 1000, y: 1000, z: 1000
    };
    static CAMERA_ANIMATION_DURATION: number = 1500;

    // COLORS
    static COLOR_HIERARCHY_RANGE: string[] = ['#cccccc','#525252'];
    static COLOR_HEATMAP_RANGE: string[] = ['#ffffff','#ffc905','#f78400','#e92100','#9b1909','#4f1609','#5d0000'];
    static COLOR_CONNECTION: string = '#000000';

    static COLOR_FIRST_COMMIT: string = '#0e8cf3';
    static COLOR_SECOND_COMMIT: string = '#ffb100';
    
    static COLOR_ADDED_FILE: string = '#49c35c';
    static COLOR_DELETED_FILE: string = '#d90206';
    static COLOR_UNCHANGED_FILE: string = '#cccccc'
}
