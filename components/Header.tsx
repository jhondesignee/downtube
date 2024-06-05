import { useState } from "react"
import { Appbar, useTheme } from "react-native-paper"
import { Link } from "expo-router"

export default function HeaderComponent({ navigation, route, back = null, options }) {
  const [visible, setVisible] = useState(false)
  const theme = useTheme()

  return (
    <Appbar.Header style={{ backgroundColor: theme.colors.primaryContainer }}>
      {back && <Appbar.BackAction onPress={navigation.goBack} />}
      <Appbar.Content title={options.tabBarLabel || options.title}></Appbar.Content>
    </Appbar.Header>
  )
}
