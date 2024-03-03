import { useCallback } from "react"
import { View } from "react-native"
import { Card, Text, Button, Divider, useTheme } from "react-native-paper"
import { Stack, useFocusEffect } from "expo-router"
import * as NavigationBar from "expo-navigation-bar"
import Template from "#components/Template"

export default function ResultScreen() {
  const theme = useTheme()
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
          {/* temporary */}
          <View className="w-full aspect-video bg-gray-600"></View>
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
