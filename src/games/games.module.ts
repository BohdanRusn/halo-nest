import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendsModule } from '../friends/friends.module';
import { UsersModule } from '../users/users.module';
import { Services } from '../utils/constants';
import { isAuthorized } from '../utils/helpers';
import { Game, Message } from '../utils/typeorm';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { GameMiddleware } from './middlewares/game.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game, Message]),
    UsersModule,
    FriendsModule,
  ],
  controllers: [GamesController],
  providers: [
    {
      provide: Services.GAMES,
      useClass: GamesService,
    },
  ],
  exports: [
    {
      provide: Services.GAMES,
      useClass: GamesService,
    },
  ],
})
export class GamesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isAuthorized, GameMiddleware)
      .forRoutes('games/:id');
  }
}
