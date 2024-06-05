import { BottomNavigation, useTheme } from "react-native-paper"

export default function BottomTabsComponent({ navigation, state, descriptors, insets }) {
  const theme = useTheme()

  function tabPressEventHandler({ route, preventDefault }) {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true
    })

    if (event.defaultPrevented) {
      preventDefault()
    } else {
      navigation.dispatch({
        // incompatible type definition for 'route'
        // @ts-ignore
        ...navigation.navigate(route.name, route.params),
        target: state.key
      })
    }
  }

  function iconRender({ route, focused, color }) {
    const { options } = descriptors[route.key]
    if (!options.tabBarIcon) return null
    return options.tabBarIcon({ focused, color, size: 24 })
  }

  function labelRender({ route }) {
    const { options } = descriptors[route.key]
    return options.tabBarLabel || null
  }

  return (
    <BottomNavigation.Bar
      theme={{ colors: { secondaryContainer: theme.colors.tertiary } }}
      navigationState={state}
      safeAreaInsets={insets}
      onTabPress={tabPressEventHandler}
      renderIcon={iconRender}
      getLabelText={labelRender}
    />
  )
}
