var Queue = require('../queue.js');

var i = 0;

function someTimeout(timeout, queue) {
	setTimeout(function() {
		i++;
		console.log('Timeout '+i);
		if (i < 3) {
			queue.insert(someTimeout, [ 100 ]);
		}
		queue.next();
	}, timeout);
}

var q = new Queue;

q.add(function() {
	console.log('Action 1 called');
	q.insert(someTimeout, [ 100 ]);
	q.next();
});

q.add(function() {
	console.log('Action 2 called');
	q.next();
});

q.on('end', function() {
	console.log('Queue ended');
});

q.run();

// Expected output:
//
// Action 1 called
// Timeout 1
// Timeout 2
// Timeout 3
// Action 2 called
// Queue ended
//
