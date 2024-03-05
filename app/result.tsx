import { useCallback, useState } from "react"
import { View } from "react-native"
import { Card, Text, Button, Divider, useTheme } from "react-native-paper"
import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router"
import * as NavigationBar from "expo-navigation-bar"
import * as ScreenOrientation from "expo-screen-orientation"
import YouTubePlayer from "react-native-youtube-iframe"
import getVideoId from "get-video-id"
import Template from "#components/Template"

type TOrientation = "portrait" | "landscape"

function isYouTubeShorts(url: string): boolean {
  return Boolean(url.match(/shorts/i))
}

async function toggleFullScreenOrientation(isFullScreen: boolean, orientation: TOrientation) {
  const portraitOrientationEnum = 3
  const landscapeOrientationEnum = 5
  if (isFullScreen) {
    if (orientation === "portrait") {
      await ScreenOrientation.lockAsync(portraitOrientationEnum)
    } else {
      await ScreenOrientation.lockAsync(landscapeOrientationEnum)
    }
  } else {
    await ScreenOrientation.unlockAsync()
  }
}

export default function ResultScreen() {
  const theme = useTheme()
  const params = useLocalSearchParams()
  const [videoHeight, setVideoHeight] = useState(0)
  const ytUrl = (params.yt as string) || null
  const ytVideoId = getVideoId(ytUrl)?.id || null
  const isYtShorts = isYouTubeShorts(ytUrl || "")
  const ytVideoOrientation = isYtShorts ? "portrait" : "landscape"

  useFocusEffect(() => {
    const onFocus = async () => {
      await NavigationBar.setBackgroundColorAsync(theme.colors.surface)
    }
    onFocus()
  })

  return (
    <Template>
      <Card mode="contained">
        <Card.Content className="flex gap-y-4">
          <View
            className="bg-black w-full aspect-video"
            onLayout={event => setVideoHeight(event.nativeEvent.layout.height)}
          >
            <YouTubePlayer
              height={videoHeight}
              videoId={ytVideoId}
              onFullScreenChange={isFullScreen =>
                toggleFullScreenOrientation(isFullScreen, ytVideoOrientation)
              }
            />
          </View>
          <Text>Video infos</Text>
          <Button mode="contained" theme={{ roundness: 2 }}>
            DOWNLOAD
          </Button>
          {true && (
            <View>
              <Divider />
              <Button icon="share" textColor={theme.colors.tertiary}>
                COMPARTILHAR
              </Button>
            </View>
          )}
        </Card.Content>
      </Card>
    </Template>
  )
}
