var axios = require('axios');

var fromYear = 2016;
var fromMonth = 11; // 1 = january
var fromDay = 30;

function createProject() {
    console.log('creating project...');
    return axios.post('http://localhost:8080/projects',
        {
            "name": "Coderadar",
            "vcsType": "GIT",
            "vcsUrl": "https://github.com/reflectoring/coderadar.git"
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
    console.log('adding analyzing config...');
    return axios.post('http://localhost:8080/projects/1/analyzers',
        {
            "analyzerName": "org.wickedsource.coderadar.analyzer.loc.LocAnalyzerPlugin",
            "enabled": true
        }
    );
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