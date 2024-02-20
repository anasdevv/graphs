function findPaths(matrix) {
  const n = matrix.length;
  const path = [];
  const result = [];

  function isSafe(row, col) {
    return row >= 0 && row < n && col >= 0 && col < n && matrix[row][col] === 1;
  }

  function explorePath(row, col, direction) {
    // If rat reaches the destination
    if (row === n - 1 && col === n - 1) {
      result.push([...path]);
      return;
    }

    // Explore in the upward direction
    if (isSafe(row - 1, col) && direction !== 'D') {
      path.push('U');
      explorePath(row - 1, col, 'U');
      path.pop();
    }

    // Explore in the downward direction
    if (isSafe(row + 1, col) && direction !== 'U') {
      path.push('D');
      explorePath(row + 1, col, 'D');
      path.pop();
    }

    // Explore in the left direction
    if (isSafe(row, col - 1) && direction !== 'R') {
      path.push('L');
      explorePath(row, col - 1, 'L');
      path.pop();
    }

    // Explore in the right direction
    if (isSafe(row, col + 1) && direction !== 'L') {
      path.push('R');
      explorePath(row, col + 1, 'R');
      path.pop();
    }
  }

  // Start exploring paths from the source (0, 0)
  explorePath(0, 0, '');

  return result;
}

// Example usage:
const matrix = [
  [1, 0, 1, 0],
  [1, 1, 1, 1],
  [0, 1, 0, 1],
  [1, 1, 1, 0],
];

const paths = findPaths(matrix);
console.log(paths);
