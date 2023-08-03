import { User } from './entities/User';
import { Game } from './entities/Game';
import { Message } from './entities/Message';
import { FriendRequest } from './entities/FriendRequest';
import { Friend } from './entities/Friend';
import { MessageAttachment } from './entities/MessageAttachment';
import { UserPresence } from './entities/UserPresence';

const entities = [
  User,
  Game,
  Message,
  FriendRequest,
  Friend,
  MessageAttachment,
  UserPresence,
];

export default entities;

export {
  User,
  Game,
  Message,
  FriendRequest,
  Friend,
  MessageAttachment,
  UserPresence,
};
