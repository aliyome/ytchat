import { getContinuation } from './utils/get_continuation';

export type CreateOption = {};

export type Chat = {
  isAlive: boolean;
  continuation: string;
};

/**
 * Fetch first continuation parameter,
 * create and start _listen loop.
 * @param videoId
 * @param option
 */
export const create = (videoId: string, option: CreateOption): Chat => {
  const isAlive = true;
  const continuation = getContinuation(videoId, 3, false);
  return {
    isAlive,
    continuation,
  };
};
