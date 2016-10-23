export class CommitMerger {

    static merge(firstRoot, secondRoot) {
        this.firstRoot = firstRoot;
        this.walk(secondRoot.children, firstRoot);
        return firstRoot.children;
    }

    static walk(elements, parent) {
        for (let element of elements) {
            // console.log('investigating ', element);

            var foundElement = this.search(element, this.firstRoot.children);
            if (foundElement) {
                // console.log(element.name + ' found in 1st commit');
                if (element.type === 'FILE') {
                    if (element.metricValues['coderadar:javaLoc'] > foundElement.metricValues['coderadar:javaLoc']) {
                        foundElement.metricValues = element.metricValues;
                        foundElement.metricValues.note = 'applied';
                    }
                }
            } else {
                // console.log('NOT found');
                // console.log('parent of not found element: ', parent.name);
                var foundParent = this.search(parent, this.firstRoot.children);
                if (foundParent) {
                    // console.log(parent.name + ' found in 1st commit. adding element to it');
                    foundParent.children.push(element);
                } else {
                    // console.log(parent.name + ' NOT found in 1st commit. adding element to root');
                    this.firstRoot.children.push(element);
                    // console.log(this.firstRoot);
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
}