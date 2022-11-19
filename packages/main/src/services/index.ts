import { app, ipcMain, dialog, OpenDialogOptions } from 'electron'
import { scraping, scrapingImages } from './scraping'
import { exportToExcel, exportToTxt } from '../utils/export'
import { getAppSetting, setAppSetting } from '../stores/setting'
import { AppSetting } from '../types/appSetting'

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
ipcMain.handle('scraping', scraping)
ipcMain.handle('scrapping-images', scrapingImages)
ipcMain.handle('export-to-csv', async () => {
  await exportToExcel({
    fileName: 'awesome-test',
    fileExt: 'csv',
    sheets: [
      {
        name: 'Test 1',
        columns: [
          { header: 'key', key: 'key' },
          { header: 'value', key: 'value' },
        ],
        data: [
          { key: 'a', value: '에이' },
          { key: 'b', value: '비' }
        ]
      },
    ]
  })

  return true
})
ipcMain.handle('export-to-xlsx', async () => {
  await exportToExcel({
    fileName: 'awesome-test',
    fileExt: 'xlsx',
    sheets: [
      {
        name: 'Test 1',
        columns: [
          { header: 'key', key: 'key' },
          { header: 'value', key: 'value' },
        ],
        data: [
          { key: 'a', value: '에이' },
          { key: 'b', value: '비' }
        ]
      },
    ]
  })

  return true
})
ipcMain.handle('export-to-txt', async (event, args) => {
  await exportToTxt({
    fileName: 'awesome-txt-test',
    data: [
      { key: 'a', value: '에이' },
      { key: 'b', value: '비' }
    ]
  })
})
