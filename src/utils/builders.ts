import { FindMessageParams } from './types';

export const buildFindMessageParams = (params: FindMessageParams) => ({
  id: params.messageId,
  author: { id: params.userId },
  game: { id: params.gameId },
});
