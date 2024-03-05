import { Tabs } from "expo-router"
import BottomTabs from "#components/BottomTabs"
import Header from "#components/Header"

// omit the "tabBarIcon" property to pass it as a string instead of as a function
// this way avoid code boilerplate by passing the function once in the header
// only works with the actual custom header
// intended to change this behavior
type TOmitTabBarIconProp = Omit<typeof Tabs.Screen, "tabBarIcon">

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ header: props => <Header {...props} /> }}
      tabBar={props => <BottomTabs {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{ tabBarLabel: "Início", tabBarIcon: "home" } as TOmitTabBarIconProp}
      />
      <Tabs.Screen
        name="downloads"
        options={{ tabBarLabel: "Downloads", tabBarIcon: "download" } as TOmitTabBarIconProp}
      />
      <Tabs.Screen
        name="settings"
        options={{ tabBarLabel: "Configurações", tabBarIcon: "cog" } as TOmitTabBarIconProp}
      />
    </Tabs>
  )
}
