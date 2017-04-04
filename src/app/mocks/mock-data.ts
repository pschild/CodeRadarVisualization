import {InMemoryDbService} from "angular-in-memory-web-api";

export class MockData implements InMemoryDbService {

    createDb() {
        let commits = [
            { name: 'b152859ca8d73f5c974c2264107fd0092af310d0', author: 'John Doe', timestamp: 1485813773000, analyzed: true },
            { name: '2beb1d1d720c1256cedfdf483331f65861079705', author: 'John Doe', timestamp: 1485726067000, analyzed: true },
            { name: 'cbba0662f48f139da4973cc610bd4caa6213ed08', author: 'John Doe', timestamp: 1485633721000, analyzed: true },
            { name: '6ffebfad9e79dfa4ddfa7d043d84eb424a28c0cd', author: 'John Doe', timestamp: 1485561434000, analyzed: true },
            { name: '7ffebfad9e79dfa4ddfa7d043d84eb424a28c0cd', author: 'John Doe', timestamp: 1485561434001, analyzed: true },
            { name: '8ffebfad9e79dfa4ddfa7d043d84eb424a28c0cd', author: 'John Doe', timestamp: 1485561434002, analyzed: true },
            { name: '9ffebfad9e79dfa4ddfa7d043d84eb424a28c0cd', author: 'John Doe', timestamp: 1485561434003, analyzed: true }
        ];

        let metrics = [
            {
                "name": "root",
                "type": "MODULE",
                "commit1Metrics": {
                    "coderadar:size:loc:java": 800,
                    "coderadar:size:eloc:java": 4,
                    "coderadar:size:sloc:java": 8
                },
                "commit2Metrics": {
                    "coderadar:size:loc:java": 800,
                    "coderadar:size:eloc:java": 4,
                    "coderadar:size:sloc:java": 8
                },
                "renamedFrom": null,
                "renamedTo": null,
                "changes": null,
                "children": [
                    {
                        "name": "moduleA",
                        "type": "MODULE",
                        "commit1Metrics": {
                            "coderadar:size:loc:java": 4,
                            "coderadar:size:eloc:java": 2,
                            "coderadar:size:sloc:java": 4
                        },
                        "commit2Metrics": {
                            "coderadar:size:loc:java": 2,
                            "coderadar:size:eloc:java": 1,
                            "coderadar:size:sloc:java": 2
                        },
                        "renamedFrom": null,
                        "renamedTo": null,
                        "changes": null,
                        "children": [
                            {
                                "name": "moduleA/src/main/java/UnchangedClass.java",
                                "type": "FILE",
                                "commit1Metrics": {
                                    "coderadar:size:loc:java": 2,
                                    "coderadar:size:eloc:java": 1,
                                    "coderadar:size:sloc:java": 2
                                },
                                "commit2Metrics": {
                                    "coderadar:size:loc:java": 2,
                                    "coderadar:size:eloc:java": 1,
                                    "coderadar:size:sloc:java": 2
                                },
                                "renamedFrom": null,
                                "renamedTo": null,
                                "changes": {
                                    "renamed": false,
                                    "modified": false,
                                    "deleted": false,
                                    "added": false
                                },
                                "children": []
                            },
                            {
                                "name": "moduleA/src/main/java/MovedClassFromAToB.java",
                                "type": "FILE",
                                "commit1Metrics": {
                                    "coderadar:size:loc:java": 2,
                                    "coderadar:size:eloc:java": 1,
                                    "coderadar:size:sloc:java": 2
                                },
                                "commit2Metrics": null,
                                "renamedFrom": null,
                                "renamedTo": "moduleB/src/main/java/MovedClassFromAToB.java",
                                "changes": {
                                    "renamed": true,
                                    "modified": false,
                                    "deleted": false,
                                    "added": false
                                },
                                "children": []
                            },
                            {
                                "name": "moduleB/src/main/java/RemovedClass.java",
                                "type": "FILE",
                                "commit1Metrics": {
                                    "coderadar:size:loc:java": 2,
                                    "coderadar:size:eloc:java": 1,
                                    "coderadar:size:sloc:java": 2
                                },
                                "commit2Metrics": null,
                                "renamedFrom": null,
                                "renamedTo": null,
                                "changes": {
                                    "renamed": false,
                                    "modified": false,
                                    "deleted": false,
                                    "added": true
                                },
                                "children": []
                            }
                        ]
                    },
                    {
                        "name": "moduleB",
                        "type": "MODULE",
                        "commit1Metrics": {
                            "coderadar:size:loc:java": 4,
                            "coderadar:size:eloc:java": 2,
                            "coderadar:size:sloc:java": 4
                        },
                        "commit2Metrics": {
                            "coderadar:size:loc:java": 6,
                            "coderadar:size:eloc:java": 3,
                            "coderadar:size:sloc:java": 6
                        },
                        "renamedFrom": null,
                        "renamedTo": null,
                        "changes": null,
                        "children": [
                            {
                                "name": "moduleB/src/main/java/AddedClass.java",
                                "type": "FILE",
                                "commit1Metrics": null,
                                "commit2Metrics": {
                                    "coderadar:size:loc:java": 2,
                                    "coderadar:size:eloc:java": 1,
                                    "coderadar:size:sloc:java": 2
                                },
                                "renamedFrom": null,
                                "renamedTo": null,
                                "changes": {
                                    "renamed": false,
                                    "modified": false,
                                    "deleted": false,
                                    "added": true
                                },
                                "children": []
                            },
                            {
                                "name": "moduleB/src/main/java/IncreasedClass.java",
                                "type": "FILE",
                                "commit1Metrics": {
                                    "coderadar:size:loc:java": 100,
                                    "coderadar:size:eloc:java": 100,
                                    "coderadar:size:sloc:java": 100
                                },
                                "commit2Metrics": {
                                    "coderadar:size:loc:java": 200,
                                    "coderadar:size:eloc:java": 200,
                                    "coderadar:size:sloc:java": 200
                                },
                                "renamedFrom": null,
                                "renamedTo": null,
                                "changes": {
                                    "renamed": false,
                                    "modified": false,
                                    "deleted": false,
                                    "added": false
                                },
                                "children": []
                            },
                            {
                                "name": "moduleB/src/main/java/DecreasedClass.java",
                                "type": "FILE",
                                "commit1Metrics": {
                                    "coderadar:size:loc:java": 200,
                                    "coderadar:size:eloc:java": 200,
                                    "coderadar:size:sloc:java": 200
                                },
                                "commit2Metrics": {
                                    "coderadar:size:loc:java": 100,
                                    "coderadar:size:eloc:java": 100,
                                    "coderadar:size:sloc:java": 100
                                },
                                "renamedFrom": null,
                                "renamedTo": null,
                                "changes": {
                                    "renamed": false,
                                    "modified": false,
                                    "deleted": false,
                                    "added": false
                                },
                                "children": []
                            },
                            {
                                "name": "moduleB/src/main/java/MovedClassFromAToB.java",
                                "type": "FILE",
                                "commit1Metrics": null,
                                "commit2Metrics": {
                                    "coderadar:size:loc:java": 2,
                                    "coderadar:size:eloc:java": 1,
                                    "coderadar:size:sloc:java": 2
                                },
                                "renamedFrom": "moduleA/src/main/java/MovedClassFromAToB.java",
                                "renamedTo": null,
                                "changes": {
                                    "renamed": true,
                                    "modified": false,
                                    "deleted": false,
                                    "added": false
                                },
                                "children": []
                            }
                        ]
                    }
                ]
            }
        ];

        return {commits, metrics};
    }
}
