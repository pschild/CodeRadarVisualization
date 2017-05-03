import {InMemoryDbService} from 'angular-in-memory-web-api';

export class MockData implements InMemoryDbService {

    createDb() {
        let commits = [
            { name: 'da39a3ee5e6b4b0d3255bfef95601890afd80709', author: 'John Doe', timestamp: 1491897949000, analyzed: true },
            { name: 'd6cd1e2bd19e03a81132a23b2025920577f84e37', author: 'Joe Smith', timestamp: 1491909062000, analyzed: true },
            { name: '9bedf67800b2923982bdf60c89c57ce6fd2d9a1c', author: 'John Doe', timestamp: 1491926159000, analyzed: true }
        ];

        let metrics = {
            'name': 'root',
            'type': 'MODULE',
            'commit1Metrics': {
                'coderadar:size:loc:java': 453,
                'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck': 15,
                'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck': 5
            },
            'commit2Metrics': {
                'coderadar:size:loc:java': 155,
                'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck': 2,
                'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck': 4
            },
            'renamedFrom': null,
            'renamedTo': null,
            'changes': null,
            'children': [
                {
                    'name': 'root/ModuleA',
                    'type': 'MODULE',
                    'commit1Metrics': {
                        'coderadar:size:loc:java': 453,
                        'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck': 15,
                        'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck': 5
                    },
                    'commit2Metrics': {
                        'coderadar:size:loc:java': 155,
                        'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck': 2,
                        'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck': 4
                    },
                    'renamedFrom': null,
                    'renamedTo': null,
                    'changes': null,
                    'children': [
                        {
                            'name': 'root/ModuleA/OnlyLeft.java',
                            'type': 'FILE',
                            'commit1Metrics': {
                                'coderadar:size:loc:java': 453,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck': 15,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck': 25
                            },
                            'commit2Metrics': null,
                            'renamedFrom': null,
                            'renamedTo': null,
                            'changes': {
                                'renamed': false,
                                'modified': false,
                                'deleted': true,
                                'added': false
                            },
                            'children': []
                        },
                        {
                            'name': 'root/ModuleA/OnlyRight.java',
                            'type': 'FILE',
                            'commit1Metrics': null,
                            'commit2Metrics': {
                                'coderadar:size:loc:java': 155,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck': 2,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck': 24
                            },
                            'renamedFrom': null,
                            'renamedTo': null,
                            'changes': {
                                'renamed': false,
                                'modified': false,
                                'deleted': false,
                                'added': true
                            },
                            'children': []
                        },
                        {
                            'name': 'root/ModuleA/MovedToModuleB.java',
                            'type': 'FILE',
                            'commit1Metrics': {
                                'coderadar:size:loc:java': 255,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck': 6,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck': 12
                            },
                            'commit2Metrics': null,
                            'renamedFrom': null,
                            'renamedTo': 'root/ModuleB/MovedFromModuleA.java',
                            'changes': {
                                'renamed': true,
                                'modified': false,
                                'deleted': false,
                                'added': false
                            },
                            'children': []
                        }
                    ]
                },
                {
                    'name': 'root/ModuleB',
                    'type': 'MODULE',
                    'commit1Metrics': {
                        'coderadar:size:loc:java': 100,
                        'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck': 100,
                        'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck': 100
                    },
                    'commit2Metrics': {
                        'coderadar:size:loc:java': 100,
                        'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck': 100,
                        'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck': 100
                    },
                    'renamedFrom': null,
                    'renamedTo': null,
                    'changes': null,
                    'children': [
                        {
                            'name': 'root/ModuleB/Smaller.java',
                            'type': 'FILE',
                            'commit1Metrics': {
                                'coderadar:size:loc:java': 875,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck': 1,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck': 58
                            },
                            'commit2Metrics': {
                                'coderadar:size:loc:java': 345,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck': 1,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck': 45
                            },
                            'renamedFrom': null,
                            'renamedTo': null,
                            'changes': {
                                'renamed': false,
                                'modified': true,
                                'deleted': false,
                                'added': false
                            },
                            'children': []
                        },
                        {
                            'name': 'root/ModuleB/Bigger.java',
                            'type': 'FILE',
                            'commit1Metrics': {
                                'coderadar:size:loc:java': 175,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck': 1,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck': 13
                            },
                            'commit2Metrics': {
                                'coderadar:size:loc:java': 645,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck': 1,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck': 42
                            },
                            'renamedFrom': null,
                            'renamedTo': null,
                            'changes': {
                                'renamed': false,
                                'modified': true,
                                'deleted': false,
                                'added': false
                            },
                            'children': []
                        },
                        {
                            'name': 'root/ModuleB/Untouched.java',
                            'type': 'FILE',
                            'commit1Metrics': {
                                'coderadar:size:loc:java': 151,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck': 12,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck': 46
                            },
                            'commit2Metrics': {
                                'coderadar:size:loc:java': 151,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck': 12,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck': 46
                            },
                            'renamedFrom': null,
                            'renamedTo': null,
                            'changes': {
                                'renamed': false,
                                'modified': false,
                                'deleted': false,
                                'added': false
                            },
                            'children': []
                        },
                        {
                            'name': 'root/ModuleB/MovedFromModuleA.java',
                            'type': 'FILE',
                            'commit1Metrics': null,
                            'commit2Metrics': {
                                'coderadar:size:loc:java': 255,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck': 6,
                                'checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MagicNumberCheck': 12
                            },
                            'renamedFrom': 'root/ModuleA/MovedToModuleB.java',
                            'renamedTo': null,
                            'changes': {
                                'renamed': true,
                                'modified': false,
                                'deleted': false,
                                'added': false
                            },
                            'children': []
                        }
                    ]
                }
            ]
        };

        return {commits, metrics};
    }
}
