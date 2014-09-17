proj1
=====

Game of Life
To view my app in action, open drawing.html on a browser.

List of problems to resolve in concepts, behaviors or implementation
For each problem: options available, evaluation, which chosen
Notes on code design: schema design choices, abstractions

Note on code design: The original version of Conway's Game of Life have no borders. However, for this project, I set the borders to be the borders of the displayed board to simplify the updating process.

For this project, I wanted to separate the display from the model. To achieve this, I made two js files, one that dealt purely with the user interface (game_of_life_gui.js) and one that contained the model being displayed and functions that manipulated the model (game_of_life.js. Because game_of_life_gui.js relied on the model, I made sure that methods for updating and resetting the board were made accessible to game_of_life_gui.js in game_of_life_gui.js. 

To avoid unnecessary exposure of variables and funcitons into the global environment, I used principles of closure to limit the scope of all variables in game_of_life_gui.js in one function. For game_of_life.js, I defined the object GameOfLife and limited the scope of all variables to that object, with exception to the ones that game_of_life_gui.js needed to access. 

