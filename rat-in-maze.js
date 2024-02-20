const n = 4;
const m = 4;
const isValid = (i, j, maze) => {
  //   console.log(i, j);
  return i >= 0 && j >= 0 && i < m && j < n && maze[i][j];
};
const direction = 'DURL';
const rowDir = [1, -1, 0, 0];
const colDir = [0, 0, 1, -1];
let res = [];
function findPath(maze, i = 0, j = 0, path = []) {
  if (i == m - 1 && j == n - 1) {
    res.push([...path]);
    return;
  }
  //   console.log('path ', path);
  //   mark visited the current position
  //   mouse can move in 4 directions
  for (let k = 0; k < 4; k++) {
    const nextOrPrevRow = i + rowDir[k];
    const nextOrPrevCol = j + colDir[k];
    if (isValid(nextOrPrevRow, nextOrPrevCol, maze)) {
      maze[i][j] = 0;
      path.push(direction[k]);
      findPath(maze, nextOrPrevRow, nextOrPrevCol, path, res);
      path.pop();
      maze[i][j] = 1;
    }
  }
  //   if not find path backtrack the paths
  //   return false;
}

const maze = [
  [1, 0, 0, 0],
  [1, 1, 0, 1],
  [1, 1, 0, 0],
  [0, 1, 1, 1],
];
// console.log(maze[0][2]);
findPath(maze, 0, 0, []);
console.log('path ', res);
// console.log(maze);
