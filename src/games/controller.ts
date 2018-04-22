// src/games/controller.ts

import Game from './entity'
import { JsonController, Get, Param, Put, Body, NotFoundError,Post, HttpCode,BadRequestError} from 'routing-controllers'
const{ colorOptions, assignRandomColor, boardSetup, myJsonBoard } = require('./setupValues')

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
            //if(game.color) throw new 

            game.color = assignRandomColor(colorOptions)
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

