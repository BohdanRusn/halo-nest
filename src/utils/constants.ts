export enum Routes {
  AUTH = 'auth',
  USERS = 'users',
  USERS_PROFILES = 'users/profiles',
  CONVERSATIONS = 'conversations',
  MESSAGES = 'conversations/:id/messages',
  EXISTS = 'exists',
  FRIENDS = 'friends',
  FRIEND_REQUESTS = 'friends/requests',
  USER_PRESENCE = 'users/presence',
}

export enum Services {
  AUTH = 'AUTH_SERVICE',
  USERS = 'USERS_SERVICE',
  USERS_PROFILES = 'USERS_PROFILES_SERVICE',
  USER_PRESENCE = 'USER_PRESENCE_SERVICE',
  CONVERSATIONS = 'CONVERSATIONS_SERVICE',
  MESSAGES = 'MESSAGE_SERVICE',
  GATEWAY_SESSION_MANAGER = 'GATEWAY_SESSION_MANAGER',
  FRIENDS_SERVICE = 'FRIENDS_SERVICE',
  FRIENDS_REQUESTS_SERVICE = 'FRIEND_REQUEST_SERVICE',
}

export enum ServerEvents {
  FRIEND_REQUEST_ACCEPTED = 'friendrequest.accepted',
  FRIEND_REQUEST_REJECTED = 'friendrequest.rejected',
  FRIEND_REMOVED = 'friend.removed',
}

export enum WebsocketEvents {
  FRIEND_REQUEST_ACCEPTED = 'onFriendRequestAccepted',
  FRIEND_REQUEST_REJECTED = 'onFriendRequestRejected',
}
