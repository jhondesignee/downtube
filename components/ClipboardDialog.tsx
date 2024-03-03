import { Dialog, Portal, Button, Text } from "react-native-paper"

export default function ClipboardDialogComponent() {
  return (
    <Portal>
      <Dialog visible={true}>
        <Dialog.Title>Link na área de transferência</Dialog.Title>
        <Dialog.Content>
          <Text>
            Foi identificado um link do YouTube na área de transferência. Deseja fazer o download?
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button>CANCELAR</Button>
          <Button>DOWNLOAD</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}
