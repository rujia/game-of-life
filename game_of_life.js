var GameOfLife = function() {
	var self = {};

	//lifeRep is the representation of the board of cells
	//rep invariant: upon calling any function, lifeRep is a MAX_Y by MAX_X array, 
	//and all values are either 1 or 0. 
	var lifeRep = []; 
	//each cell in neighbors has a value equal to the number of 
	//neighbors with a value of 1 of the corresponding cell in lifeRep.
	//rep invariant: upon calling any function, neighbors is a MAX_Y+2 by MAX_X+2 
	//array, and all values are greater than or equal to 0
	var neighbors = []; 

	self.board = lifeRep;

	var MAX_X = 10;
	var MAX_Y = 10;

	//Makes sure that neighbors is at least a MAX_Y+2 by MAX_X+2 
	//array, and all values are greater than or equal to 0
	neighbors.checkRep = function(){
		for (var j=-1; j<MAX_Y+1; j++){
			for (var i = -1; i<MAX_X+1; i++){
				if (typeof this[j][i] != "number" && this[j][i] <0){
					throw {name: 'neighborRepInvariantException', message: "Rep invariant was broken"};
				}
			}
		}
	}

	//LifeRep is a MAX_Y by MAX_X array, 
	//and all values are either 1 or 0. 
	lifeRep.checkRep = function() {
		if (!(this.length == MAX_Y && this[0].length == MAX_X)){
			throw {name: "lifeRepInvariantException", message: "Rep invariant was broken"};
		}
		for (var j=0; j<MAX_Y; j++){
			for (var i = 0; i<MAX_X; i++){
				if (!(this[j][i]==0 || this[j][i]==1)){
					throw {name: "lifeRepInvariantException", message: "Rep invariant was broken"};
				}
			}
		}
	}

	//Takes in the position of the cell in lifeRep, 
	//where x is the column index and y is the row index.
	//it then adds one to the surrounding cells in neighbors.
	neighbors.increment = function(x, y){
		for (var i = x-1; i<=x+1; i++){
			for (var j = y-1; j<=y+1; j++){
				this[j][i] += 1;
			}
		}
		this[y][x]-= 1;
		this.checkRep();
	}

	//Updates neighbors to accomodate for updated lifeRep.
	neighbors.update = function(){
		this.reset();
		for (var j=0; j<MAX_Y; j++){
			for (var i = 0; i<MAX_X; i++){
				if (lifeRep[j][i] ==1){
					this.increment(i, j);
				}
			}
		}
		this.checkRep();
	}

	//Resets neighbors to contain all 0's and have the dimensions of
	//MAX_Y+2 by MAX_X+2.
	neighbors.reset = function(){
		for (var j = -1; j<MAX_Y+1; j++){
			var neighborRow = [];
			for (var i = -1; i<MAX_X+1; i++){
				neighborRow[i] =0;
			}
			this[j]= neighborRow;
		}
		this.checkRep();
	}

	//Source equals a double array of 1's and 0's with dimensions MAX_Y by MAX_X. 
	//If source is not passed, reset resets lifeRep to a random 
	//configuration and resets neighbors to contain all 0's. If source
	//is passed, then lifeRep is set to source. 
	self.reset = function(source) {
		if (source == undefined){
			for (var j = 0; j<MAX_Y; j++){
				var lifeRow = [];
				for (var i = 0; i<MAX_X; i++){
					lifeRow[i] = Math.random() > .5 ? 1 : 0;
				}
				lifeRep[j]=lifeRow;
			}
		}
		else {
			for (var j = 0; j<MAX_Y; j++){
				lifeRep[j]=source[j];
			}
		}
		neighbors.reset();
		lifeRep.checkRep();
	}

	//Updates neighbors, then update lifeRep based on the value of each cell and
	//how many neighbors of that cell have a value of 1. 
	//if a cell has a value of 1 and it has fewer than 2 neighbors with a value of 1, 
	//then the cell is updated to a value of 0. 
	//if a cell has a value of 1 and has greater than 3 neighbors with a value of 1, 
	//then the cell is updated to 0.
	//if a cell has a value of 0 and has exactly 3 neighbors with a value of 1, 
	//then the cell is updated to 1. 
	self.update = function(){
		neighbors.update();
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
		lifeRep.checkRep();
		neighbors.checkRep();
		//console.log(neighbors);
	}
	return self;
}