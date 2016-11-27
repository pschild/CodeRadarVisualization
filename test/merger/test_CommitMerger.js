var assert = require('assert');

import {CommitMerger} from '../../js/CommitMerger';

describe('CommitMerger', function () {
    describe('#_createMetricValueObjects(elements, commitId)', function () {
        var json = {
            type: 'ROOT',
            children: [
                {
                    type: 'FILE',
                    metricValues: {
                        'metricName1': 111,
                        'metricName2': 222
                    },
                    children: []
                },
                {
                    type: 'MODULE',
                    children: [
                        {
                            type: 'FILE',
                            metricValues: {
                                'metricName1': 333,
                                'metricName2': 444
                            },
                            children: []
                        }
                    ]
                }
            ]
        };

        CommitMerger._createMetricValueObjects(json, 'abc123');

        it('should create correct objects', function () {
            var metricValuesOfFirstFile = json.children[0].metricValues;
            var metricValuesOfSecondFile = json.children[1].children[0].metricValues;

            assert.deepEqual(metricValuesOfFirstFile, {
                'metricName1': {
                    'abc123': 111
                },
                'metricName2': {
                    'abc123': 222
                }
            });

            assert.deepEqual(metricValuesOfSecondFile, {
                'metricName1': {
                    'abc123': 333
                },
                'metricName2': {
                    'abc123': 444
                }
            });
        });
    });
});