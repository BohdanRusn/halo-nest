import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { Repository } from 'typeorm';
import { IGamesService } from '../games/games';
import { GameNotFoundException } from '../games/exceptions/GameNotFound';
import { FriendNotFoundException } from '../friends/exceptions/FriendNotFound';
import { IFriendsService } from '../friends/friends';
import { buildFindMessageParams } from '../utils/builders';
import { Services } from '../utils/constants';
import { Game, Message } from '../utils/typeorm';
import {
  CreateMessageParams,
  DeleteMessageParams,
  EditMessageParams,
} from '../utils/types';
import { CannotCreateMessageException } from './exceptions/CannotCreateMessage';
import { CannotDeleteMessage } from './exceptions/CannotDeleteMessage';
import { IMessageService } from './message';

@Injectable()
export class MessageService implements IMessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @Inject(Services.GAMES)
    private readonly gameService: IGamesService,
    @Inject(Services.FRIENDS_SERVICE)
    private readonly friendsService: IFriendsService,
  ) {}
  async createMessage(params: CreateMessageParams) {
    const { user, content, id } = params;
    const game = await this.gameService.findById(id);
    if (!game) throw new GameNotFoundException();
    const { creator, recipient } = game;
    const isFriends = await this.friendsService.isFriends(
      creator.id,
      recipient.id,
    );
    if (!isFriends) throw new FriendNotFoundException();
    if (creator.id !== user.id && recipient.id !== user.id)
      throw new CannotCreateMessageException();
    const message = this.messageRepository.create({
      content,
      game,
      author: instanceToPlain(user),
    });
    const savedMessage = await this.messageRepository.save(message);
    game.lastMessageSent = savedMessage;
    const updated = await this.gameService.save(game);
    return { message: savedMessage, game: updated };
  }

  getMessages(gameId: number): Promise<Message[]> {
    return this.messageRepository.find({
      relations: ['author', 'attachments'],
      where: { game: { id: gameId } },
      order: { createdAt: 'DESC' },
    });
  }

  async deleteMessage(params: DeleteMessageParams) {
    const { gameId } = params;
    const msgParams = { id: gameId, limit: 5 };
    const game = await this.gameService.getMessages(msgParams);
    if (!game) throw new GameNotFoundException();
    const findMessageParams = buildFindMessageParams(params);
    const message = await this.messageRepository.findOne({
      where: findMessageParams,
    });
    if (!message) throw new CannotDeleteMessage();
    if (game.lastMessageSent.id !== message.id)
      return this.messageRepository.delete({ id: message.id });
    return this.deleteLastMessage(game, message);
  }

  async deleteLastMessage(game: Game, message: Message) {
    const size = game.messages.length;
    const SECOND_MESSAGE_INDEX = 1;
    if (size <= 1) {
      console.log('Last Message Sent is deleted');
      await this.gameService.update({
        id: game.id,
        lastMessageSent: null,
      });
      return this.messageRepository.delete({ id: message.id });
    } else {
      console.log('There are more than 1 message');
      const newLastMessage = game.messages[SECOND_MESSAGE_INDEX];
      await this.gameService.update({
        id: game.id,
        lastMessageSent: newLastMessage,
      });
      return this.messageRepository.delete({ id: message.id });
    }
  }

  async editMessage(params: EditMessageParams) {
    const messageDB = await this.messageRepository.findOne({
      where: {
        id: params.messageId,
        author: { id: params.userId },
      },
      relations: ['game', 'game.creator', 'game.recipient', 'author'],
    });
    if (!messageDB)
      throw new HttpException('Cannot Edit Message', HttpStatus.BAD_REQUEST);
    messageDB.content = params.content;
    return this.messageRepository.save(messageDB);
  }
}
