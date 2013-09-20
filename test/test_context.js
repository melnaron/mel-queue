// Load modules
var Queue = require('../queue.js');

// Define test constructor and methods
var Player = function(name, level) {
	this.name = name;
	this.level = level;
};

Player.prototype.getPlayerName = function(q) {
	var player = this;

	// Imitate action with callback
	setTimeout(function() {
		console.log(player.name);
		q && q.next();
	}, 200);
};

Player.prototype.getPlayerLevel = function(q) {
	var player = this;

	// Imitate action with callback
	setTimeout(function() {
		console.log(player.level);
		q && q.next();
	}, 100);
};

// Create and run queue of synchronous actions with specified context:
var p = new Player('Boo', 7);
var q = new Queue(null, p); // <- variable "p" will be "this" context for all queue actions and events
q.add(p.getPlayerName);
q.add(p.getPlayerLevel);
q.on('end', function() {
	console.log('Player: '+this.name+'['+this.level+']');
});
q.run();

// Expected output:
//
// Boo
// 7
// Player: Boo[7]
//
