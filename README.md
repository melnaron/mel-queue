Queue - Simple queue engine for Node.js
=======================================

Install:

	npm install mel-queue

Example usage:

	var Queue = require('mel-queue');
	var q = new Queue();
	q.add(someAction0);
	q.add(someAction1, ['act1']);
	q.add(someAction2, ['act2', 'foo']);
	q.add(someAction3, ['act3', 'foo', 'bar']);
	q.on('end', function() {
		console.log('Queue ended');
	});
	q.run();

See `test/test.js` for complete test code...
