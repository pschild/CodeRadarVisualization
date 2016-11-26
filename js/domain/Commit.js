export class Commit {

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setAuthor(author) {
        this.author = author;
    }

    getAuthor() {
        return this.author;
    }

    setTimestamp(timestamp) {
        this.timestamp = timestamp;
    }

    getTimestamp() {
        return this.timestamp;
    }

    setAnalyzed(analyzed) {
        this.analyzed = analyzed;
    }

    getAnalyzed() {
        return this.analyzed;
    }

    getShortName() {
        return this.name.substr(0, 7) + '...';
    }

    getFormattedDatetime() {
        let date = new Date(this.timestamp);
        return [
            date.getDate(),
            '.',
            date.getMonth() + 1,
            '.',
            date.getFullYear(),
            ' ',
            date.getHours(),
            ':',
            date.getMinutes()
        ].join('');
    }

}