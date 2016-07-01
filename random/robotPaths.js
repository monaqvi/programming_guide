/**
 *  
 *  A robot located at the top left corner of a 5x5 grid is trying to reach the 
 *  bottom right corner. The robot can move either up, down, left, or right, 
 *  but cannot visit the same spot twice. How many possible unique paths are 
 *  there to the bottom right corner? 
 *  
 *  make your solution work for a grid of any size.
 *
 */

// First attempt 

//first make a function to create the board as an array of arrays
var makeBoard = function(n) {
  var board = [];
  for (var i = 0; i < n; i++) {
    board.push([]);
    for (var j = 0; j < n; j++) {
      board[i].push(false);
    }
  }
  board.togglePiece = function(i, j) {
    this[i][j] = !this[i][j];
  }
  board.hasBeenVisited = function(i, j) {
    return !!this[i][j];
  }
  board.exists = function(i, j) {
    return i < n && i > -1 && j < n && j > -1;
  }
  board.viablePosition = function(i, j) {
    return board.exists(i, j) && !board.hasBeenVisited(i,j);
  }
  return board;
};


var robotPaths = function(n) {
  var numPaths = 0;
  //call our recursive function (defined below) with a blank board of nxn, with the starting position as (0, 0)
  traversePaths(makeBoard(n), 0, 0);

  //define the recursive function we'll use
  function traversePaths(board, i, j) {
    //BASE CASE: if reached (n - 1, n - 1), count as solution and stop doing work
    if (i === (n - 1) && j === (n - 1)) {
      numPaths++;
      return;
    }
    //mark the current position as having been visited. Doing this after the check for BASE CASE because you don't want to turn the target position (i.e. when you've found a solution) to true or else future paths will see it as an unviable position
    board.togglePiece(i, j);

    //RECURSIVE CASE: if next point is a viable position, go there and make the same decision

    //go right if possible
    if (board.viablePosition(i, j + 1)) {
      traversePaths(board, i, j + 1);
    }

    //go left if possible
    if (board.viablePosition(i, j - 1)) {
      traversePaths(board, i, j - 1);
    }

    //go down if possible
    if (board.viablePosition(i + 1, j)) {
      traversePaths(board, i + 1, j);
    }

    //go up if possible
    if (board.viablePosition(i - 1, j)) {
      traversePaths(board, i - 1, j);
    }

    //reset the board back to the way you found it after you've gone forward so that other paths can see it as a viable position for their routes
    board.togglePiece(i, j);
  }
  return numPaths;
};

// Slower but more terse code

var robotPaths = function(n, board, i, j) {
  if (n === undefined || n <= 0) return null;
  board = board || makeBoard(n),
  i = i || 0,
  j = j || 0;

  // If reached the end, add to numPaths and stop recursing
  if (i === (n - 1) && j === (n - 1)) return 1;
  // If current cell has been visited on this path or doesn't exist, can't go there, so do nothing (no need to return since there are no more recursive calls below this)
  if (board.viablePosition(i, j)) {
    // Mark current cell as having been visited for this path
    board.togglePiece(i, j);
    // Check each of the four possible directions
    var numPaths = robotPaths(n, board, i + 1, j) + robotPaths(n, board, i - 1, j) + robotPaths(n, board, i, j + 1) + robotPaths(n, board, i, j - 1);
    // Reset current cell so other paths can go there (since board is a pointer to an array that every path is accessing)
    board.togglePiece(i, j);
    return numPaths;
  }
  return 0;
}

console.log(robotPaths(6));


