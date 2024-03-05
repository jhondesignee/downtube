export default function isYouTubeUrl(url: string): boolean {
  const ytUrlMask = /youtu(be\.com|\.be)\/.*/i
  return Boolean(url.match(ytUrlMask))
}
