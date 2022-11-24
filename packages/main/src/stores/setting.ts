import { app } from 'electron'
import { electronStore } from './index'
import { AppSetting } from '../types/appSetting'

export const getAppSetting = () => {
  let appSetting = electronStore.get('app-setting') as AppSetting | undefined
  if (!appSetting) {
    appSetting = {} as AppSetting
  }

  if (appSetting.autoLaunch === undefined) {
    appSetting.autoLaunch = false
  }

  if (appSetting.trayExit === undefined) {
    appSetting.trayExit = false
  }

  if (!appSetting.downloadPath) {
    appSetting.downloadPath = app.getPath('downloads')
  }
  return appSetting
}

export const setAppSetting = (args: Partial<AppSetting>) => {
  const appSetting = getAppSetting()

  const newAppSetting: AppSetting = {
    ...appSetting,
    ...args,
  }

  // Allow auto launch
  app.setLoginItemSettings({
    openAtLogin: !!newAppSetting.autoLaunch
  })

  electronStore.set('app-setting', newAppSetting)

  return newAppSetting
}
