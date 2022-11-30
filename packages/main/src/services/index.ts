import { app, ipcMain, dialog, OpenDialogOptions, shell } from 'electron'
import { scrap, scrapingImages, scrapingPDF, scrapingPDFWithTemplate } from '../utils/scrap'
import { getAppSetting, getScrapSetting, setAppSetting, setScrapSetting } from '../stores/setting'
import { AppSetting } from '../types/appSetting'
import scrapService from './scrap'
import { ScrapSetting } from '../types/scrapSetting'

ipcMain.on('open-external',async (event, arg: string) => {
  await shell.openExternal(arg)
})
ipcMain.handle('get-path', async (event, arg: 'home' | 'appData' | 'userData' | 'cache' | 'temp' | 'exe' | 'module' | 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos' | 'recent' | 'logs' | 'crashDumps') => {
  return app.getPath(arg)
})
ipcMain.handle('show-open-dialog', async (event, args: OpenDialogOptions) => {
  return await dialog.showOpenDialog(args)
})
ipcMain.handle('get-app-setting', () => {
  return getAppSetting()
})
ipcMain.handle('set-app-setting', (event, args: Partial<AppSetting>) => {
  return setAppSetting(args)
})
ipcMain.handle('get-scrap-setting', () => {
  return getScrapSetting()
})
ipcMain.handle('set-scrap-setting', (event, args: Partial<ScrapSetting>) => {
  return setScrapSetting(args)
})
ipcMain.handle('scraping', scrap)
ipcMain.handle('scrap-images-test', scrapingImages)
ipcMain.handle('scrap-pdf-test', scrapingPDF)
ipcMain.handle('scrap-pdf-with-template-test', scrapingPDFWithTemplate)
ipcMain.handle('scrap-to-csv-test', scrapService.scrapCSVTestService)
ipcMain.handle('scrap-to-xlsx-test', scrapService.scrapXLSXTestService)
ipcMain.handle('scrap-to-txt-test', scrapService.scrapTextTestService)
