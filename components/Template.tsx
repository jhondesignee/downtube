import { ScrollView } from "react-native"
import { useTheme } from "react-native-paper"

export default function TemplateComponent({ children }) {
  const theme = useTheme()

  return (
    <ScrollView
      className="flex flex-column gap-y-4 p-4"
      style={{ backgroundColor: theme.colors.surface }}
    >
      {children}
    </ScrollView>
  )
}
