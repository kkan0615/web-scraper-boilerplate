/**
 * AppTitle
 */
export const AppTitle = 'Web scraper'

export interface AppSetting {
  autoLaunch: boolean
  trayOnLaunch: boolean
  trayExit: boolean
  downloadPath: string // If no, "download path"
  language: string
}
