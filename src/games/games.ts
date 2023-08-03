import { Game, User } from '../utils/typeorm';
import {
  AccessParams,
  CreateGameParams,
  GetGameMessagesParams,
  UpdateGameParams,
} from '../utils/types';

export interface IGamesService {
  createGame(
    user: User,
    gameParams: CreateGameParams,
  ): Promise<Game>;
  getGames(id: number): Promise<Game[]>;
  findById(id: number): Promise<Game | undefined>;
  hasAccess(params: AccessParams): Promise<boolean>;
  isCreated(
    userId: number,
    recipientId: number,
  ): Promise<Game | undefined>;
  save(game: Game): Promise<Game>;
  getMessages(params: GetGameMessagesParams): Promise<Game>;
  update(params: UpdateGameParams);
}
