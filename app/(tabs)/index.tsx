import { useState, useEffect } from "react"
import { Snackbar, Portal, TextInput, Button, useTheme } from "react-native-paper"
import { useFocusEffect, useRouter } from "expo-router"
import * as NavigationBar from "expo-navigation-bar"
import * as Clipboard from "expo-clipboard"
import Template from "#components/Template"
import LoadingDialog from "#components/LoadingDialog"
import YouTubeVideoHandler from "#helpers/youtube-video-handler"

async function getClipboardContent(): Promise<string> {
  return await Clipboard.getStringAsync()
}

async function delay(ms: number): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, ms))
}

export default function IndexScreen() {
  const theme = useTheme()
  const router = useRouter()
  const [urlInputValue, setUrlInputValue] = useState("")
  const [loadingDialogVisible, setLoadingDialogVisible] = useState(false)
  const [snackbarVisible, setSnackbarVisible] = useState(false)
  const navigationDelay = 250

  async function navigateToResult() {
    const path = "/result"
    setLoadingDialogVisible(true)
    await delay(navigationDelay)
    if (YouTubeVideoHandler.isYouTubeUrl(urlInputValue)) {
      router.push({ pathname: path, params: { yt: urlInputValue } })
    } else {
      setSnackbarVisible(true)
    }
    setLoadingDialogVisible(false)
  }

  async function focusEffect() {
    await NavigationBar.setBackgroundColorAsync(theme.colors.surfaceVariant)
  }

  async function effect() {
    const clipboardContent = await getClipboardContent()

    if (YouTubeVideoHandler.isYouTubeUrl(clipboardContent)) {
      setUrlInputValue(clipboardContent)
    }
  }

  useFocusEffect(() => {
    focusEffect()
  })
  useEffect(() => {
    effect()
  }, [])

  return (
    <Template>
      <TextInput
        mode="outlined"
        value={urlInputValue}
        onChangeText={value => setUrlInputValue(value)}
        placeholder="link do vídeo do YouTube"
        maxLength={2048}
        placeholderTextColor="grey"
        selectionColor={theme.colors.tertiary}
        activeOutlineColor={theme.colors.tertiary}
        theme={{ roundness: 8 }}
        right={
          <TextInput.Icon
            icon="clipboard"
            onPress={async () => setUrlInputValue(await getClipboardContent())}
          />
        }
      />
      <Button mode="contained" theme={{ roundness: 2 }} onPress={navigateToResult}>
        DOWNLOAD
      </Button>
      <Portal>
        <LoadingDialog
          title="Buscando informações"
          content="Carregando.."
          visible={loadingDialogVisible}
        />
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          onIconPress={() => setSnackbarVisible(false)}
        >
          Link inválido
        </Snackbar>
      </Portal>
    </Template>
  )
}
