const assert = require('assert');

class Car {
    park() {
        return 'stopped';
    }

    drive() {
        return 'vroom';
    }
}

let car

beforeEach(() => {
    car = new Car();
});

describe('Car', () => {
    it('can car park', () => {
        assert.deepStrictEqual(car.park(), 'stopped');
    });

    it('can drive', () => {
        assert.deepStrictEqual(car.drive(), 'vroom');
    });
});