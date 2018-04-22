//src/games

// Define color options and have fc assignRandomColor pick one.
// chosenColor returns the random color.

const colorOptions = ["red","blue","green","yellow","magenta"]
const assignRandomColor = colorOptions  => {return colorOptions[Math.floor(Math.random() * colorOptions.length)];}
//console.log(assignRandomColor(colorOptions));

// Default board setup:
const boardSetup = [['o','o','o'],['o','o','o'],['o','o','o']];
const myJsonBoard = JSON.stringify(boardSetup)

// Make available for other files
module.exports = {
    colorOptions,
    assignRandomColor,
    boardSetup,
    myJsonBoard
}