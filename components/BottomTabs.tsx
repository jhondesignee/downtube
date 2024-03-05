import { BottomNavigation, useTheme } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

export default function BottomTabsComponent({ navigation, state, descriptors, insets }) {
  const theme = useTheme()

  return (
    <BottomNavigation.Bar
      theme={{ colors: { secondaryContainer: theme.colors.tertiary } }}
      navigationState={state}
      safeAreaInsets={insets}
      onTabPress={({ route, preventDefault }) => {
        const event = navigation.emit({
          type: "tabPress",
          target: route.key,
          canPreventDefault: true
        })
        if (event.defaultPrevented) {
          preventDefault()
        } else {
          // expected "route.name". works in production
          // @ts-ignore
          navigation.navigate(route.name)
        }
      }}
      renderIcon={({ route, focused, color }) => {
        const { options } = descriptors[route.key]
        const iconColor = focused ? theme.colors.onTertiary : color
        if (!options.tabBarIcon) return null
        return <Icon name={options.tabBarIcon} color={iconColor} size={24} />
      }}
      getLabelText={({ route }) => {
        const { options } = descriptors[route.key]
        return options.tabBarLabel || null
      }}
    />
  )
}
