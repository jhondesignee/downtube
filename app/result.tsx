import { useCallback, useState } from "react"
import { View } from "react-native"
import { Card, Text, Button, Divider, useTheme } from "react-native-paper"
import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router"
import * as NavigationBar from "expo-navigation-bar"
import YouTubePlayer from "react-native-youtube-iframe"
import getVideoId from "get-video-id"
import Template from "#components/Template"

export default function ResultScreen() {
  const theme = useTheme()
  const params = useLocalSearchParams()
  const [videoHeight, setVideoHeight] = useState(0)
  const videoId = getVideoId(params.yt as string)?.id || null

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
            <YouTubePlayer height={videoHeight} videoId={videoId} />
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
