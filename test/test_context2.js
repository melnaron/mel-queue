// Load modules
var Queue = require('mel-queue');

// Create and run queue of synchronous actions with specified context:
var q = new Queue(); // <- context variable is not set, Queue instance will be used

q.add(function(num) {
	console.log('action1: ' + num);
	this.next([ ++num ]);
});

q.add(function(num) {
	console.log('action2: ' + num);
	this.next([ ++num ]);
});

q.on('end', function(num) {
	console.log('finish:  ' + num);
	if (num < 5) {
		this.next([ ++num ]);
	}
});

q.run([ 1 ]);

// Expected output:
//
// action1: 1
// action2: 2
// finish:  3
// finish:  4
// finish:  5
//
