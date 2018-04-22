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
const entity_1 = require("./entity");
const routing_controllers_1 = require("routing-controllers");
const { colorOptions, assignRandomColor, myJsonBoard } = require('./setupValues');
let GameController = class GameController {
    async allGamess() {
        const games = await entity_1.default.find();
        return { games };
    }
    async getGame(id) {
        const game = await entity_1.default.findOne(id);
        console.log(`@Get/games -> Looking at game ${game.id}`);
        return entity_1.default.findOne(id);
    }
    async newGame(game) {
        console.log(`@post/games -> Setting up a game for ${game.name}`);
        if (game.color)
            throw new routing_controllers_1.NotAcceptableError('Posting color is not allowed here...');
        if (game.board)
            throw new routing_controllers_1.NotAcceptableError('Posting board is not allowed here...');
        if (game.id)
            throw new routing_controllers_1.NotAcceptableError('Posting id is not allowed here...');
        game.color = assignRandomColor(colorOptions);
        game.board = myJsonBoard;
        return game.save();
    }
    async updateGame(id, update) {
        const game = await entity_1.default.findOne(id);
        if (!game)
            throw new routing_controllers_1.NotFoundError('The game you are looking for is not here...');
        console.log('---> color: ', game.color);
        console.log('---> id: ', game.id);
        console.log('---> name:', game.name);
        console.log('---> color: ', game.color);
        console.log('---> board: ', game.board);
        return entity_1.default.merge(game, update).save();
    }
};
__decorate([
    routing_controllers_1.Get('/games'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GameController.prototype, "allGamess", null);
__decorate([
    routing_controllers_1.Get('/games/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "getGame", null);
__decorate([
    routing_controllers_1.Post('/games'),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.default]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "newGame", null);
__decorate([
    routing_controllers_1.Put('/games/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "updateGame", null);
GameController = __decorate([
    routing_controllers_1.JsonController()
], GameController);
exports.default = GameController;
//# sourceMappingURL=controller.js.map