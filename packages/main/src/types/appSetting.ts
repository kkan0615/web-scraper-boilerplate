export interface AppSetting {
  autoLaunch?: boolean
  trayOnLaunch?: boolean
  trayExit?: boolean // Use tray when user close window
  downloadPath?: string // If no, "download path"
  language: string
}
