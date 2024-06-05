import * as ScreenOrientation from "expo-screen-orientation"

export enum Orientation {
  PORTRAIT = 0,
  LANDSCAPE = 1
}

type ValueOf<T> = T[keyof T]

type OrientationMap = Record<
  ValueOf<typeof Orientation>,
  ValueOf<typeof ScreenOrientation.OrientationLock>
>

const OrientationEnumMap: Readonly<OrientationMap> = {
  [Orientation.PORTRAIT]: ScreenOrientation.OrientationLock.PORTRAIT_UP,
  [Orientation.LANDSCAPE]: ScreenOrientation.OrientationLock.LANDSCAPE
}

export default class ScreenOrientationHandler {
  public static async lock(orientation: Orientation): Promise<void> {
    await ScreenOrientation.lockAsync(OrientationEnumMap[orientation])
  }

  public static async unlock(): Promise<void> {
    await ScreenOrientation.unlockAsync()
  }
}
