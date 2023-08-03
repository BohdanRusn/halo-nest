import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SkipThrottle } from '@nestjs/throttler';
import { AuthenticatedGuard } from '../auth/utils/Guards';
import { Routes, Services } from '../utils/constants';
import { AuthUser } from '../utils/decorators';
import { User } from '../utils/typeorm';
import { IGamesService } from './games';
import { CreateGameDto } from './dtos/CreateGame.dto';

@SkipThrottle()
@Controller(Routes.GAMES)
@UseGuards(AuthenticatedGuard)
export class GamesController {
  constructor(
    @Inject(Services.GAMES)
    private readonly gamesService: IGamesService,
    private readonly events: EventEmitter2,
  ) {}
  @Get('test/endpoint/check')
  test() {
    return;
  }

  @Post()
  async createGame(
    @AuthUser() user: User,
    @Body() createGamePayload: CreateGameDto,
  ) {
    console.log('createGame');
    const game = await this.gamesService.createGame(
      user,
      createGamePayload,
    );
    this.events.emit('game.create', game);
    return game;
  }

  @Get()
  async getGames(@AuthUser() { id }: User) {
    return this.gamesService.getGames(id);
  }

  @Get(':id')
  async getGameById(@Param('id') id: number) {
    return this.gamesService.findById(id);
  }
}
