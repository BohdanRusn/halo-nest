import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationsModule } from '../conversations/conversations.module';
import { FriendsModule } from '../friends/friends.module';
import { Services } from '../utils/constants';
import { Conversation, Message } from '../utils/typeorm';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, Conversation]),
    ConversationsModule,
    FriendsModule,
  ],
  controllers: [MessageController],
  providers: [
    {
      provide: Services.MESSAGES,
      useClass: MessageService,
    },
  ],
})
export class MessagesModule {}
