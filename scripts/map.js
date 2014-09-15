// maping function to reduce code complexity
function map_world(world, f) {
	var output = [];
	for (var i=0; i<world.world.length; i++) {
		temp = []
		for (var j=0; j<world.world[i].length; j++) {
			var cell = world.world[i][j];
			temp.push(f(cell, world));
		}
		output.push(temp);
	}
	return output;
}