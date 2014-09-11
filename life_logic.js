world = []
X = 9
Y = 9

function create_world() {
	for (var i=0; i<X; i++) {
		col = [];
		for (var j=0; j<Y; j++) {
			if (i%2 == j%2) {
				col.push(new Cell(i,j,0));
			} else {
				col.push(new Cell(i,j,1));
			}
		}
		world.push(col)
	}
}

function Cell(x,y,state) {
	this.x = x;
	this.y = y;
	this.state = state;
	this.next_state = 2;
	this.neighbors = function() {
		var neighbors = [[-1,1],[0,1],[1,1],[-1,0],[1,0],[-1,-1],[0,-1],[1,-1]];
		var num = 0;
		for (var i=0; i<neighbors.length; i++) {
			var newX = this.x+neighbors[i][0];
			var newY = this.y+neighbors[i][1];
			// console.log(newX + ", " + newY);
			if ( (newX>=0) && (newX<X) && (newY>=0) && (newY<Y) ) {
				var neighbor = world[newX][newY];
				if (neighbor.state == 1) { num++; }
			}
		}
		return num;
	}
}

// 1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
// 2. Any live cell with two or three live neighbours lives on to the next generation.
// 3. Any live cell with more than three live neighbours dies, as if by overcrowding.
// 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
function update_cell(cell) {
	neighbors = cell.neighbors();
	// console.log("n: " + neighbors);
	if (neighbors<2) {
		cell.next_state = 0; // kill
	} else if (neighbors>3) {
		cell.next_state = 0; // kill
	} else if (neighbors==3 ) {
		cell.next_state = 1; // resurrect or let be
	} else { // 2 neighbors
		cell.next_state = cell.state;
	}
}

function update_world() {
	for (var i=0; i<X; i++) {
		for (var j=0; j<Y; j++) {
			c = world[i][j];
			c.state = c.next_state;
		}
	}
}