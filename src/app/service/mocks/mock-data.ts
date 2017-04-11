import {InMemoryDbService} from "angular-in-memory-web-api";

export class MockData implements InMemoryDbService {

    createDb() {
        let commits = [
            { name: 'da39a3ee5e6b4b0d3255bfef95601890afd80709', author: 'John Doe', timestamp: 1491897949000, analyzed: true },
            { name: 'd6cd1e2bd19e03a81132a23b2025920577f84e37', author: 'Joe Smith', timestamp: 1491909062000, analyzed: true },
            { name: '9bedf67800b2923982bdf60c89c57ce6fd2d9a1c', author: 'John Doe', timestamp: 1491926159000, analyzed: true }
        ];

        let metrics = {
            "name": "root",
            "type": "MODULE",
            "commit1Metrics": {
                "coderadar:size:loc:java": 453,
                "checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck": 15,
                "checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck": 5
            },
            "commit2Metrics": {
                "coderadar:size:loc:java": 155,
                "checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck": 2,
                "checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck": 4
            },
            "renamedFrom": null,
            "renamedTo": null,
            "changes": null,
            "children": [
                {
                    "name": "AddedAndRemovedFiles.java",
                    "type": "MODULE",
                    "commit1Metrics": {
                        "coderadar:size:loc:java": 453,
                        "checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck": 15,
                        "checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck": 5
                    },
                    "commit2Metrics": {
                        "coderadar:size:loc:java": 155,
                        "checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck": 2,
                        "checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck": 4
                    },
                    "renamedFrom": null,
                    "renamedTo": null,
                    "changes": null,
                    "children": [
                        {
                            "name": "OnlyLeft.java",
                            "type": "FILE",
                            "commit1Metrics": {
                                "coderadar:size:loc:java": 453,
                                "checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck": 15,
                                "checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck": 5
                            },
                            "commit2Metrics": null,
                            "renamedFrom": null,
                            "renamedTo": null,
                            "changes": {
                                "renamed": false,
                                "modified": false,
                                "deleted": true,
                                "added": false
                            },
                            "children": []
                        },
                        {
                            "name": "OnlyRight.java",
                            "type": "FILE",
                            "commit1Metrics": null,
                            "commit2Metrics": {
                                "coderadar:size:loc:java": 155,
                                "checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck": 2,
                                "checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck": 4
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
                        }
                    ]
                },
                {
                    "name": "ChangedAndUnchangedFiles.java",
                    "type": "MODULE",
                    "commit1Metrics": {
                        "coderadar:size:loc:java": 100,
                        "checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck": 100,
                        "checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck": 100
                    },
                    "commit2Metrics": {
                        "coderadar:size:loc:java": 100,
                        "checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck": 100,
                        "checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck": 100
                    },
                    "renamedFrom": null,
                    "renamedTo": null,
                    "changes": null,
                    "children": [
                        {
                            "name": "Smaller.java",
                            "type": "FILE",
                            "commit1Metrics": {
                                "coderadar:size:loc:java": 475,
                                "checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck": 1,
                                "checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck": 1
                            },
                            "commit2Metrics": {
                                "coderadar:size:loc:java": 345,
                                "checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck": 1,
                                "checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck": 1
                            },
                            "renamedFrom": null,
                            "renamedTo": null,
                            "changes": {
                                "renamed": false,
                                "modified": true,
                                "deleted": false,
                                "added": false
                            },
                            "children": []
                        },
                        {
                            "name": "Bigger.java",
                            "type": "FILE",
                            "commit1Metrics": {
                                "coderadar:size:loc:java": 75,
                                "checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck": 1,
                                "checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck": 1
                            },
                            "commit2Metrics": {
                                "coderadar:size:loc:java": 121,
                                "checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck": 1,
                                "checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck": 2
                            },
                            "renamedFrom": null,
                            "renamedTo": null,
                            "changes": {
                                "renamed": false,
                                "modified": true,
                                "deleted": false,
                                "added": false
                            },
                            "children": []
                        },
                        {
                            "name": "Untouched.java",
                            "type": "FILE",
                            "commit1Metrics": {
                                "coderadar:size:loc:java": 51,
                                "checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck": 12,
                                "checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck": 1
                            },
                            "commit2Metrics": {
                                "coderadar:size:loc:java": 51,
                                "checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck": 12,
                                "checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck": 1
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
                        }
                    ]
                }
            ]
        };

        return {commits, metrics};
    }
}
