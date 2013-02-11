// Load modules
var Queue = require('mel-queue');

// Define test constructor and methods
var Player = function(name, level) {
	this.name = name;
	this.level = level;
};

Player.prototype.getPlayerName = function(q) {
	var p = this;

	// Imitate action with callback
	setTimeout(function() {
		console.log(p.name);
		(q && q.next());
	}, 200);
};

Player.prototype.getPlayerLevel = function(q) {
	var p = this;

	// Imitate action with callback
	setTimeout(function() {
		console.log(p.level);
		(q && q.next());
	}, 100);
};

// Create and run queue of synchronous actions with specified context:
var p = new Player('Boo', 7);
var q = new Queue(null, p); // <- variable "p" will be "this" context for running queue actions
q.add(p.getPlayerName);
q.add(p.getPlayerLevel);
q.run();

// Expected output:
//
// Boo
// 7
//
