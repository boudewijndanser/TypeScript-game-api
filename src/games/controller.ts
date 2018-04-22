import { JsonController, Get, Put, Post, Body, Param, NotFoundError, HttpCode, BadRequestError, NotAcceptableError } from 'routing-controllers'
const{ colorOptions, assignRandomColor, boardSetup } = require('./setupValues')
import { movesMade } from './movesMade'
import Game from './entity'

@JsonController()
export default class GameController {
    //2. Setup a webserver using routing-controllers and create a `GET /games` endpoint that returns all the games (with envelope!) -->
    @Get('/games')
    async getAllGames() {
        const games = await Game.find()
        console.log('');
        console.log('---> @Get/games:');
        console.log('-> @Get/games: ', games);
            return { games }
        }

    // 3. Add an endpoint `POST /games` for which the only input is a name. 
    // The created game should receive a random color out of these colors: red, blue, green, yellow, magenta. 
    // So every new game that gets created is assigned a random color.  -->

    @Post('/games')
    @HttpCode(201)
        setupGame(@Body() body: Game) {

            // check if other values are not being posted, only name is allowed
            if(body.color) throw new NotAcceptableError('Posting color is not allowed here...')
            if(body.board) throw new NotAcceptableError('Posting board is not allowed here...')
            if(body.id) throw new NotAcceptableError('Posting id is not allowed here...')

            const game = new Game()
            game.name = body.name
            game.color = assignRandomColor(colorOptions)
            game.board = boardSetup
            console.log('');
            console.log('---> @Post/games:');
            console.log('-> game: ', game);
            return game.save()
        }

    // 4. Add an endpoint `PUT /games` or `PATCH /games` that allows to overwrite one or more fields of the game. 
    // E.g. calling `PUT /games` with JSON body `{ "name": "new name" }` should update the name, same for color and board (not for id). --

    @Put('/games/:id')
    async updateGame(@Param('id') id: number,@Body() update: Partial<Game>) {

        const game = await Game.findOne(id)
        if (!game) throw new NotFoundError('This is not the game you are looking for...')
        console.log('');
        console.log('---> @Put/games:')
        console.log('-> game: ', game);
    
        // Make sure user has filled in all required fields
        if (!update.name) throw new NotFoundError('Please enter a name.')
        if (!update.color) throw new NotFoundError('Choose a color')
        if (!update.board) throw new NotFoundError('Enter a move on the board')

        if(colorOptions.indexOf(update.color) < 0) throw new BadRequestError('Not a valid color.')

        // and the board field is updated, make sure there is only 1 move is made. 
        // That means that only one element out of the 9 can be changed into something else. 

        if(movesMade(game.board, update.board) < 9) throw new BadRequestError('Too many moves...')
        console.log('-> movesMade: ' ,movesMade(game.board, update.board)-9);
        
        console.log('---> @Put/games: Saving in DB'
        return Game.merge(game, update).save()
    }
    
}
