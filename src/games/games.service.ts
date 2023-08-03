import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FriendNotFoundException } from '../friends/exceptions/FriendNotFound';
import { IFriendsService } from '../friends/friends';
import { UserNotFoundException } from '../users/exceptions/UserNotFound';
import { IUserService } from '../users/interfaces/user';
import { Services } from '../utils/constants';
import { Game, Message, User } from '../utils/typeorm';
import {
  AccessParams,
  CreateGameParams,
  GetGameMessagesParams,
  UpdateGameParams,
} from '../utils/types';
import { IGamesService } from './games';
import { GameExistsException } from './exceptions/GameExists';
import { GameNotFoundException } from './exceptions/GameNotFound';
import { CreateGameException } from './exceptions/CreateGame';

@Injectable()
export class GamesService implements IGamesService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @Inject(Services.USERS)
    private readonly userService: IUserService,
    @Inject(Services.FRIENDS_SERVICE)
    private readonly friendsService: IFriendsService,
  ) {}

  async getGames(id: number): Promise<Game[]> {
    return this.gameRepository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.lastMessageSent', 'lastMessageSent')
      .leftJoinAndSelect('game.creator', 'creator')
      .leftJoinAndSelect('game.recipient', 'recipient')
      .where('creator.id = :id', { id })
      .orWhere('recipient.id = :id', { id })
      .orderBy('game.lastMessageSentAt', 'DESC')
      .getMany();
  }

  async findById(id: number) {
    return this.gameRepository.findOne({
      where: { id },
      relations: [
        'creator',
        'recipient',
        'lastMessageSent',
      ],
    });
  }

  async isCreated(userId: number, recipientId: number) {
    return this.gameRepository.findOne({
      where: [
        {
          creator: { id: userId },
          recipient: { id: recipientId },
        },
        {
          creator: { id: recipientId },
          recipient: { id: userId },
        },
      ],
    });
  }

  async createGame(creator: User, params: CreateGameParams) {
    const { username, message: content } = params;
    const recipient = await this.userService.findUser({ username });
    if (!recipient) throw new UserNotFoundException();
    if (creator.id === recipient.id)
      throw new CreateGameException(
        'Cannot create Game with yourself',
      );
    const isFriends = await this.friendsService.isFriends(
      creator.id,
      recipient.id,
    );
    if (!isFriends) throw new FriendNotFoundException();
    const exists = await this.isCreated(creator.id, recipient.id);
    if (exists) throw new GameExistsException();
    const newGame = this.gameRepository.create({
      creator,
      recipient,
    });
    const game = await this.gameRepository.save(
      newGame,
    );
    const newMessage = this.messageRepository.create({
      content,
      game,
      author: creator,
    });
    await this.messageRepository.save(newMessage);
    return game;
  }

  async hasAccess({ id, userId }: AccessParams) {
    const game = await this.findById(id);
    if (!game) throw new GameNotFoundException();
    return (
      game.creator.id === userId || game.recipient.id === userId
    );
  }

  save(game: Game): Promise<Game> {
    return this.gameRepository.save(game);
  }

  getMessages({
    id,
    limit,
  }: GetGameMessagesParams): Promise<Game> {
    return this.gameRepository
      .createQueryBuilder('game')
      .where('id = :id', { id })
      .leftJoinAndSelect('game.lastMessageSent', 'lastMessageSent')
      .leftJoinAndSelect('game.messages', 'message')
      .where('game.id = :id', { id })
      .orderBy('message.createdAt', 'DESC')
      .limit(limit)
      .getOne();
  }

  update({ id, lastMessageSent }: UpdateGameParams) {
    return this.gameRepository.update(id, { lastMessageSent });
  }
}
