import { app } from 'electron'
import { electronStore } from './index'
import { AppSetting } from '../types/appSetting'
import { ScrapSetting } from '../types/scrapSetting'

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


export const getScrapSetting = () => {
  let scrapSetting = electronStore.get('scrap-setting') as ScrapSetting | undefined
  if (!scrapSetting) {
    scrapSetting = {} as ScrapSetting
  }

  if (!scrapSetting.fileNames) {
    scrapSetting.fileNames = {
      xlsx: 'example_xlsx',
      csv: 'example_csv',
      pdf: 'example_pdf',
      'pdf-with-template': 'example_pdf_with_template',
      txt: 'example_txt',
      videos: 'example_video',
      images: 'example_images'
    }
  }
  return scrapSetting
}

export const setScrapSetting = (args: Partial<ScrapSetting>) => {
  const scrapSetting = getAppSetting()

  const newScrapSetting: AppSetting = {
    ...scrapSetting,
    ...args,
  }

  electronStore.set('scrap-setting', scrapSetting)

  return newScrapSetting
}
