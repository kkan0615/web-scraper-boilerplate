import { app, ipcMain, dialog, OpenDialogOptions, shell } from 'electron'
import { getAppSetting, getScrapSetting, setAppSetting, setScrapSetting } from '../stores/setting'
import { AppSetting } from '../types/appSetting'
import scrapService from './scrap'
import { ScrapSetting } from '../types/scrapSetting'
import { addSchedule, deleteSchedule, getSchedules, updateSchedule } from '../stores/scheduler'
import { Schedule } from '../types/schedule'
import { initSchedules } from '../utils/schedule'

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
ipcMain.handle('get-schedules', () => {
  return getSchedules()
})
ipcMain.handle('add-schedule', (event, args: Omit<Schedule, 'id' | 'isDefault' | 'isOn'>) => {
  addSchedule(args)
  initSchedules()
})
ipcMain.handle('update-schedule', (event, args: Schedule) => {
  updateSchedule(args)
  initSchedules()
})
ipcMain.handle('delete-schedule', (event, args: string) => {
  if (!args)
    throw new Error('no id passed')

  deleteSchedule(args)
  initSchedules()
})
// ipcMain.handle('scraping', scrap)
ipcMain.handle('scrap-images-test', scrapService.scrapImagesTestService)
ipcMain.handle('scrap-pdf-test', scrapService.scrapPDFTestService)
ipcMain.handle('scrap-pdf-with-template-test', scrapService.scrapPDFTWithTemplateService)
ipcMain.handle('scrap-to-csv-test', scrapService.scrapCSVTestService)
ipcMain.handle('scrap-to-xlsx-test', scrapService.scrapXLSXTestService)
ipcMain.handle('scrap-to-txt-test', scrapService.scrapTextTestService)
