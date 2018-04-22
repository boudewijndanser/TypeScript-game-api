// src/games/controller.ts

import Game from './entity'
import { JsonController, Get, Param, Put, Body, NotFoundError,Post, HttpCode,BadRequestError, NotAcceptableError} from 'routing-controllers'
const{ colorOptions, assignRandomColor, myJsonBoard } = require('./setupValues')

@JsonController()
export default class GameController {
    
    @Get('/games')
        async allGamess() {
        const games = await Game.find()
        //console.log(games);
            return { games }
    }
    @Get('/games/:id')
    async getGame(
    @Param('id') id: number
    ) { 
        const game = await Game.findOne(id)
        console.log(`@Get/games -> Looking at game ${game.id}`);
        return Game.findOne(id)
    }

    @Post('/games')
        async newGame(
            
            @Body() game: Game
        ) {
            console.log(`@post/games -> Setting up a game for ${game.name}`)
            // check if other values are not being posted, only name is allowed
            if(game.color) throw new NotAcceptableError('Posting color is not allowed here...')
            if(game.board) throw new NotAcceptableError('Posting board is not allowed here...')
            if(game.id) throw new NotAcceptableError('Posting id is not allowed here...')

            //Apply setupValues here:
            game.color = assignRandomColor(colorOptions)
            // Regarding step #6 in the homework assignment: Setting empty game.board here because there is no app / front-end way to start it now.
            game.board = myJsonBoard
            
            return game.save()
            //@HttpCode(201)
        }
    
    @Put('/games/:id')
    async updateGame(
        @Param('id') id: number,
        @Body() update: Partial<Game>
    ) {

        const game = await Game.findOne(id)
        if (!game) throw new NotFoundError('The game you are looking for is not here...')
        
        console.log('---> color: ', game.color);
        //if (game.color != 'red') throw new NotFoundError('Please choose a valid color')
        console.log('---> id: ', game.id);
        console.log('---> name:', game.name);
        console.log('---> color: ', game.color);
        console.log('---> board: ', game.board);
        
        return Game.merge(game, update).save()
    }

}


// const moves = (board1, board2) => 
//   board1
//     .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
//     .reduce((a, b) => a.concat(b))
//     .length

// console.log(moves(board1,board2));
