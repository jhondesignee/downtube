import { useState, useCallback } from "react"
import { Text, TextInput, Card, Button, useTheme } from "react-native-paper"
import { Link, useFocusEffect } from "expo-router"
import * as NavigationBar from "expo-navigation-bar"
import Div from "#components/Div"

export default function IndexScreen() {
  const theme = useTheme()
  const [text, setText] = useState("")
  useFocusEffect(() => {
    const onFocus = async () => {
      await NavigationBar.setBackgroundColorAsync(theme.colors.surfaceVariant)
    }
    onFocus()
  })
  return (
    <Div>
      <TextInput
        mode="outlined"
        value={text}
        onChangeText={text => setText(text)}
        placeholder="cole o link aqui"
        placeholderTextColor="grey"
        selectionColor={theme.colors.tertiary}
        activeOutlineColor={theme.colors.tertiary}
        theme={{ roundness: 8 }}
        right={<TextInput.Icon icon="clipboard" onPress={() => {}} />}
      />
      <Link href="../result" asChild>
        <Button mode="contained" theme={{ roundness: 2 }}>
          DOWNLOAD
        </Button>
      </Link>
    </Div>
  )
}
