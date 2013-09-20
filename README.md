Queue - Simple queue engine for Node.js
=======================================

Install:

	npm install mel-queue

Example usage:

	var Queue = require('mel-queue');
	var q = new Queue();
	q.add(function(queue) {
		setTimeout(function() {
			console.log('Action 1 called');
			queue.next(['new_param']);
		}, 200);
	});
	q.add(function(param, queue) {
		setTimeout(function() {
			console.log('Action 2 called with param = '+param);
			queue.next();
		}, 100);
	}, ['default_param']);
	q.on('end', function() {
		console.log('Queue ended');
	});
	q.run();

See `test/*` for more examples...
