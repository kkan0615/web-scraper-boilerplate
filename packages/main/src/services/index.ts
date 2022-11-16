import './hello'
import { ipcMain } from 'electron'
import { scraping } from './scraping'
import { exportToExcel, exportToTxt } from '../utils/export'

ipcMain.handle('scraping', scraping)
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
