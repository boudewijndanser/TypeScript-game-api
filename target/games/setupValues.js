const colorOptions = ["red", "blue", "green", "yellow", "magenta"];
const assignRandomColor = colorOptions => { return colorOptions[Math.floor(Math.random() * colorOptions.length)]; };
const boardSetup = [['o', 'o', 'o'], ['o', 'o', 'o'], ['o', 'o', 'o']];
const myJsonBoard = JSON.stringify(boardSetup);
module.exports = {
    colorOptions,
    assignRandomColor,
    boardSetup,
    myJsonBoard
};
//# sourceMappingURL=setupValues.js.map