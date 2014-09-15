// This files houses the logic for the Game of Life.
// I have designed the game to have two main components, cells and a world.
// Each world is a square comprised of cells, which are held in a 2D array.
// You initialize a board to a specific size, but the state of the board
// 		is determined randomly - every time you initialize it it will be different.

// Game is comprised of cell units
function Cell(x,y,state,X,Y) {
	this.x = x;
	this.y = y;
	this.state = state;
	this.next_state = 2;
}

function World(X,Y) {
	this.world = []; // 2D list of cells
	this.x = X;
	this.y = Y;

	// Randomly generates a gameboard
	// .25 probability of live cells
	// .75 probability of dead cells
	for (var i=0; i<X; i++) {
		col = [];
		for (var j=0; j<Y; j++) {
			var state = 0;
			var rand = Math.random();
			if (rand > 0.75) {
				state = 1;
			}
			col.push(new Cell(i,j,state,this.x,this.y));
		}
		this.world.push(col);
	}

	// Print game state to console for debugging purposes
	this.print = function() {
		string = "\r\n"
		for (var i=0; i<this.x; i++) {
			for (var j=0; j<this.y; j++) {
				var cell = this.world[i][j];
				if (cell.state == 0) { string = string + "-"; } else { string = string + "X"; }
				string = string + " ";
			}
			string = string + "\r\n";
		}
		return string;
	}

	// returns the number of alive neighbors of a given cell
	this.num_neighbors = function(cell) {
		var neighbors = [[-1,1],[0,1],[1,1],[-1,0],[1,0],[-1,-1],[0,-1],[1,-1]];
		var num = 0;
		for (var i=0; i<neighbors.length; i++) {
			var newX = cell.x+neighbors[i][0];
			var newY = cell.y+neighbors[i][1];
			if ( (newX>=0) && (newX<this.x) && (newY>=0) && (newY<this.y) ) {
				var neighbor = this.world[newX][newY];
				if (neighbor.state == 1) { num++; }
			}
		}
		return num;
	}

	// You want to update cells for a given world state, not dynamically because
	// then they can be affected by their neighbors that have just been updated.
	// Once each cell in the given world state has determined what it's next
	// state should be, this funtion updates them to that state.
	this.update_world = function() {
		this.world = map_world(this, update_cell);
		this.world = map_world(this, function(cell,world) {
			cell.state = cell.next_state;
			return cell
		})
	}
}

// Run this function on each cell in the world so that 
// it can figure out what its next state should be.
function update_cell(cell, world) {
		var neighbors = world.num_neighbors(cell);
		if (neighbors<2) {
			cell.next_state = 0; // kill
		} else if (neighbors>3) {
			cell.next_state = 0; // kill
		} else if (neighbors==3 ) {
			cell.next_state = 1; // resurrect or let be
		} else { // 2 neighbors
			cell.next_state = cell.state;
		}
		return cell
	}