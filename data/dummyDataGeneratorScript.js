var MIN_MODULE_COUNT = 5;
var MAX_MODULE_COUNT = 15;
var MIN_FILE_COUNT = 5;
var MAX_FILE_COUNT = 15;
var CHANCE_TO_CREATE_SUBMODULE = 50;

var LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

var json = [];
for (var i = 0; i < random(MIN_MODULE_COUNT, MAX_MODULE_COUNT); i++) {
    var module = createModule(i);
    addFilesToModule(module);

    if (random(1, 100) >= 100 - CHANCE_TO_CREATE_SUBMODULE) {
        var submodule = createModule(i, module.name);
        addFilesToModule(submodule);
        module.children.push(submodule);
    }

    json.push(module);
}
console.clear();
console.log(json);
console.log(JSON.stringify(json));

function addFilesToModule(module) {
    for (var i = 0; i < random(MIN_FILE_COUNT, MAX_FILE_COUNT); i++) {
        module.children.push(createFile(i, module.name));
    }
}

function createModule(index, parentName) {
    var module = {};
    module.name = parentName ? parentName + '/' : '';
    module.name += parentName ? 'Submodule' : 'Module' + LETTERS[index];

    module.type = 'MODULE';
    module.children = [];
    return module;
}

function createFile(index, moduleName) {
    var file = {};
    file.name = moduleName + '/Class' + LETTERS[index];
    file.type = 'FILE';
    file.children = [];
    file.commit1Metrics = {
        "coderadar:size:loc:java": random(10, 800),
        "coderadar:cyclomaticComplexity": random(0, 80),
        "coderadar:magicNumbers": random(0, 20)
    };
    file.commit2Metrics = {
        "coderadar:size:loc:java": random(10, 800),
        "coderadar:cyclomaticComplexity": random(0, 80),
        "coderadar:magicNumbers": random(0, 20)
    };
    file.changes = {
        renamed: randomBool(),
        modified: randomBool(),
        added: randomBool(),
        deleted: randomBool()
    };
    file.renamedFrom = null;
    file.renamedTo = null;
    return file;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomBool() {
    return random(0, 1) == 1;
}