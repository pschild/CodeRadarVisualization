export class CommitMerger {

    static merge(firstRoot, secondRoot) {
        this.firstCommitId = firstRoot.commitId;
        this.secondCommitId = secondRoot.commitId;

        // do some preparations
        this._createMetricValueObjects(firstRoot.children, this.firstCommitId);
        this._createMetricValueObjects(secondRoot.children, this.secondCommitId);

        this.firstRoot = firstRoot;
        this.walk(secondRoot.children, firstRoot);

        return firstRoot.children;
    }

    /**
     * Recursively changes
     *
     * metricValues: {
     *     METRIC_1_NAME: 500,
     *     METRIC_2_NAME: 1000
     * }
     *
     * to
     *
     * metricValues: {
     *     METRIC_1_NAME: {
     *         COMMIT_ID: 500
     *     },
     *     METRIC_2_NAME: {
     *         COMMIT_ID: 1000
     *     }
     * }
     *
     * @param elements
     * @param commitId
     */
    static _createMetricValueObjects(elements, commitId) {
        if (!Array.isArray(elements)) {
            elements = [elements];
        }

        for (let element of elements) {
            if (element.type === 'FILE') {
                var metricValues = element.metricValues;
                for (let metricName in metricValues) {
                    if (typeof metricValues[metricName] == 'number') {
                        var tempValue = metricValues[metricName];
                        metricValues[metricName] = {};
                        metricValues[metricName][commitId] = tempValue;
                    }
                }
            }

            if (element.children && element.children.length > 0) {
                this._createMetricValueObjects(element.children, commitId);
            }
        }
    }

    static walk(elements, parent) {
        for (let element of elements) {
            // console.log('investigating ', element);

            // foundElement is the element from #1
            var searchResult = this.search(element, this.firstRoot.children, this.firstRoot);
            var foundElement = searchResult ? searchResult.foundElement : undefined;

            if (foundElement) {
                // console.log(element.name + ' found in 1st commit');
                if (parent.name != searchResult.foundElementsParent.name) {
                    console.log('we have different parents for ' + element.name + ': ', parent.name, searchResult.foundElementsParent.name);
                    console.log(element.name + ' should be added to ' + parent.name + ' in the result object');
                    var searchResult = this.search(parent, this.firstRoot, this.firstRoot);
                    var foundElement = searchResult ? searchResult.foundElement : undefined;
                    if (foundElement) {
                        foundElement.children.push(element);
                        // IMPORTANT: continue, so that child elements of added element are not investigated. This ist not necessary.
                        continue;
                    }
                } else {
                    if (element.type === 'FILE') {
                        foundElement.metricValues = this._mergeMetricValues(foundElement, element);
                    }
                }

            } else {
                console.log('NOT found:', element.name);
                console.log('parent of not found element: ', parent.name);
                var searchResult = this.search(parent, this.firstRoot.children, this.firstRoot);
                var foundParent = searchResult ? searchResult.foundElement : undefined;
                if (foundParent) {
                    console.log(parent.name + ' found in 1st commit. adding element to it');
                    foundParent.children.push(element);
                } else {
                    console.log(parent.name + ' NOT found in 1st commit. adding element to root');
                    this.firstRoot.children.push(element);
                }
            }

            if (element.children && element.children.length > 0) {
                this.walk(element.children, element);
            }
        }
    }

    /**
     * Sucht rekursiv nach einem Element in einer Liste von Elementen.
     * Falls ein durchsuchtes Element ebenfalls eine Liste von Elementen enthält, werden diese ebenfalls durchsucht.
     *
     * @param elementToFind
     * @param elementsToSearch
     * @param parent
     * @returns Object
     */
    static search(elementToFind, elementsToSearch, parent = undefined) {
        if (!Array.isArray(elementsToSearch)) {
            elementsToSearch = [elementsToSearch];
        }

        for (let element of elementsToSearch) {
            if (element.name === elementToFind.name) {
                return {
                    foundElement: element,
                    foundElementsParent: parent
                };
            }

            if (element.children && element.children.length > 0) {
                var resultFromChildrenSearch = this.search(elementToFind, element.children, element);
                if (resultFromChildrenSearch) {
                    return resultFromChildrenSearch;
                }
            }
        }

        return null;
    }

    static _mergeMetricValues(element1, element2) {
        let returnValue = {};
        let metricValueKeys = Object.keys(element1.metricValues);
        for (let key of metricValueKeys) {
            returnValue[key] = {};
            returnValue[key][this.firstCommitId] = element1.metricValues[key][this.firstCommitId];
            returnValue[key][this.secondCommitId] = element2.metricValues[key][this.secondCommitId];
        }

        return returnValue;
    }
}