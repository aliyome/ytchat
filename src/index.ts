import { extractVideoId } from './utils/extract_video_id';

export const create = (urlOrVideoId: string) => {
  const videoId = extractVideoId(urlOrVideoId);
  return { isAlive: () => !!videoId };
};
