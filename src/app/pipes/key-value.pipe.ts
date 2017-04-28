import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'keyValue',
    pure: false
})
export class KeyValuePipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (!value) {
            return undefined;
        }

        let keys = [];
        for (let key in value) {
            keys.push({key: key, value: value[key]});
        }
        return keys;
    }

}
