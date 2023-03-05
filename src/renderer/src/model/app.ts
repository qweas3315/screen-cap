interface MenuItem {
  id: number
  key: string
  icon?: string
  name: string
}

interface ISetting {
  savePath: string
  recordWay: string
}

interface IDesktopCapturer {
  display_id: string
  id: string
  name: string
}

export type { MenuItem, ISetting, IDesktopCapturer }
