import ytdl from "ytdl-native"
import { Orientation } from "#helpers/screen-orientation-handler"

export default class YouTubeVideoHandler {
  public readonly url!: string
  public readonly id!: string | null
  public readonly isShorts!: boolean | null
  public readonly orientation!: Orientation | null

  constructor(url: string) {
    this.url = url
    this.id = YouTubeVideoHandler.getVideoId(this.url)
    this.isShorts = YouTubeVideoHandler.isYouTubeShorts(this.url)
    this.orientation = this.getOrientation()
  }

  public static getVideoId(url: string): string | null {
    try {
      return ytdl.getURLVideoID(url)
    } catch {
      return null
    }
  }

  public static isYouTubeUrl(url: string): boolean {
    return ytdl.validateURL(url)
  }

  public static isYouTubeShorts(url: string): boolean | null {
    if (YouTubeVideoHandler.isYouTubeUrl(url)) {
      return Boolean(url.match(/shorts/i))
    }
    return null
  }

  private getOrientation(): Orientation {
    return this.isShorts ? Orientation.PORTRAIT : Orientation.LANDSCAPE
  }
}
