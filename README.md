proj1

PART 1
======

Game of Life

To view my app in action, open drawing.html on a browser.

Note on code design: The original version of Conway's Game of Life has no borders. However, for this project, I set the borders to be the borders of the displayed board to simplify the updating process.

For this project, I wanted to separate the display from the model. This allows me to group all references to the graphics library to one section of the project. To achieve this, I made two js files, one that dealt purely with the user interface (game_of_life_gui.js) and one that contained the model being displayed and functions that manipulated the model (game_of_life.js. Because game_of_life_gui.js relied on the model, I made sure that methods for updating and resetting the board were made accessible to game_of_life_gui.js in game_of_life_gui.js. 

To avoid unnecessary exposure of variables and functions into the global environment, I used principles of closure to limit the scope of all variables in game_of_life_gui.js inside one function. For game_of_life.js, I defined the object GameOfLife and limited the scope of all variables to that object, with exception to the ones that game_of_life_gui.js needed to access. 

For my reset function in game_of_life.js, I included functionality for the case when no arguments are passed in by initializing my board to a random collection of 1's and 0's. I could have included a js file with source boards, but by including the option to randomize, I can effectively portion off that work to the second part of my project. Additionally, this way I can program a way to initialize my board either randomly or to a source board. (https://github.com/6170-fa14/rujiazha_proj1/blob/master/game_of_life.js#L55)

For the double array, neighbors, I made the dimensions for both the columns and rows to be two more than the dimensions for the double array, lifeRep, which represented the board of cells. (https://github.com/6170-fa14/rujiazha_proj1/blob/master/game_of_life.js#L41).  I made this design choice so that I would not have to add code to address edge cases in when I increment the value of the surrounding neighbors of a given cell by one. (https://github.com/6170-fa14/rujiazha_proj1/blob/master/game_of_life.js#L18). This also makes the code cleaner and easier to follow. 	


PART 2
======

In both game_of_life.js and game_of_life_gui.js, there were parts in my code that I needed to execute inside the overall function. In order to limit the scope of the variables used in these parts, I enclosed these segments of code inside functions. 