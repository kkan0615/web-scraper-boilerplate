import './hello'
import { ipcMain } from 'electron'
import { scraping } from './scraping'
import { exportToExcel } from '../utils/excel'

ipcMain.handle('scraping', scraping)
ipcMain.handle('test', async () => {
  console.log('testing...')

  await exportToExcel('awesome-test.xlsx', [{
    a: 'a',
    b: 'b'
  }])

  return true
})
