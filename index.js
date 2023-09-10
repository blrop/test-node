const repl = require('repl');

function getRandomNumber() {
	return Math.random();
}

repl.start().context.getRandomNumber = getRandomNumber;