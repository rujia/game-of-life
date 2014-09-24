//source equals a double array of 1's and 0's. 
//If source is passed, then set lifeRep to have the same dimensions
//and values as source
var GameOfLife = function(source) {
	// set constants to be able to scale to the size of the display
	var MAX_X = 50;
	var MAX_Y = 50;

	var self = {};

	//lifeRep is the representation of the board of cells
	//rep invariant: lifeRep is a MAX_Y by MAX_X array, 
	//and all values are either 1 or 0. 
	var lifeRep = []; 

	//each cell in lifeRep has a corresponding cell in neighbors. The number of neighbors with 
	//a value of 1 that a lifeRep cell has is equal to the value of the corresponding element in 
	//neighbors.
	//rep invariant: upon calling any function, neighbors is a MAX_Y+2 by MAX_X+2 
	//array, and all values are greater than or equal to 0
	var neighbors = [];

	//Makes sure that neighbors is at least a MAX_Y+2 by MAX_X+2 
	//array, and all values are greater than or equal to 0
	var neighborsCheckRep = function(){
		for (var j=-1; j<MAX_Y+1; j++){
			for (var i = -1; i<MAX_X+1; i++){
				if (typeof neighbors[j][i] != "number" && neighbors[j][i] <0){
					throw {name: 'neighborRepInvariantException', message: "Rep invariant was broken"};
				}
			}
		}
	}

	//LifeRep is a MAX_Y by MAX_X array, 
	//and all values are either 1 or 0. 
	var lifeCheckRep = function() {
		if (!(lifeRep.length == MAX_Y && lifeRep[0].length == MAX_X)){
			throw {name: "lifeRepInvariantException", message: "Rep invariant was broken"};
		}
		for (var j=0; j<MAX_Y; j++){
			for (var i = 0; i<MAX_X; i++){
				if (!(lifeRep[j][i]==0 || lifeRep[j][i]==1)){
					throw {name: "lifeRepInvariantException", message: "Rep invariant was broken"};
				}
			}
		}
	}

	//initialize lifeRep to be a double array of 0's with dimensions
	//MAX_Y by MAX_X. 
	var initializeLifeRep = function(){
		for (var j = 0; j<MAX_Y; j++){
			var lifeRow = [];
			for (var i = 0; i<MAX_X; i++){
				lifeRow[i] = 0;
			}
			lifeRep[j]=lifeRow;
		}
		lifeCheckRep();
	}

	//initialize neighbors to be a double array of 0's with dimensions
	//MAX_Y+2 by MAX_X+2.
	var initializeNeighbors = function(){
		for (var j = -1; j<MAX_Y+1; j++){
			var neighborRow = [];
			for (var i = -1; i<MAX_X+1; i++){
				neighborRow[i] =0;
			}
			neighbors[j]= neighborRow;
		}
		neighborsCheckRep();
	}

	//initialize both neighbors and lifeRep. If source exists, then
	//set lifeRep equal to source. 
	var initializeRep = function(){
		if (source !== undefined) {
			MAX_Y = source.length;
			MAX_X = source[0].length;

			for (var j = 0; j<source.length; j++){
				lifeRep.push([]);
				for (var i = 0; i<source[0].length; i++){
					lifeRep[j][i] = source[j][i];
				}
			}
		}
		else {
			initializeLifeRep();
		}

		initializeNeighbors();
		neighborsUpdate();
	};

	//Takes in the position of the cell in neighbors, 
	//where x is the column index and y is the row index.
	//it then adds parameter value to the surrounding cells in neighbors.
	var neighborsIncrement = function(x, y, value){
		for (var i = x-1; i<=x+1; i++){
			for (var j = y-1; j<=y+1; j++){
				neighbors[j][i] += value;
			}
		}
		neighbors[y][x]-= value;
		neighborsCheckRep();
	}

	//Updates neighbors to reflect the updated lifeRep
	var neighborsUpdate = function(){
		for (var j = -1; j<MAX_Y+1; j++){
			for (var i = -1; i<MAX_X+1; i++){
				neighbors[j][i] =0;
			}
		}
		for (var j=0; j<MAX_Y; j++){
			for (var i = 0; i<MAX_X; i++){
				if (lifeRep[j][i] ==1){
					neighborsIncrement(i, j, 1);
				}
			}
		}
		neighborsCheckRep();
	}

	//random is true if want to randomize the board, else false
	//If random is true, reset lifeRep to a random 
	//configuration 
	//If random is false, then lifeRep is set to a
	//double array of 0's with dimentions MAX_Y by MAX_X. 
	//In each case, neighbors is reset to reflect the new lifeRep.
	self.reset = function(random){
		for (var j = 0; j<MAX_Y; j++){
			for (var i = 0; i<MAX_X; i++){
				lifeRep[j][i] = random && (Math.random() > .5) ? 1 : 0;
			}
		}
		neighborsUpdate();
	}

	//row is the row index and col is the column index
	//addCell sets the value of the lifeRep[row][col] element
	//to 1 and updates neighbors accordingly.
	self.addCell = function(row, col){
		if (lifeRep[row][col]===0){
			lifeRep[row][col] = 1;
			neighborsIncrement(col, row, 1);
		}
		lifeCheckRep();
	}

	//row is the row index and col is the column index
	//addCell sets the value of the lifeRep[row][col] element
	//to 0 and updates neighbors accordingly.
	self.removeCell = function(row, col){
		if (lifeRep[row][col] ===1){
			lifeRep[row][col] = 0;
			neighborsIncrement(col, row, -1);
		}
		lifeCheckRep();
	}

	//Update lifeRep based on the value of each cell and
	//how many neighbors of that cell have a value of 1. 
	//if a cell has a value of 1 and it has fewer than 2 neighbors with a value of 1, 
	//then the cell is updated to a value of 0. 
	//if a cell has a value of 1 and has greater than 3 neighbors with a value of 1, 
	//then the cell is updated to 0.
	//if a cell has a value of 0 and has exactly 3 neighbors with a value of 1, 
	//then the cell is updated to 1. 
	//Then, update neighbors accordingly.
	self.update = function(){
		for (var j=0; j<MAX_Y; j++){
			for (var i=0; i<MAX_X; i++){
				var neighborNumber = neighbors[j][i];
				if (neighborNumber<2 && lifeRep[j][i]==1){
					lifeRep[j][i] =0;
				}
				else if (neighborNumber>3 && lifeRep[j][i]==1){
					lifeRep[j][i] = 0;
				}
				else if (neighborNumber==3 && lifeRep[j][i]==0){
					lifeRep[j][i]=1;
				}
			}
		}
		neighborsUpdate();

		lifeCheckRep();
		neighborsCheckRep();
	}

	initializeRep();
	self.board = lifeRep;
	
	return self;
}