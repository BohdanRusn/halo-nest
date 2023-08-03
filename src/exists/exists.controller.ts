import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IGamesService } from '../games/games';
import { IUserService } from '../users/interfaces/user';
import { Routes, Services } from '../utils/constants';
import { AuthUser } from '../utils/decorators';
import { User } from '../utils/typeorm';

@Controller(Routes.EXISTS)
export class ExistsController {
  constructor(
    @Inject(Services.GAMES)
    private readonly gamesService: IGamesService,
    @Inject(Services.USERS)
    private readonly userService: IUserService,
    private readonly events: EventEmitter2,
  ) {}

  @Get('games/:recipientId')
  async checkGameExists(
    @AuthUser() user: User,
    @Param('recipientId', ParseIntPipe) recipientId: number,
  ) {
    const game = await this.gamesService.isCreated(
      recipientId,
      user.id,
    );
    if (game) return game;
    const recipient = await this.userService.findUser({ id: recipientId });
    if (!recipient)
      throw new HttpException('Recipient Not Found', HttpStatus.NOT_FOUND);
    const newGame = await this.gamesService.createGame(
      user,
      {
        username: recipient.username,
        message: 'hello',
      },
    );
    this.events.emit('game.create', newGame);
    return newGame;
  }
}
