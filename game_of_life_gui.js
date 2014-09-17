
(function(){
	// define some colors
	var black = Color(0,0,0);
	var red = Color(255,0,0);
	var green = Color(0,255,0);
	var blue = Color(0,0,255);
	var white = Color(255, 255, 255);

	// create the drawing pad object and associate with the canvas
	pad = Pad(document.getElementById('canvas'));
	pad.clear();
    
	// set constants to be able to scale to any canvas size
	var MAX_X = 10;
	var MAX_Y = 10;
	var x_factor = pad.get_width() / MAX_X;
	var y_factor = pad.get_height() / MAX_Y;
  
	// draw a box
	pad.draw_rectangle(Coord(0, 0), pad.get_width(), pad.get_height(), 10, black);

	var game = GameOfLife();

	var LINE_WIDTH = 0;

	//draws game.board onto canvas
	var draw = function() {
		for (var j = 0; j<MAX_Y; j++){
			for (var i = 0;i<MAX_X; i++){
				if (game.board[j][i] == 1){
					pad.draw_rectangle(Coord(i*x_factor, j*y_factor), 
						x_factor, y_factor, LINE_WIDTH, green, green);

				}
				else {
					pad.draw_rectangle(Coord(i*x_factor, j*y_factor), 
						x_factor, y_factor, LINE_WIDTH, black, black);
				}
			}
		}
	}

	//update the game board and draw the updated board onto the canvas
	var update = function(){
		game.update();
		draw();
	}

	game.reset();
	draw();

	var intervalID = setInterval(update, 100);
})();