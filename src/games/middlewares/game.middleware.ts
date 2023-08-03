import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { Services } from '../../utils/constants';
import { AuthenticatedRequest } from '../../utils/types';
import { IGamesService } from '../games';
import { GameNotFoundException } from '../exceptions/GameNotFound';
import { InvalidGameIdException } from '../exceptions/InvalidGameId';

@Injectable()
export class GameMiddleware implements NestMiddleware {
  constructor(
    @Inject(Services.GAMES)
    private readonly gameService: IGamesService,
  ) {}

  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { id: userId } = req.user;
    const id = parseInt(req.params.id);
    if (isNaN(id)) throw new InvalidGameIdException();
    const isReadable = await this.gameService.hasAccess({ id, userId });
    console.log(isReadable);
    if (isReadable) next();
    else throw new GameNotFoundException();
  }
}
