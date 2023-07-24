import { forumConfig } from 'src/config/forum.config';

/**
 * The board outputs avatar URLs as relative paths. On top of that,
 * older avatars were stored differently than more recent avatars. This function
 * parses those relative URLs to absolute URLs.
 * @param rawUrl The raw URL.
 * @returns The parsed absolute URL.
 */
export function parseAvatarUrl(rawUrl: string): string {
  let path = rawUrl;
  // Remove '/bb/./'
  path = path.replace('/bb/./', '');
  // Remove './' from avatarUrl
  path = path.replace(/^\.\//, '');
  return `${forumConfig.FORUM_URL}${path}`;
}
