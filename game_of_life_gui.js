$(function(){
    var mouseDown = false;
    var canDraw = true;
    var INITIAL_INTERVAL_ID = 0;

	var game = GameOfLife();

	//set dimensions of the board
	var MAX_X = game.board[0].length;
	var MAX_Y = game.board.length;

	//make the board
	var makeboard = function(){
		for (var j = 0; j<MAX_Y; j++){
			$("#grid").append("<div class='row' data-row='"+ j + "'></div>");
			for (var i = 0;i<MAX_X; i++){
				$(".row[data-row='" + j + "']").append("<div class='cell' data-col='"+ i+ "'></div>");
			}
		}
	};
	makeboard();

	//set the appropriate width and height of each cell
	$(".cell").css("height", $("#grid").css("height").substring(0,$("#grid").css("height").indexOf("p"))/MAX_Y+"px")
	.css("width", $("#grid").css("width").substring(0,$("#grid").css("width").indexOf("p"))/MAX_X+"px");


	//draws game.board onto display
	var draw = function() {
		$(".cell").each(function(){
			var row = parseInt($(this).parent().attr('data-row'), 10);
	        var col = parseInt($(this).attr('data-col'), 10);
			if (game.board[row][col] === 1){
    			$(this).addClass("alive");
			}
			else {
				$(this).removeClass("alive");
			}
		});
	}

	//update the game board and show the updated board
	var update = function(){
		game.update();
		draw();
	}

	var intervalID = INITIAL_INTERVAL_ID; 

	
	$("#start").click(function(){
		console.log(intervalID);
		if (intervalID===0){
			intervalID = setInterval(update, 10);
			$(this).text("Pause");
			$("#step").prop("disabled", true);
			$("#clear").prop("disabled", true);
			$("#random").prop("disabled", true);
		}
		else {
			clearInterval(intervalID);
			intervalID= INITIAL_INTERVAL_ID;
			$(this).text("Start");
			$("#step").prop("disabled", false);
			$("#clear").prop("disabled", false);
			$("#random").prop("disabled", false);
		}
	});

	//On click, updates the game and show the updated board
	$("#step").click(function(){
		update();
	})

	//On click, reverses the value of canDraw, 
	//and updates the text of the button to reflect current function
	$("#draw").click(function(){
		if (!canDraw) $(this).text("Erase");
		else $(this).text("Draw");
		canDraw = !canDraw;
	});

	//On click, clears game board and displays board
	$("#clear").click(function(){
		game.reset(false);
		$(".cell").each(function(){
			$(this).removeClass("alive");
		});
	});

	//On click, randomizes game board and displays board
	$("#random").click(function(){
		game.reset(true);
		draw();
	})
	
	//On click, change status of cell to alive if canDraw is true, 
	//else change status of cell to dead.
	$(".cell").click(function(){
		var row = parseInt($(this).parent().attr('data-row'), 10);
        var col = parseInt($(this).attr('data-col'), 10);
		if (canDraw){
	        game.addCell(row,col);
		    $(this).addClass("alive");
		}
		else{
			game.removeCell(row,col);
		    $(this).removeClass("alive");
		}
	});

	//On mouseover, if mouseDown is true then change status of cell to 
	//alive if canDraw is true and dead if false.
	$(".cell").mouseover(function(){
		if (mouseDown){
			var row = parseInt($(this).parent().attr('data-row'), 10);
	        var col = parseInt($(this).attr('data-col'), 10);
	        if (canDraw){
		        game.addCell(row,col);
		        $(this).addClass("alive");
			}
			else{
				game.removeCell(row,col);
				$(this).removeClass("alive");
			}
		}
	});

	//On mousedown, set mouseDown to true
	$("#grid").mousedown(function(){
		mouseDown = true;
	});

	//On mouseup, set mouseDown to false
	$(document).mouseup(function(){
		mouseDown = false;
	});
});