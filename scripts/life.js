// This file houses the functions that manipulate the elements of the page.
// The way it is currently structured, the page is a canvas that redraws
//     itself every time the world is updated.

world = new World(13,13);
draw_world();
$("#size").val(world.x);

// Function for making the image continuously update when
//    the user clicks play.
var playing = false;
var player = window.setInterval(function() {
	if(playing) {
		update();
	}
}, 250);

function update() {
	world.update_world();
	draw_world(world);
}
function play() {
	playing = true;
	$("#play").addClass("gray");
	$("#pause").removeClass("gray");
	$("#step").removeClass("gray");
}
function pause() {
	playing = false;
	$("#play").removeClass("gray");
	$("#pause").addClass("gray");
	$("#step").removeClass("gray");
}
function step() {
	playing = false;
	update()
	$("#play").removeClass("gray");
	$("#pause").removeClass("gray");
	$("#step").addClass("gray");
}

function reset() {
	var size = parseInt(document.getElementById("size").value);
	world = new World(size, size);
	draw_world(world);
}

function draw_world() {

	var black = Color(0,0,0);
	var gray = Color(249,249,249);
	var red = Color(255,77,35);
	var green = Color(135,195,9);
	var blue = Color(9,195,179);

	pad = Pad(document.getElementById('canvas'));
	pad.clear();

	var X = world.x + 1;
	var Y = world.y + 1;
	var x_factor = pad.get_width() / X;
	var y_factor = pad.get_height() / Y;

	pad.draw_rectangle(Coord(0, 0), pad.get_width(), pad.get_height(), 10, blue, gray);

	var RADIUS = x_factor/3;
	var LINE_WIDTH = 2;
	for (var i=1; i<X; i++) {
		for (var j=1; j<Y; j++) {
			cell = world.world[i-1][j-1];
			if (cell.state == 1) {
				pad.draw_circle(Coord(i*x_factor, j*y_factor),
					RADIUS, LINE_WIDTH, green, green);
			} else {
					pad.draw_circle(Coord(i*x_factor, j*y_factor),
					RADIUS/3, LINE_WIDTH, red, red);
			}
		}
	}
}