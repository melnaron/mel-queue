// Load modules
var Queue = require('mel-queue');

// Define test data
var users = [
	{ id: 1, name: 'Foo' },
	{ id: 2, name: 'Bar' }
];

// Defune test actions
function getUser(id, queue) {
	// Imagine that finding user in DB with callback
	var user = null;
	for (var i = 0; i < users.length; i++) {
		if (users[i].id == id) {
			user = users[i];
		}
	}
	queue.next([ user ]);
}

function sayHello(user, queue) {
	if ( ! user) {
		console.log('User not found');
	}
	else {
		console.log(user.name+' said: Hello!');
	}
	queue.next();
}

// Create and run test queue of synchronous actions:
//
// var user = getUser(2);
// sayHello(user);
//
var q = new Queue;
q.add(getUser, [ 2 ]);
q.add(sayHello);
q.run();

// Expected output:
//
// Bar said: Hello!
//
