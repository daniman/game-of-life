/**

Logic for Conway's Game of Life.

The game state is held in a World, which is comprised of
Cells. The initial state of the world is randomly generated.

**/

// Game is comprised of cell units
function Cell(x,y,state,world) {
	this.x = x;
	this.y = y;
	this.state = state;
	this.next_state = 2;
	this.world = world;
	this.update = function() {
		var neighbors = this.world.num_neighbors(this);
		if (neighbors<2) {
			this.next_state = 0; // kill
		} else if (neighbors>3) {
			this.next_state = 0; // kill
		} else if (neighbors==3 ) {
			this.next_state = 1; // resurrect or let be
		} else { // 2 neighbors
			this.next_state = this.state;
		}
		return this
	};
}

function World(X,Y) {
	this.world = []; // 2D list of cells
	this.x = X; // board width
	this.y = Y; // board height

	// initialize state randomly
	for (var i=0; i<X; i++) {
		col = [];
		for (var j=0; j<Y; j++) {
			var state = 0;
			var rand = Math.random();
			if (rand > 0.75) {
				state = 1;
			}
			col.push(new Cell(i,j,state,this));
		}
		this.world.push(col);
	}

	// returns the number of alive neighbors of a cell
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

	// update world state based on what the next cell state should be
	this.update_world = function() {
		for (var i=0; i<world.world.length; i++) {
			for (var j=0; j<world.world[i].length; j++) {
				var cell = world.world[i][j];
				cell.update()
			}
		}
		for (var i=0; i<world.world.length; i++) {
			for (var j=0; j<world.world[i].length; j++) {
				var cell = world.world[i][j];
				cell.state = cell.next_state;
			}
		}
	}
}
