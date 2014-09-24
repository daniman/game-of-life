/**

DOM Manipulations for Conway's Game of Life.

These functions instantiate the board and enable the buttons
of the web app.

**/


/**
Fetch window size to determine board size. Initialize world.
**/
var X = Math.floor(($(window).width()-200) / 20);
var Y = Math.floor(($(window).height()-200) / 20);
var world = new World(X,Y);

/**
Instantiate the board (table). Note that this is done with
JavaScript because the size of the board depends on the size
of the window.
**/
table = "<tbody>"
for (var j=0; j<world.y; j++) {
	table += "<tr>"
	for (var i=0; i<world.x; i++) {
		var cell = world.world[i][j];
		var status; if (cell.state == 0) {status='dead'} else {status='alive'};
		table += "<td id='" + i + "_" + j + "' class='" + status + "'></td>"
	}
	table += "</tr>"
}
$("#world_container").html(table + "</tbody>");

/**
Compares the world state to the state of the HTML representing 
the world and updates appropriately.
**/
function update_table() {
	for (var j=0; j<world.y; j++) {
		for (var i=0; i<world.x; i++) {
			var cell = world.world[i][j];
			var td = $("#"+i+"_"+j);
			if (cell.state==0 && td.attr('class')=='alive') {
				td.removeClass('alive');
				td.addClass('dead')
			} else if (cell.state==1 && td.attr('class')=='dead') {
				td.removeClass('dead');
				td.addClass('alive')
			}
		}
	}
}

/**
Play, Pause, Step buttons.
**/
var player;
function play() {
	player = window.setInterval(function() {
		world.update_world();
		update_table();
	}, 100);
	$("#play").addClass("gray");
	$("#pause").removeClass("gray");
	$("#step").removeClass("gray");
}
function pause() {
	clearInterval(player);
	$("#play").removeClass("gray");
	$("#pause").addClass("gray");
	$("#step").removeClass("gray");
}
function step() {
	clearInterval(player);
	world.update_world();
	update_table();
	$("#play").removeClass("gray");
	$("#pause").removeClass("gray");
	$("#step").addClass("gray");
}

/**
Red button. This places a circle of live cells somwhere randomly
on the board. When clicked in fast succession from an empty board
state, it has the effect of fireworks.
**/
function explosion() {
	ring = [[0,0],[-2,-1],[-2,0],[-2,1],[-1,2],[0,2],[1,2],[2,-1],[2,0],[2,1],[-1,-2],[0,-2],[1,-2]];
	randX = Math.floor(Math.random() * X);
	randY = Math.floor(Math.random() * Y);
	for (i=0; i<ring.length; i++) {
		if ((randX+ring[i][0]<X) && (randX+ring[i][0]>=0) && (randY+ring[i][1]<Y) && (randY+ring[i][1]>=0)) {
			var td = $("#"+(randX+ring[i][0])+"_"+(randY+ring[i][1]));
			var cell = world.world[randX+ring[i][0]][randY+ring[i][1]];
			cell.state = 1;
			td.removeClass('dead');
			td.addClass('alive');
		}
	}
}

/**
Orange button. This restarts the board at a new random state.
**/
function reset() {
	world = new World(X,Y);
	update_table();
}

/**
Blue button. This kills all the cells in the world, thus clearing the board.
**/
function erase() {
	for (var j=0; j<world.y; j++) {
		for (var i=0; i<world.x; i++) {
			var cell = world.world[i][j];
			var td = $("#"+i+"_"+j);
			cell.state = 0;
			td.removeClass('alive');
			td.addClass('dead');
		}
	}
}

/**
Mouse actions that enable drag paint and cell clicking features.
**/
var dragging = false;
$(window).mousedown(function(){
	dragging = true;
});
$(window).mouseup(function(){
	dragging = false;
});
$('td').mouseenter(function() {
	if (dragging) {
		var x = $(this).attr('id').split('_')[0];
		var y = $(this).attr('id').split('_')[1];
		var cell = world.world[x][y];
		if (cell.state==0) {
			cell.state = 1;
			$(this).removeClass('dead');
			$(this).addClass('alive');
		}
	}
});
$("td").mousedown(function() {
	var x = $(this).attr('id').split('_')[0];
	var y = $(this).attr('id').split('_')[1];
	var cell = world.world[x][y];
	if (cell.state == 0) {
		$(this).removeClass('dead');
		$(this).addClass('alive');
		cell.state = 1;
	} else {
		$(this).removeClass('alive');
		$(this).addClass('dead');
		cell.state = 0;
	}
});