import { View } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { PaperProvider } from "react-native-paper"
import { StatusBar } from "expo-status-bar"
import { Slot } from "expo-router"
import darkTheme from "#themes/darkTheme"
import Header from "#components/Header"

export default function DefaultLayout() {
  return (
    <PaperProvider theme={darkTheme}>
      <SafeAreaProvider style={{ backgroundColor: darkTheme.colors.surface }}>
        <StatusBar style="light" />
        <Header />
        <View className="p-4 flex flex-column w-screen h-screen g-4">
          <Slot />
        </View>
      </SafeAreaProvider>
    </PaperProvider>
  )
}
