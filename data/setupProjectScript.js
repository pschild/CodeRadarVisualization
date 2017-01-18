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

createProject()
    .then(addFilePattern)
    .then(addAnalyzerConfig)
    .then(addAnalyzingStrategy);