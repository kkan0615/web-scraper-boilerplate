import './hello'
import { ipcMain } from 'electron'
import { scraping } from './scraping'
import { exportToExcel } from '../utils/excel'

ipcMain.handle('scraping', scraping)
ipcMain.handle('test', async () => {
  console.log('testing...')

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
