const EventEmitter = require('./EventEmitter');

module.exports = class WithTime extends EventEmitter {
    async execute(asyncFunc, ...args) {
        this.emit('begin');
        console.time('asyncFunction');

        const response = await asyncFunc(...args);
        const data = await response.json();

        this.emit('end');
        console.timeEnd('asyncFunction');
        console.log('data:', data);
    }
}