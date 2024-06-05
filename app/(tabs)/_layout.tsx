import { useTheme } from "react-native-paper"
import { Tabs } from "expo-router"
import BottomTabs from "#components/BottomTabs"
import Header from "#components/Header"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

interface IconOptions {
  icon: string
  focused: boolean
  color: string
  size: number
}

const tabs = [
  { name: "index", label: "home", icon: "home" },
  { name: "downloads", label: "Downloads", icon: "download" },
  { name: "settings", label: "Configurações", icon: "cog" }
]

export default function TabsLayout() {
  const theme = useTheme()

  function getIcon({ icon, focused, color, size }: IconOptions): Icon {
    const iconColor = focused ? theme.colors.onTertiary : color
    return <Icon name={icon} color={color} size={size} />
  }

  return (
    <Tabs
      screenOptions={{ header: props => <Header {...props} /> }}
      tabBar={props => <BottomTabs {...props} />}
    >
      {tabs.map(tabOptions => {
        return (
          <Tabs.Screen
            name={tabOptions.name}
            options={{
              tabBarLabel: tabOptions.label,
              tabBarIcon: props => getIcon({ icon: tabOptions.icon, ...props })
            }}
          />
        )
      })}
    </Tabs>
  )
}
