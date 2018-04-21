// src/games/controller.ts

import Game from './entity'
import { JsonController, Get, Param, Put, Body, NotFoundError,Post, HttpCode,BadRequestError} from 'routing-controllers'

// Define color options and have fc assignRandomColor pick one.
// chosenColor returns the random color.

const colorOptions = ["red","blue","green","yellow","magenta"]
const assignRandomColor = colorOptions  => {return colorOptions[Math.floor(Math.random() * colorOptions.length)];}
//console.log(assignRandomColor(colorOptions));

// Default board setup:
const boardSetup = [['o','o','o'],['o','o','o'],['o','o','o']];
const myJsonBoard = JSON.stringify(boardSetup)

@JsonController()
export default class GameController {
    
    @Get('/games')
        async allGamess() {
        const games = await Game.find()
        //console.log(games);
            return { games }
    }

    @Post('/games')
        async newGame(
            
            @Body() game: Game
        ) {
            console.log(`@post/games -> Setting up a game for: ${game.name}`)
            game.color = assignRandomColor(colorOptions)
            game.board = myJsonBoard
            return game.save()
        }
    
    @Put('/games/:id')
    async updateGame(
        @Param('id') id: number,
        @Body() update: Partial<Game>
    ) {

        const game = await Game.findOne(id)
        if (!game) throw new NotFoundError('The game you are looking for is not here...')
        console.log('---> color: ', game.color);
        if (game.color != 'red') throw new NotFoundError('Please choose a valid color')
        console.log('---> id: ', game.id);
        console.log('---> name:', game.name);
        console.log('---> color: ', game.color);
        console.log('---> board: ', game.board);
        
        return Game.merge(game, update).save()
    }

}

