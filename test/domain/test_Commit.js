var assert = require('assert');

import {CommitMapper} from '../../js/domain/CommitMapper';
import {Commit} from '../../js/domain/Commit';

var dummyResponse = require('../data/dummyCommitResponse.json');

describe('Commit', function () {
    describe('setter and getter', function () {
        it('should return correct data', function () {
            let mapper = new CommitMapper(dummyResponse);
            let commit = mapper.map({
                "name": "b152859ca8d73f5c974c2264107fd0092af310d0",
                "author": "John Doe",
                "timestamp": 1485813773000,
                "analyzed": true
            });

            assert.equal(commit.getName(), 'b152859ca8d73f5c974c2264107fd0092af310d0');
            assert.equal(commit.getAuthor(), 'John Doe');
            assert.equal(commit.getTimestamp(), 1485813773000);
            assert.equal(commit.getAnalyzed(), true);

            assert.equal(commit.getShortName().indexOf(commit.getName().substr(0, 7)), 0);

            assert.equal(typeof commit.getFormattedDatetime(), 'string');
        });
    });
});