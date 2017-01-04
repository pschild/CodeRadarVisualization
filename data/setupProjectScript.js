var axios = require('axios');

var fromYear = 2016;
var fromMonth = 11; // 1 = january
var fromDay = 30;

function createProject() {
    console.log('creating project...');
    return axios.post('http://localhost:8080/projects',
        {
            "name": "coderadar-demo",
            "vcsType": "GIT",
            "vcsUrl": "https://github.com/pschild/coderadar-demo.git"
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