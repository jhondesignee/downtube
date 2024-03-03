import { Tabs } from "expo-router"
import BottomTabs from "#components/BottomTabs"
import Header from "#components/Header"

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ header: props => <Header {...props} /> }}
      tabBar={props => <BottomTabs {...props} />}
    >
      <Tabs.Screen name="index" options={{ tabBarLabel: "Início", tabBarIcon: "home" }} />
      <Tabs.Screen
        name="downloads"
        options={{ tabBarLabel: "Downloads", tabBarIcon: "download" }}
      />
      <Tabs.Screen name="settings" options={{ tabBarLabel: "Configurações", tabBarIcon: "cog" }} />
    </Tabs>
  )
}
