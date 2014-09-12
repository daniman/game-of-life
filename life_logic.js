function Cell(x,y,state,X,Y) {
	this.x = x;
	this.y = y;
	this.state = state;
	this.next_state = 2;
}

function World(X,Y) {

	this.world = [];
	this.x = X;
	this.y = Y;

	for (var i=0; i<X; i++) {
		col = [];
		for (var j=0; j<Y; j++) {
			if (i%2 == j%2) {
				col.push(new Cell(i,j,0,this.x,this.y));
			} else {
				col.push(new Cell(i,j,1,this.x,this.y));
			}
		}
		this.world.push(col);
	}

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

	this.update_world = function() {
		this.world = map_world(this, update_cell);
		this.world = map_world(this, function(cell,world) {
			cell.state = cell.next_state;
			return cell
		})
	}

}

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