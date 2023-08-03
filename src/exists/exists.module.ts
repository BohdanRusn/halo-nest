import { Module } from '@nestjs/common';
import { GamesModule } from '../games/games.module';
import { UsersModule } from '../users/users.module';
import { ExistsController } from './exists.controller';

@Module({
  imports: [GamesModule, UsersModule],
  controllers: [ExistsController],
  providers: [],
})
export class ExistsModule {}
