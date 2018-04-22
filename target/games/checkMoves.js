const board1 = [['x', 'o', 'o'], ['o', 'o', 'o'], ['o', 'o', 'o']];
const board2 = [['x', 'o', 'o'], ['o', 'o', 'o'], ['o', 'o', 'x']];
module.exports.moves = (board1, board2) => board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length;
//# sourceMappingURL=checkMoves.js.map