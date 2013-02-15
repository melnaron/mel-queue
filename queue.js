/**
 * Queue - Simple queue engine for Node.js
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
 * @param store {Object} - Optional, store to transfer some vars between actions
 * @param context {Object} - Optional [default: Queue instance], "this" context for all actions and events
 * @constructor
 */
var Queue = function(store, context) {
	this.store = store || {};
	this.context = context || this;
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
Queue.prototype.run = function(args) {
	this.next(args);
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

		action.fn.apply(this.context, args);
	}
	else {
		if (args === undefined) {
			args = [];
		}

		if (typeof args === 'object') {
			// Push event name 'end' as first argument
			args.unshift('end');

			// Push queue object as last argument
			args.push(this);
		}

		this.emit.apply(this, args);
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

/**
 * Custom emit method for custom context for event callbacks
 *
 * @param event {String}
 */
Queue.prototype.emit = function(event) {
	// Check type of event argument
	if (typeof event !== 'string') {
		return;
	}

	// Remove event name from the function arguments list
	delete arguments['0'];

	// Create args array
	var args = [];

	// Pass all remaining arguments to args array
	for (var i in arguments) {
		if (arguments.hasOwnProperty(i)) {
			args.push(arguments[i]);
		}
	}

	// Check events registered
	if ( ! this._events) {
		return;
	}

	// Get callbacks for current event
	var callbacks = this._events[event] || null;

	// Check event callbacks
	if ( ! callbacks) {
		return;
	}

	// If just one callback registered normalize it to array of callbacks
	if (typeof callbacks === 'function') {
		callbacks = [ callbacks ];
	}

	// Call each callback with queue or custom context
	for (var j = 0; j < callbacks.length; j++) {
		callbacks[j].apply(this.context, args);
	}
};

// Exports Queue constructor
module.exports = Queue;
