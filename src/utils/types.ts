import { Game, Friend, FriendRequest, Message, User } from './typeorm';
import { Request } from 'express';

export type CreateUserDetails = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type ValidateUserDetails = {
  username: string;
  password: string;
};

export type FindUserParams = Partial<{
  id: number;
  email: string;
  username: string;
}>;

export type FindUserOptions = Partial<{
  selectAll: boolean;
}>;

export type CreateGameParams = {
  username: string;
  message: string;
};

export interface AuthenticatedRequest extends Request {
  user: User;
}

export type CreateMessageParams = {
  id: number;
  content?: string;
  user: User;
};

export type CreateMessageResponse = {
  message: Message;
  game: Game;
};

export type DeleteMessageParams = {
  userId: number;
  gameId: number;
  messageId: number;
};

export type FindMessageParams = {
  userId: number;
  gameId: number;
  messageId: number;
};

export type EditMessageParams = {
  gameId: number;
  messageId: number;
  userId: number;
  content: string;
};

export type AccessParams = {
  id: number;
  userId: number;
};

export type CreateFriendParams = {
  user: User;
  username: string;
};

export type FriendRequestStatus = 'accepted' | 'pending' | 'rejected';

export type FriendRequestParams = {
  id: number;
  userId: number;
};

export type CancelFriendRequestParams = {
  id: number;
  userId: number;
};

export type DeleteFriendRequestParams = {
  id: number;
  userId: number;
};

export type AcceptFriendRequestResponse = {
  friend: Friend;
  friendRequest: FriendRequest;
};

export type RemoveFriendEventPayload = {
  friend: Friend;
  userId: number;
};

export type UpdateUserProfileParams = Partial<{
  about: string;
}>;

export type GetGameMessagesParams = {
  id: number;
  limit: number;
};

export type UpdateGameParams = Partial<{
  id: number;
  lastMessageSent: Message;
}>;

export type UpdateStatusMessageParams = {
  user: User;
  statusMessage: string;
};
