import { getMediaUrl } from '../../domain/media';
import type { Nation } from '../../domain/types';
import type { RawNation } from '../nations';

export function normalizeNations(
  rawNations: RawNation[],
  mediaPath: string | undefined,
): Nation[] {
  const nations: Nation[] = [];
  for (const nation of rawNations) {
    nations.push({
      imageUrl: getMediaUrl(nation.icons.default, mediaPath),
      iconUrl: getMediaUrl(nation.icons.tiny, mediaPath),
      key: nation.name,
      fullNames: nation.localization.mark,
    });
  }

  return nations;
}
