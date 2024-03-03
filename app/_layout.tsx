import { SafeAreaProvider } from "react-native-safe-area-context"
import { PaperProvider } from "react-native-paper"
import { setStatusBarStyle } from "expo-status-bar"
import { Stack } from "expo-router"
import darkTheme from "#themes/darkTheme"
import Header from "#components/Header"

export default function DefaultLayout() {
  setStatusBarStyle("light")

  return (
    <PaperProvider theme={darkTheme}>
      <SafeAreaProvider style={{ backgroundColor: darkTheme.colors.surface }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="result"
            options={{
              title: "Preview",
              headerShown: true,
              header: props => <Header {...props} />
            }}
          />
        </Stack>
      </SafeAreaProvider>
    </PaperProvider>
  )
}
