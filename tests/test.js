test ("cell class", function() {
	var cell = new Cell(0,0,0,5,5);
	equal(cell.x, 0, "x coord");
	equal(cell.y, 0, "y coord");
	equal(cell.state, 0, "state");
	equal(cell.next_state,2,"next state")
});

test ("world class", function() {
	var w = new World(2,2);
	w.world = map_world(w, function(cell,w) {
		cell.state = 1;
		return cell
	});
	equal(w.x, 2, "width");
	equal(w.y, 2, "height");
	equal(w.print(), "\r\nX X \r\nX X \r\n", "map, print")

});

// num_neighbors
// update_world
// update_cell