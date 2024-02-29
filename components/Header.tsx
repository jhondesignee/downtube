import { useState } from "react"
import { Appbar, Menu, useTheme } from "react-native-paper"
import { openURL } from "expo-linking"

export default function HeaderComponent() {
  const [visible, setVisible] = useState(false)
  const theme = useTheme()
  const socials = [
    {
      title: "Github",
      icon: "github",
      url: "https://example.com"
    },
    {
      title: "LinkedIn",
      icon: "linkedin",
      url: "https://example.com"
    }
  ]

  return (
    <>
      <Appbar.Header style={{ backgroundColor: theme.colors.onPrimary }}>
        <Appbar.Content title="Downtube"></Appbar.Content>
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <Appbar.Action icon="dots-vertical" onPress={() => setVisible(true)}></Appbar.Action>
          }
        >
          {socials.map(social => {
            return (
              <Menu.Item
                title={social.title}
                key={social.title}
                leadingIcon={social.icon}
                onPress={() => openURL(social.url)}
              ></Menu.Item>
            )
          })}
        </Menu>
      </Appbar.Header>
    </>
  )
}
