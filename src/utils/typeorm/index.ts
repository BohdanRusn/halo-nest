import { User } from './entities/User';
import { Session } from './entities/Session';
import { Conversation } from './entities/Conversation';
import { Message } from './entities/Message';
import { FriendRequest } from './entities/FriendRequest';
import { Friend } from './entities/Friend';
import { Profile } from './entities/Profile';
import { MessageAttachment } from './entities/MessageAttachment';
import { UserPresence } from './entities/UserPresence';
import { Peer } from './entities/Peer';

const entities = [
  User,
  Session,
  Conversation,
  Message,
  FriendRequest,
  Friend,
  Profile,
  MessageAttachment,
  UserPresence,
  Peer,
];

export default entities;

export {
  User,
  Session,
  Conversation,
  Message,
  FriendRequest,
  Friend,
  Profile,
  MessageAttachment,
  UserPresence,
  Peer,
};
