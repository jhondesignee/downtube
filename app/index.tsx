import { useState } from "react"
import { Text, TextInput, useTheme } from "react-native-paper"

export default function IndexScreen() {
  const theme = useTheme()
  const [text, setText] = useState("")

  return (
    <>
      <Text className="text-xl text-center">Baixe vídeos do YouTube com facilidade</Text>
      <TextInput
        mode="outlined"
        value={text}
        onChangeText={text => setText(text)}
        placeholder="link aqui"
        placeholderTextColor="grey"
      ></TextInput>
    </>
  )
}
