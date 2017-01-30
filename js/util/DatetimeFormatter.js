export class DatetimeFormatter {

    constructor() {
        this.dateSeparator = '.';
        this.timeSeparator = ':';
        this.datetimeSeparator = ' ';
        this.label = undefined;
        this.showSeconds = true;
    }

    withDateSeparator(dateSeparator) {
        this.dateSeparator = dateSeparator;
        return this;
    }

    withTimeSeparator(timeSeparator) {
        this.timeSeparator = timeSeparator;
        return this;
    }

    withDatetimeSeparator(datetimeSeparator) {
        this.datetimeSeparator = datetimeSeparator;
        return this;
    }

    withLabel(label) {
        this.label = label;
        return this;
    }

    withShowSeconds(showSeconds) {
        this.showSeconds = showSeconds;
        return this;
    }

    formatDate(date = new Date()) {
        let stringParts = [
            date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
            this.dateSeparator,
            date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
            this.dateSeparator,
            date.getFullYear(),
            this.datetimeSeparator,
            date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
            this.timeSeparator,
            date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        ];

        if (this.showSeconds) {
            stringParts.push(this.timeSeparator);
            stringParts.push(date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        }

        if (this.label) {
            stringParts.push(' ');
            stringParts.push(this.label);
        }

        return stringParts.join('');
    }
}