var axios = require('axios');

var username = "radar";
var password = "Password12!";

var repoName = 'coderadar';
// var repoName = 'coderadar-demo';
var repoUrl = 'https://github.com/reflectoring/coderadar.git';
// var repoUrl = 'https://github.com/pschild/coderadar-demo.git';

var fromYear = 2015;
var fromMonth = 10; // 1 = january
var fromDay = 1;

var accessToken = undefined;

function registerUser() {
    console.log('registering user...');
    return axios.post('http://localhost:8080/user/registration',
        {
            "username" : username,
            "password" : password
        }
    );
}

function authorizeUser() {
    console.log('authorizing user...');
    return axios.post('http://localhost:8080/user/auth',
        {
            "username" : username,
            "password" : password
        }
    ).then(function(response) {
        if (!response.data.accessToken) {
            throw new Error('no access token could be found');
        }
        accessToken = response.data.accessToken;
    });
}

function createProject() {
    console.log('creating project...');
    return axios.post('http://localhost:8080/projects',
        {
            "name": repoName,
            "vcsType": "GIT",
            "vcsUrl": repoUrl
        },
        {
            headers: {'Authorization': accessToken}
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
        },
        {
            headers: {'Authorization': accessToken}
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
                },
                {
                    headers: {'Authorization': accessToken}
                }
            )
        );
    }

    return axios.all(promises);
}

function addAnalyzingStrategy() {
    console.log('adding analyzing strategy...');
    var fromDate = new Date(fromYear, fromMonth - 1, fromDay);

    return axios.post('http://localhost:8080/projects/1/analyzingJob',
        {
            "fromDate" : fromDate.getTime(),
            "active" : true,
            "rescan" : true
        },
        {
            headers: {'Authorization': accessToken}
        }
    );
}

function addModules() {
    console.log('adding modules...');

    var modules = [
        'coderadar-plugin-api',
        'coderadar-plugins/checkstyle-analyzer-plugin',
        'coderadar-plugins/findbugs-adapter-plugin',
        'coderadar-plugins/loc-analyzer-plugin',
        'coderadar-plugins/todo-analyzer-plugin',
        'coderadar-server',
        'coderadar-server/src/main/java/org/wickedsource/coderadar/analyzer',
        'coderadar-server/src/main/java/org/wickedsource/coderadar/analyzingjob',
        'coderadar-server/src/main/java/org/wickedsource/coderadar/commit',
        'coderadar-server/src/main/java/org/wickedsource/coderadar/core',
        'coderadar-server/src/main/java/org/wickedsource/coderadar/file',
        'coderadar-server/src/main/java/org/wickedsource/coderadar/filepattern',
        'coderadar-server/src/main/java/org/wickedsource/coderadar/job',
        'coderadar-server/src/main/java/org/wickedsource/coderadar/metric',
        'coderadar-server/src/main/java/org/wickedsource/coderadar/metricquery',
        'coderadar-server/src/main/java/org/wickedsource/coderadar/module',
        'coderadar-server/src/main/java/org/wickedsource/coderadar/project',
        'coderadar-server/src/main/java/org/wickedsource/coderadar/qualityprofile',
        'coderadar-server/src/main/java/org/wickedsource/coderadar/security',
        'coderadar-server/src/main/java/org/wickedsource/coderadar/user',
        'coderadar-server/src/main/java/org/wickedsource/coderadar/vcs'
    ];

    var promises = [];
    for (var moduleName of modules) {
        promises.push(
            axios.post('http://localhost:8080/projects/1/modules',
                {
                    "modulePath": moduleName
                },
                {
                    headers: {'Authorization': accessToken}
                }
            )
        );
    }

    return axios.all(promises);
}

// registerUser()
//     .then(authorizeUser)
//     .then(createProject);
authorizeUser()
    .then(addFilePattern)
    .then(addAnalyzerConfig)
    .then(addAnalyzingStrategy)
    .then(addModules);