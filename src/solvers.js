/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  // create an empty board of size n x n
  var board = new Board({n: n});
  var validCols = [], validRows = [];
  for (var i = 0; i < n; i++) {
    validCols.push(i);
    validRows.push(i);
  }
  var rookSelector = function() {
    if (!validRows.length) return;
    var col = validCols.pop();
    var row = validRows.pop();
    board.togglePiece(row, col);
    rookSelector();
  };
  rookSelector();
  var solution = board.rows(); //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  //
  //recursive function
    //for each index in whatever row we're in
      //for each valid column in this row
        //place a piece
        //remove column from valid columns
        //if there's more rows
          //call recursive function (down one row)
        //solutionCount++;
        //add current column back into valid columns
        //return
  var board = new Board({n: n});
  var solutionCount = 0;
  var validCols = [], validRows = [];
  for (var i = 0; i < n; i++) {
    validCols.push(i);
    validRows.push(i);
  }
  var solutionFinder = function(rowIndex) {
    for(var i = 0; i < validCols.length; i++) {
      board.togglePiece(rowIndex, validCols[i]);
      var target = validCols.splice(i,1);
      if(rowIndex !== board.get('n')-1) {
        solutionFinder(rowIndex+1);
      }
      else {
        solutionCount++;
      }
      validCols.splice(i, 0, target[0]);
      board.togglePiece(rowIndex, validCols[i]);
    }
  }

  solutionFinder(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var validPairs = [];
  for(var i = 0; i < board.get('n'); i++) {
    for(var j = 0; j < board.get('n'); j++) {
      validPairs.push([i, j]);
    }
  }

  var removePairs = function(row, column) {
    //var copy = pairs.slice();
    var removed = [];
    for(var i = 0; i < validPairs.length; i++) {
      if(validPairs[i][0] === row) {
        //delete validPairs[key];
        removed.push(validPairs.splice(i,1));
        i--;
      }
      else if(validPairs[i][1] === column) {
        //delete validPairs[key];
        removed.push(validPairs.splice(i,1));
        i--;
      }
      else if(validPairs[i][0] + validPairs[i][1] === row + column) {
        //delete validPairs[key];
        removed.push(validPairs.splice(i,1));
        i--;
      }
      else if(validPairs[i][0] - validPairs[i][1] === row - column) {
        //delete validPairs[key];
        removed.push(validPairs.splice(i,1));
        i--;
      }
    }
    return removed;

  };

  ///var rowIndex = 0;
  //var removed;
  //var solutions = [];
  var placeQueens = function() {
    if(validPairs.length) {
      var queen = validPairs.shift();
      board.togglePiece(queen[0], queen[1]);
      if(validPairs.length) {
        var removedPairs = removePairs(queen[0], queen[1]);
        placeQueens();
        for (var i = removedPairs.length - 1; i >= 0; i--) {
          validPairs.unshift(removedPairs(i));
        }

      }
    }
    //re-initialize validPair/add all valid pairs
    // for each still-valid place in row
      // toggle
      // remove from valid pairs
      // remove all
      // call recursion
      //

  };

  placeQueens();
  var solution = board.rows(); //fixme
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
