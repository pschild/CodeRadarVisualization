var axios = require('axios');

// var repoName = 'coderadar';
var repoName = 'coderadar-demo';
// var repoUrl = 'https://github.com/reflectoring/coderadar.git';
var repoUrl = 'https://github.com/pschild/coderadar-demo.git';

var fromYear = 2016;
var fromMonth = 1; // 1 = january
var fromDay = 1;

function createProject() {
    console.log('creating project...');
    return axios.post('http://localhost:8080/projects',
        {
            "name": repoName,
            "vcsType": "GIT",
            "vcsUrl": repoUrl
        }
    );
}

function addFilePattern() {
    console.log('adding file pattern...');
    return axios.post('http://localhost:8080/projects/1/files',
        {
            "filePatterns": [{
                "pattern": "**/*.java",
                "inclusionType": "INCLUDE",
                "fileSetType": "SOURCE"
            }]
        }
    );
}

function addAnalyzerConfig() {
    console.log('adding analyzing configs...');

    var enabledAnalyzerPlugins = [
        'org.wickedsource.coderadar.analyzer.loc.LocAnalyzerPlugin',
        'org.wickedsource.coderadar.analyzer.checkstyle.CheckstyleSourceCodeFileAnalyzerPlugin'
    ];

    var promises = [];
    for (var pluginName of enabledAnalyzerPlugins) {
        promises.push(
            axios.post('http://localhost:8080/projects/1/analyzers',
                {
                    "analyzerName": pluginName,
                    "enabled": true
                }
            )
        );
    }

    return axios.all(promises);
}

function addAnalyzingStrategy() {
    console.log('adding analyzing strategy...');
    var fromDate = new Date(fromYear, fromMonth - 1, fromDay);

    return axios.post('http://localhost:8080/projects/1/strategy',
        {
            "fromDate" : fromDate.getTime(),
            "active" : true,
            "rescan" : true
        }
    );
}

function addModules() {
    console.log('adding modules...');

    var modules = [
        'plugins',
        'plugins/analyzer-plugin-api',
        'plugins/checkstyle-analyzer-plugin',
        'plugins/findbugs-adapter-plugin',
        'plugins/loc-analyzer-plugin',
        'plugins/todo-analyzer-plugin',
        'server',
        'server/coderadar-webapp',
        'server/coderadar-webapp/src/main/java/org/wickedsource/coderadar/analyzer',
        'server/coderadar-webapp/src/main/java/org/wickedsource/coderadar/analyzingstrategy',
        'server/coderadar-webapp/src/main/java/org/wickedsource/coderadar/commit',
        'server/coderadar-webapp/src/main/java/org/wickedsource/coderadar/core',
        'server/coderadar-webapp/src/main/java/org/wickedsource/coderadar/file',
        'server/coderadar-webapp/src/main/java/org/wickedsource/coderadar/filepattern',
        'server/coderadar-webapp/src/main/java/org/wickedsource/coderadar/job',
        'server/coderadar-webapp/src/main/java/org/wickedsource/coderadar/metric',
        'server/coderadar-webapp/src/main/java/org/wickedsource/coderadar/metricquery',
        'server/coderadar-webapp/src/main/java/org/wickedsource/coderadar/module',
        'server/coderadar-webapp/src/main/java/org/wickedsource/coderadar/project',
        'server/coderadar-webapp/src/main/java/org/wickedsource/coderadar/qualityprofile',
        'server/coderadar-webapp/src/main/java/org/wickedsource/coderadar/security',
        'server/coderadar-webapp/src/main/java/org/wickedsource/coderadar/user',
        'server/coderadar-webapp/src/main/java/org/wickedsource/coderadar/vcs'
    ];

    var promises = [];
    for (var moduleName of modules) {
        promises.push(
            axios.post('http://localhost:8080/projects/1/modules',
                {
                    "modulePath": moduleName
                }
            )
        );
    }

    return axios.all(promises);
}

createProject()
    .then(addFilePattern)
    .then(addAnalyzerConfig)
    .then(addAnalyzingStrategy)
    .then(addModules);