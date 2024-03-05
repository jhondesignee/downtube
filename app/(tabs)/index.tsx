import { useState, useEffect } from "react"
import { View } from "react-native"
import {
  ActivityIndicator,
  Snackbar,
  Portal,
  Dialog,
  Text,
  TextInput,
  Card,
  Button,
  useTheme
} from "react-native-paper"
import { useFocusEffect, useRouter } from "expo-router"
import axios from "axios"
import * as NavigationBar from "expo-navigation-bar"
import * as Clipboard from "expo-clipboard"
import Template from "#components/Template"
import isYouTubeUrl from "#helpers/isYTUrl"

async function pasteFromClipboard(): Promise<string> {
  return await Clipboard.getStringAsync()
}

async function urlExists(url: string): Promise<boolean> {
  try {
    return (await axios.head(url)).status !== 404
  } catch {
    return false
  }
}

async function delay(ms: number) {
  await new Promise(resolve => setTimeout(resolve, ms))
}

export default function IndexScreen() {
  const theme = useTheme()
  const router = useRouter()
  const [urlInput, setUrlInput] = useState("")
  const [loadingDialogVisible, setLoadingDialogVisible] = useState(false)
  const [snackbarVisible, setSnackbarVisible] = useState(false)
  const loadingDialogDelay = 250
  const goToResult = async () => {
    setLoadingDialogVisible(true)
    await delay(loadingDialogDelay)
    if (await urlExists(urlInput)) {
      setLoadingDialogVisible(false)
      router.push({ pathname: "/result", params: { yt: urlInput } })
    } else {
      setSnackbarVisible(true)
      setLoadingDialogVisible(false)
    }
  }
  const focusEffect = async () => {
    await NavigationBar.setBackgroundColorAsync(theme.colors.surfaceVariant)
  }
  const effect = async () => {
    const clipboardContent = await pasteFromClipboard()
    if (isYouTubeUrl(clipboardContent)) {
      setUrlInput(clipboardContent)
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
        value={urlInput}
        onChangeText={value => setUrlInput(value)}
        placeholder="cole o link aqui"
        maxLength={2048}
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
      <Button mode="contained" theme={{ roundness: 2 }} onPress={goToResult}>
        DOWNLOAD
      </Button>
      <Portal>
        <Dialog visible={loadingDialogVisible} dismissable={false}>
          <Dialog.Title>Buscando informações</Dialog.Title>
          <Dialog.Content className="flex flex-row gap-4 items-center">
            <ActivityIndicator size="large" />
            <Text>Carregando...</Text>
          </Dialog.Content>
        </Dialog>
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
