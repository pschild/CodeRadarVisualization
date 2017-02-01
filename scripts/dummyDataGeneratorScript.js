var MIN_MODULE_COUNT = 25;
var MAX_MODULE_COUNT = 25;
var MIN_FILE_COUNT = 25;
var MAX_FILE_COUNT = 25;
var CHANCE_TO_CREATE_SUBMODULE = 50;

var LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
for (var k = 0; k < 2; k++) {
    for (var j = 0; j < 10; j++) {
        LETTERS.push(LETTERS[k] + LETTERS[j]);
    }
}

var json = [];
var submoduleCounter = 0;
var subsubmoduleCounter = 0;
for (var i = 0; i < random(MIN_MODULE_COUNT, MAX_MODULE_COUNT); i++) {
    var module = createModule(i);
    addFilesToModule(module);

    if (random(1, 100) >= 100 - CHANCE_TO_CREATE_SUBMODULE) {
        var submodule = createModule(i, module.name, submoduleCounter++);
        addFilesToModule(submodule);
        module.children.push(submodule);

        if (random(1, 10000) >= 100 - CHANCE_TO_CREATE_SUBMODULE) {
            var subsubmodule = createModule(i, submodule.name, subsubmoduleCounter++);
            addFilesToModule(subsubmodule);
            submodule.children.push(subsubmodule);
        }
    }

    json.push(module);
}

var root = {
    "name": "root",
    "type": "MODULE",
    "children": json
};

// console.clear();
// console.log(root);
console.log(JSON.stringify(root));

function addFilesToModule(module) {
    for (var i = 0; i < random(MIN_FILE_COUNT, MAX_FILE_COUNT); i++) {
        module.children.push(createFile(i, module.name));
    }
}

function createModule(index, parentName, submoduleCounter) {
    var module = {};
    module.name = parentName ? parentName + '/' : '';
    module.name += parentName ? 'Submodule' + LETTERS[submoduleCounter] : 'Module' + LETTERS[index];

    module.type = 'MODULE';
    module.children = [];
    return module;
}

function createFile(index, moduleName) {
    var added = false;
    var deleted = false;

    var chanceToBeAddedOrDeleted = random(0, 100);
    if (chanceToBeAddedOrDeleted <= 20) {
        added = true;
    } else if (chanceToBeAddedOrDeleted <= 40) {
        deleted = true;
    }

    var file = {};
    file.name = moduleName + '/Class' + LETTERS[index];
    file.type = 'FILE';
    file.children = [];
    file.commit1Metrics = added ? null : {
        "coderadar:size:loc:java": random(10, 800),
        "coderadar:size:sloc:java": random(1, 80),
        "coderadar:size:eloc:java": random(0, 20)
    };
    file.commit2Metrics = deleted ? null : {
        "coderadar:size:loc:java": random(10, 800),
        "coderadar:size:sloc:java": random(1, 80),
        "coderadar:size:eloc:java": random(0, 20)
    };

    // chance that file hasn't changed
    if (random(0, 100) <= 70 && file.commit1Metrics != null && file.commit2Metrics != null) {
        file.commit2Metrics = file.commit1Metrics;
    }

    file.changes = {
        renamed: false,
        modified: file.commit1Metrics != file.commit2Metrics,
        added: added,
        deleted: deleted
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