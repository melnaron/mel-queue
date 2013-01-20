// Load modules
var Queue = require('mel-queue');

// Define test actions
function someAction0(queue) {
	setTimeout(function() {
		console.log('Action 0');
		queue.next();
	}, 4);
}

function someAction1(name, queue) {
	setTimeout(function() {
		console.log('Action 1:', name);
		queue.skip(2).next();
	}, 3);
}

function someAction2(name, foo, queue) {
	setTimeout(function() {
		console.log('Action 2:', name, foo);
		queue.next(['actLast', 'moo', 'car']);
	}, 2);
}

function someAction3(name, foo, bar, queue) {
	setTimeout(function() {
		console.log('Action 3:', name, foo, bar);
		queue.next();
	}, 1);
}

// Create and run test queue
var q = new Queue();
q.add(someAction0);
q.add(someAction1, ['act1']);
q.add(someAction2, ['act2', 'foo']);
q.add(someAction3, ['act3', 'foo', 'bar']);
q.on('end', function() {
	console.log('Queue ended');
});
q.run();

// Expected output:
//   Action 0
//   Action 1: act1
//   * skipped: Action 2: act2 foo
//   * skipped: Action 3: actLast moo car
//   Queue ended
