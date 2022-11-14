import './hello'
import { ipcMain } from 'electron'
import { scraping } from './scraping'

ipcMain.handle('scraping', scraping)
