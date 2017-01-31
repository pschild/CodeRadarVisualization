var assert = require('assert');

import {CommitMapper} from '../../js/domain/CommitMapper';
import {Commit} from '../../js/domain/Commit';

var dummyResponse = require('../data/dummyCommitResponse.json');

describe('CommitMapper', function () {
    describe('mapAll', function () {
        it('should map data to Commit objects', function () {
            let mapper = new CommitMapper(dummyResponse);
            mapper.mapAll();

            assert.equal(mapper.objects.length, 4);
            for (let obj of mapper.objects) {
                assert.ok(obj instanceof Commit);
            }
        });
    });

    describe('map', function () {
        it('should create a commit object from json data', function () {
            let mapper = new CommitMapper(dummyResponse);
            let commit = mapper.map({
                "name": "b152859ca8d73f5c974c2264107fd0092af310d0",
                "author": "John Doe",
                "timestamp": 1485813773000,
                "analyzed": true
            });

            assert.ok(commit instanceof Commit);
            assert.equal(commit.getName(), 'b152859ca8d73f5c974c2264107fd0092af310d0');
            assert.equal(commit.getAuthor(), 'John Doe');
            assert.equal(commit.getTimestamp(), 1485813773000);
            assert.equal(commit.getAnalyzed(), true);
        });
    });
});