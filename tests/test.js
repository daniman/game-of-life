test ("cell class", function() {
	var cell = new Cell(0,0,0,5,5);
	equal(cell.x, 0, "x coord");
	equal(cell.y, 0, "y coord");
	equal(cell.state, 0, "state");
	equal(cell.next_state,2,"next state")
});

test ("world class", function() {
	var w = new World(3,3);

	w.world[0][0].state = 1;
	w.world[0][1].state = 0;
	w.world[0][2].state = 1;
	w.world[1][0].state = 0;
	w.world[1][1].state = 1;
	w.world[1][2].state = 0;
	w.world[2][0].state = 1;
	w.world[2][1].state = 0;
	w.world[2][2].state = 1;

	equal(w.x, 3, "width");
	equal(w.y, 3, "height");

	equal(w.num_neighbors(w.world[1][1]), 4,  "num_neighbors");
	w.update_world();

	console.log(w.world);

	equal(w.world[0][0].state,0,"update_cell, update_world, map")
	equal(w.world[0][1].state,1,"update_cell, update_world, map")
	equal(w.world[0][2].state,0,"update_cell, update_world, map")
	equal(w.world[1][0].state,1,"update_cell, update_world, map")
	equal(w.world[1][1].state,0,"update_cell, update_world, map")
	equal(w.world[1][2].state,1,"update_cell, update_world, map")
	equal(w.world[2][0].state,0,"update_cell, update_world, map")
	equal(w.world[2][1].state,1,"update_cell, update_world, map")
	equal(w.world[2][2].state,0,"update_cell, update_world, map")

});