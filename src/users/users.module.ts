import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from '../utils/constants';
import { User, UserPresence } from '../utils/typeorm';
import { UserPresenceController } from './controllers/user-presence.controller';
import { UsersController } from './controllers/user.controller';
import { UserPresenceService } from './services/user-presence.service';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserPresence])],
  controllers: [UsersController, UserPresenceController],
  providers: [
    {
      provide: Services.USERS,
      useClass: UserService,
    },
    {
      provide: Services.USER_PRESENCE,
      useClass: UserPresenceService,
    },
  ],
  exports: [
    {
      provide: Services.USERS,
      useClass: UserService,
    },
    {
      provide: Services.USER_PRESENCE,
      useClass: UserPresenceService,
    },
  ],
})
export class UsersModule {}
