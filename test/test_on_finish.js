// Load modules
var Queue = require('mel-queue');

// Create new actions queue
var q = new Queue();

// Add some actions
q.add(function action1(q) {
	q.started('action1');
	console.log('Action 1 started');

	setTimeout(function() {
		console.log('Action 1 finished');
		q.finished('action1');
	}, 600);

	q.next();
});

q.add(function action2(q) {
	q.started('action2');
	console.log('Action 2 started');

	setTimeout(function() {
		console.log('Action 2 finished');
		q.finished('action2');
	}, 400);

	q.next();
});

q.add(function action3(q) {
	q.started('action3');
	console.log('Action 3 started');

	setTimeout(function() {
		console.log('Action 3 finished');
		q.finished('action3');
	}, 200);

	q.next();
});

// Bind "end" callback
q.on('end', function() {
	console.log('Queue ended');
});

// Bind "finish" callback
q.on('finish', function() {
	console.log('All actions finished');
});

// Run the queue
q.run();

// Expected output:
//   Action 1 started
//   Action 2 started
//   Action 3 started
//   Queue ended
//   Action 3 finished
//   Action 2 finished
//   Action 1 finished
//   All actions finished
