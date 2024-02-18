const QUEENS = Number(process.argv[2]) || 8;
console.log(QUEENS);
console.log(`Number of Queens ${QUEENS}`);
if (!Number.isInteger(QUEENS) || QUEENS < 4 || QUEENS > 8) {
  throw new Error('Specify Queens');
}
const isValid = (row, col, matrix) => {
  // check row
  for (let i = col; i >= 0; i--) if (matrix[row][i]) return false;

  //   check upper diagonal
  for (let i = row, j = col; i >= 0 && j >= 0; i--, j--)
    if (matrix[i][j]) return false;

  //   check lower diagonal
  for (let i = row, j = col; i < matrix.length && j >= 0; i++, j--)
    if (matrix[i][j]) return false;
  return true;
};
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function Nqueen(mat, c) {
  if (c >= QUEENS) return true;

  for (let i = 0; i < mat.length; i++) {
    if (isValid(i, c, mat)) {
      // mark current location as visited
      mat[i][c] = 1;
      if (Nqueen(mat, c + 1)) {
        return true;
      }
      //   if can not place queen at i'th position backtrack
      mat[i][c] = 0;
    }
  }
  //   if queen can not be placed in current col return false
  return false;
}

const arr = Array.from(
  {
    length: QUEENS,
  },
  () => Array.from({ length: QUEENS }, () => 0)
);
// placing queen randomly anywhere
// arr[getRandomInteger(0, 3)][getRandomInteger(0, 3)] = 1;
Nqueen(arr, 0);
arr.forEach((a) => console.log(a));
// console.log(arr);
