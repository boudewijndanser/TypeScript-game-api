//src/games/setupValues.ts

// Define color options and have fc assignRandomColor pick one.
// chosenColor returns the random color.

export const colorOptions = ["red","blue","green","yellow","magenta"]
export const assignRandomColor = colorOptions  => {return colorOptions[Math.floor(Math.random() * colorOptions.length)]}
//console.log(assignRandomColor(colorOptions));

// Default board setup:
export const boardSetup = [['o','o','o'],['o','o','o'],['o','o','o']]