## Game of Life (proj1)

This is an implementation of Conway's Game of Life, using the HTML canvas drawing methods to show the state of the world. The board has play, pause, and step buttons. In addition, there is a field where the user can update the size of the board.

### Usage:
To view the app, open up index.html in your favorite browser.

### Grading:
The file structure has, at the top level, a drawing.html file and a scripts and tests folder. The files that I have added to the project are life.js, logic.js, and map.js (all found in the scripts folder). These are the files that should be looked at and graded mostly. I added a few html elements and some css to the drawing.html file, but those changes are minimal. I also added some basic tests for the game in tests/test.js.The file life.js houses functions that change the elements of drawing.html (updating page, making pause/play buttons work, etc). The file logic.js contains code for a 'Cell' and 'World', of which my game of life is built upon. This file also contains functions like update_cell, etc. The map.js file holds one function, which maps a current world state to another world state.

### Design:
I designed this code so that there would be two datatypes, World and Cell - a World being made up of a grid of Cells (stored in a 2D array). I chose to do this because in an application like this, where cells have coords and change states, it's really useful to be able to call cell.state to access this information. The main challenges that I had were addressing the dependencies that the Cell and World class have on eachother. For example, I wanted my function update_cell to be part of the cell class, so that I could call cell.update, which is more intuitive and safe than having my update funciton in the global sciope. I also wanted my num_neighbors function to be part of the Cell class as opposed to part of the World class, as this would also be more intuitive. Yet when you put both of these functions in the Cell class, update needs to call neighbors, and it doesn't work. I'm still trying to think of a way around this problem, but for now I have the num_neighbors function in the World class, and the update_cell function in the global scope.
