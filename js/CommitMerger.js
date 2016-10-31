export class CommitMerger {

    static merge(firstRoot, secondRoot) {
        this.firstRoot = firstRoot;
        this.walk(secondRoot.children, firstRoot);
        // TODO: firstRoot.children contains elements that are not contained in secondRoot => remove those
        return firstRoot.children;
    }

    static walk(elements, parent) {
        for (let element of elements) {
            // console.log('investigating ', element);

            // foundElement is the element from #1
            var foundElement = this.search(element, this.firstRoot.children);
            if (foundElement) {
                // console.log(element.name + ' found in 1st commit');
                if (element.type === 'FILE') {
                    foundElement.metricValues = this._mergeMetricValues(foundElement, element);
                }
            } else {
                // console.log('NOT found');
                // console.log('parent of not found element: ', parent.name);
                // var foundParent = this.search(parent, this.firstRoot.children);
                // if (foundParent) {
                //     // console.log(parent.name + ' found in 1st commit. adding element to it');
                //     foundParent.children.push(element);
                // } else {
                //     // console.log(parent.name + ' NOT found in 1st commit. adding element to root');
                //     this.firstRoot.children.push(element);
                //     // console.log(this.firstRoot);
                // }
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
     * @returns Object
     */
    static search(elementToFind, elementsToSearch) {
        for (let element of elementsToSearch) {
            if (element.name === elementToFind.name) {
                return element;
            }

            if (element.children && element.children.length > 0) {
                var resultFromChildrenSearch = this.search(elementToFind, element.children);
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
            returnValue[key][element1.commitId] = element1.metricValues[key];
            returnValue[key][element2.commitId] = element2.metricValues[key];
        }

        return returnValue;
    }
}