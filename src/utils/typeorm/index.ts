import { User } from './entities/User';
import { Session } from './entities/Session';
import { Game } from './entities/Game';
import { Message } from './entities/Message';
import { FriendRequest } from './entities/FriendRequest';
import { Friend } from './entities/Friend';
import { Profile } from './entities/Profile';
import { MessageAttachment } from './entities/MessageAttachment';
import { UserPresence } from './entities/UserPresence';

const entities = [
  User,
  Session,
  Game,
  Message,
  FriendRequest,
  Friend,
  Profile,
  MessageAttachment,
  UserPresence,
];

export default entities;

export {
  User,
  Session,
  Game,
  Message,
  FriendRequest,
  Friend,
  Profile,
  MessageAttachment,
  UserPresence,
};
