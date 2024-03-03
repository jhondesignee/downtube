import { useState, useEffect, useRef } from "react"
import { Text, TextInput, Card, Button, useTheme } from "react-native-paper"
import { Link, useFocusEffect } from "expo-router"
import * as NavigationBar from "expo-navigation-bar"
import * as Clipboard from "expo-clipboard"
import Template from "#components/Template"

async function pasteFromClipboard(): Promise<string> {
  return await Clipboard.getStringAsync()
}

function isUrlFromYouTube(url: string): boolean {
  const ytUrlMask = /youtu(be\.com|\.be)\//i
  return Boolean(url.match(ytUrlMask))
}

export default function IndexScreen() {
  const theme = useTheme()
  const [urlInput, setUrlInput] = useState("")

  useFocusEffect(() => {
    const onFocus = async () => {
      await NavigationBar.setBackgroundColorAsync(theme.colors.surfaceVariant)
    }
    onFocus()
  })
  useEffect(() => {
    ;(async () => {
      const clipboardContent = await pasteFromClipboard()
      if (isUrlFromYouTube(clipboardContent)) {
        setUrlInput(clipboardContent)
      }
    })()
  }, [])

  return (
    <Template>
      <TextInput
        mode="outlined"
        value={urlInput}
        onChangeText={urlInput => setUrlInput(urlInput)}
        placeholder="cole o link aqui"
        placeholderTextColor="grey"
        selectionColor={theme.colors.tertiary}
        activeOutlineColor={theme.colors.tertiary}
        theme={{ roundness: 8 }}
        right={
          <TextInput.Icon
            icon="clipboard"
            onPress={async () => setUrlInput(await pasteFromClipboard())}
          />
        }
      />
      <Link href="/result" asChild>
        <Button mode="contained" theme={{ roundness: 2 }}>
          DOWNLOAD
        </Button>
      </Link>
    </Template>
  )
}
