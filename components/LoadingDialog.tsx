import { Dialog, Text, ActivityIndicator } from "react-native-paper"

interface LoadingDialogComponentProps {
  title: string
  content: string
  visible: boolean
}

export default function LoadingDialogComponent(props: LoadingDialogComponentProps) {
  return (
    <Dialog visible={props.visible} dismissable={false}>
      <Dialog.Title>{props.title}</Dialog.Title>
      <Dialog.Content className="flex flex-row gap-4 items-center">
        <ActivityIndicator size="large" />
        <Text>{props.content}</Text>
      </Dialog.Content>
    </Dialog>
  )
}
