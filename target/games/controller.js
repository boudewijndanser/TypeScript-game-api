"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const { colorOptions, assignRandomColor, boardSetup } = require('./setupValues');
const movesMade_1 = require("./movesMade");
const entity_1 = require("./entity");
let GameController = class GameController {
    async getAllGames() {
        const games = await entity_1.default.find();
        console.log('');
        console.log('---> @Get/games:');
        console.log('-> @Get/games: ', games);
        return { games };
    }
    setupGame(body) {
        if (body.color)
            throw new routing_controllers_1.NotAcceptableError('Posting color is not allowed here...');
        if (body.board)
            throw new routing_controllers_1.NotAcceptableError('Posting board is not allowed here...');
        if (body.id)
            throw new routing_controllers_1.NotAcceptableError('Posting id is not allowed here...');
        const game = new entity_1.default();
        game.name = body.name;
        game.color = assignRandomColor(colorOptions);
        game.board = boardSetup;
        console.log('');
        console.log('---> @Post/games:');
        console.log('-> game: ', game);
        return game.save();
    }
    async updateGame(id, update) {
        const game = await entity_1.default.findOne(id);
        if (!game)
            throw new routing_controllers_1.NotFoundError('This is not the game you are looking for...');
        console.log('');
        console.log('---> @Put/games:');
        console.log('-> game: ', game);
        if (!update.name)
            throw new routing_controllers_1.NotFoundError('Please enter a name.');
        if (!update.color)
            throw new routing_controllers_1.NotFoundError('Choose a color');
        if (!update.board)
            throw new routing_controllers_1.NotFoundError('Enter a move on the board');
        if (colorOptions.indexOf(update.color) < 0)
            throw new routing_controllers_1.BadRequestError('Not a valid color.');
        if (movesMade_1.movesMade(game.board, update.board) < 9)
            throw new routing_controllers_1.BadRequestError('Too many moves...');
        console.log('-> movesMade: ', movesMade_1.movesMade(game.board, update.board) - 9);
        console.log('---> @Put/games: Saving in DB');
        return entity_1.default.merge(game, update).save();
    }
};
__decorate([
    routing_controllers_1.Get('/games'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GameController.prototype, "getAllGames", null);
__decorate([
    routing_controllers_1.Post('/games'),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.default]),
    __metadata("design:returntype", void 0)
], GameController.prototype, "setupGame", null);
__decorate([
    routing_controllers_1.Put('/games/:id'),
    __param(0, routing_controllers_1.Param('id')), __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "updateGame", null);
GameController = __decorate([
    routing_controllers_1.JsonController()
], GameController);
exports.default = GameController;
//# sourceMappingURL=controller.js.map