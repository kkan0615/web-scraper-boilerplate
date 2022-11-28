import { app, ipcMain, dialog, OpenDialogOptions, shell } from 'electron'
import { scraping, scrapingImages, scrapingPDF, scrapingPDFWithTemplate, scrapingTable } from './scraping'
import { exportToExcel, exportToPDF, exportToTxt } from '../utils/export'
import { getAppSetting, setAppSetting } from '../stores/setting'
import { AppSetting } from '../types/appSetting'

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
ipcMain.handle('scraping', scraping)
ipcMain.handle('scrapping-images-test', scrapingImages)
ipcMain.handle('scrapping-pdf-test', scrapingPDF)
ipcMain.handle('scrapping-pdf-with-template-test', scrapingPDFWithTemplate)
ipcMain.handle('export-to-csv-test', async () => {
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
ipcMain.handle('export-to-xlsx-test', async () => {
  const result = await scrapingTable()
  await exportToExcel({
    fileName: 'NCS-result',
    fileExt: 'xlsx',
    sheets: result,
  })

  return true
})
ipcMain.handle('scrapping-to-txt-test', async (event, args) => {
  await exportToTxt([
    { key: 'a', value: '에이' },
    { key: 'b', value: '비' }
  ])
})
