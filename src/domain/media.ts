export function getMediaUrl(path: string, mediaPath: string | undefined) {
  return mediaPath ? `${mediaPath}${path}` : undefined;
}
