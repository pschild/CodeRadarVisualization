import {InMemoryDbService} from "angular-in-memory-web-api";

export class MockData implements InMemoryDbService {

    createDb() {
        let commits = [
            { name: 'b152859ca8d73f5c974c2264107fd0092af310d0', author: 'John Doe', timestamp: 1485813773000, analyzed: true },
            { name: '2beb1d1d720c1256cedfdf483331f65861079705', author: 'John Doe', timestamp: 1485726067000, analyzed: true },
            { name: 'cbba0662f48f139da4973cc610bd4caa6213ed08', author: 'John Doe', timestamp: 1485633721000, analyzed: true },
            { name: '6ffebfad9e79dfa4ddfa7d043d84eb424a28c0cd', author: 'John Doe', timestamp: 1485561434000, analyzed: true },
            { name: '7ffebfad9e79dfa4ddfa7d043d84eb424a28c0cd', author: 'John Doe', timestamp: 1485561434001, analyzed: true },
            { name: '8ffebfad9e79dfa4ddfa7d043d84eb424a28c0cd', author: 'John Doe', timestamp: 1485561434002, analyzed: true },
            { name: '9ffebfad9e79dfa4ddfa7d043d84eb424a28c0cd', author: 'John Doe', timestamp: 1485561434003, analyzed: true }
        ];
        return {commits};
    }
}
