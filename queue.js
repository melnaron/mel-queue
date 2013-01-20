/**
 * Queue - Simple queue engine
 *
 * Example usage:
 *   var Queue = require('mel-queue');
 *   var q = new Queue();
 *   q.add(someAction0);
 *   q.add(someAction1, ['act1']);
 *   q.add(someAction2, ['act2', 'foo']);
 *   q.add(someAction3, ['act3', 'foo', 'bar']);
 *   q.on('end', function() {
 *     console.log('Queue ended');
 *   });
 *   q.run();
 */

// Load modules
var util = require('util');
var events = require('events');

/**
 * Queue model
 *
 * @param store {Object} - Optional, Queue store to transfer some vars between actions
 * @constructor
 */
var Queue = function(store) {
	this.store = store;
	this.queue = [];
	events.EventEmitter.call(this);
};

// Add EventEmitter as parent
util.inherits(Queue, events.EventEmitter);

/**
 * Add action to the queue
 *
 * @param fn {Function} - Action
 * @param args {Array} - Optional, Default action arguments
 */
Queue.prototype.add = function(fn, args) {
	var action = {
		fn: fn,
		args: args || []
	};
	this.queue.push(action);
	return this;
};

/**
 * Run actions queue
 */
Queue.prototype.run = function() {
	this.next();
	return this;
};

/**
 * Call next action in queue
 *
 * @param args {Array} - Optional, New action arguments
 */
Queue.prototype.next = function(args) {
	if (this.queue.length) {
		var action = this.queue.shift();

		if (args === undefined) {
			args = action.args;
		}

		// Push queue as last argument
		if (typeof args === 'object') {
			args.push(this);
		}

		action.fn.apply(action.fn, args);
	}
	else {
		// Queue end, emit event
		this.emit('end');
	}
	return this;
};

/**
 * Skip 'num' of next action(s)
 *
 * @param num {Number}
 */
Queue.prototype.skip = function(num) {
	if (num > 0) {
		for (var i = 0; i < num; i++) {
			if (this.queue.length) {
				this.queue.shift();
			}
		}
	}
	return this;
};

// Exports Queue constructor
module.exports = Queue;
