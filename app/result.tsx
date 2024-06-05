import { useState } from "react"
import { View } from "react-native"
import { Card, Text, Button, Divider, useTheme } from "react-native-paper"
import { useFocusEffect, useLocalSearchParams } from "expo-router"
import * as NavigationBar from "expo-navigation-bar"
import YouTubePlayer from "react-native-youtube-iframe"
import Template from "#components/Template"
import YouTubeVideoHandler from "#helpers/youtube-video-handler"
import ScreenOrientationHandler, { Orientation } from "#helpers/screen-orientation-handler"

async function fullScreenEventHandler(isFullScreen: boolean, orientation: Orientation) {
  if (isFullScreen) {
    await ScreenOrientationHandler.lock(orientation)
  } else {
    await ScreenOrientationHandler.unlock()
  }
}

export default function ResultScreen() {
  const theme = useTheme()
  const params = useLocalSearchParams()
  const [videoHeight, setVideoHeight] = useState(0)
  const ytUrl = (params.yt as string) || null
  let ytHandler: YouTubeVideoHandler
  if (ytUrl) {
    ytHandler = new YouTubeVideoHandler(ytUrl)
  }

  async function focusEffect() {
    await NavigationBar.setBackgroundColorAsync(theme.colors.surface)
  }

  useFocusEffect(() => {
    focusEffect()
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
              videoId={ytHandler.id}
              onFullScreenChange={isFullScreen =>
                fullScreenEventHandler(isFullScreen, ytHandler.orientation)
              }
            />
          </View>
          <Text>Video infos</Text>
          <Button mode="contained" theme={{ roundness: 2 }}>
            DOWNLOAD
          </Button>
        </Card.Content>
      </Card>
    </Template>
  )
}
