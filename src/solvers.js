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
  var board = new Board({n: n});
  var solutionCount = 0;
  var validCols = [];//, validRows = [];
  //var n = board.get('n');
  for (var i = 0; i < n; i++) {
    validCols.push(i);
    //validRows.push(i);
  }
  var solutionFinder = function(rowIndex) {
    for(var i = 0; i < validCols.length; i++) {
      //board.togglePiece(rowIndex, validCols[i]);
      var target = validCols.splice(i,1);
      //not in last row; keep recursing
      if(rowIndex !== n-1) {
        solutionFinder(rowIndex+1);
      }
      //we're in the last row
      else {
        solutionCount++;
      }
      validCols.splice(i, 0, target[0]);
      //board.togglePiece(rowIndex, validCols[i]);
    }
  }

  solutionFinder(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var getValidPairs = function() {
    var result = [];
    for(var i = 0; i < board.get('n'); i++) {
      for(var j = 0; j < board.get('n'); j++) {
        result.push([i, j]);
      }
    }
    return result;
  };

  var removePairs = function(row, column) {
    //var copy = pairs.slice();
    var removed = [];
    for(var i = 0; i < validPairs.length; i++) {
      if(validPairs[i][0] === row) {
        //delete validPairs[key];
        removed.push(validPairs.splice(i,1)[0]);
        i--;
      }
      else if(validPairs[i][1] === column) {
        //delete validPairs[key];
        removed.push(validPairs.splice(i,1)[0]);
        i--;
      }
      else if(validPairs[i][0] + validPairs[i][1] === row + column) {
        //delete validPairs[key];
        removed.push(validPairs.splice(i,1)[0]);
        i--;
      }
      else if(validPairs[i][0] - validPairs[i][1] === row - column) {
        //delete validPairs[key];
        removed.push(validPairs.splice(i,1)[0]);
        i--;
      }
    }
    return removed;

  };

  var placeQueens = function(rowIndex) {
    //if(validPairs.length) {
      // find tuples [i, j] where i === rowIndex
      // for each tuple like that,
      //var valid = [];
      // if we have a solution we'll have one valid pair left && we'll be on the last row
      // toggle, return;
      // if we only have one valid pair and we're NOT on the last row, or if there are no more valid pairs
      // no solution, return;
      if(validPairs.length === 1 && rowIndex === n-1) {
        board.togglePiece(validPairs[0][0], validPairs[0][1]);
        foundSolution = true;
        return;
      }
      else if((!validPairs.length) || (validPairs.length === 1 && rowIndex !== n-1)) {
        return;
      }
      var validPairsInRow = [];
      for (var x = 0; x < validPairs.length; x++) {
        if(validPairs[x][0] === rowIndex) {
          validPairsInRow.push(validPairs[x]);
        }
      }

      for(var i=0; i<validPairsInRow.length; i++) {
        //if(validPairs[i][0] === rowIndex) {
          var queen = validPairsInRow[i];
          board.togglePiece(queen[0], queen[1]);
          var removedPairs = removePairs(queen[0], queen[1]);
          placeQueens(rowIndex + 1);
          if (foundSolution) {
            return;
          }
          board.togglePiece(queen[0], queen[1]);
          for (var j = removedPairs.length - 1; j >= 0; j--) {
            validPairs.unshift(removedPairs[j]);
          }
        //}
      }
  };

  var board = new Board({n: n});
  var foundSolution = false;
  var validPairs = getValidPairs();
  placeQueens(0);
  var solution = board.rows(); //fixme
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  var board = new Board({n: n});
  var solutionCount = 0;

  var findSolution = function(rowIndex) {
    // if we get to the final row AND we can place something
    if (rowIndex === n) {
      solutionCount++;
      return;
    }
    //  then solutionCount++ and return;
    // otherwise
    //  return

    for (var col = 0; col < n; col++) {
    // place a queen
      board.togglePiece(rowIndex, col);
    // check whether queen placement of queen is eligible
      if (!board.hasAnyQueensConflicts()) {
        // call recursively on next row
        findSolution(rowIndex + 1);
      }
    // unplace the queen
      board.togglePiece(rowIndex, col);
    }

  };

  findSolution(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};









/*
for (var j = 0; j < (n - j); j++) {

}
 */



















