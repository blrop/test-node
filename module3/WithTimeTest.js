const WithTime = require('./WithTime');

const asyncFunction = async () => {
    return await fetch('https://jsonplaceholder.typicode.com/posts/1');
};

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));

console.log(withTime.rawListeners("end"));

withTime.execute(asyncFunction);