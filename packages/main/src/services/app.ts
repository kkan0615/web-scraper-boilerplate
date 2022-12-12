import { ipcMain, BrowserWindow } from 'electron'

export const closeWindow = () => {
  const focusedWindow = BrowserWindow.getFocusedWindow()
  if (focusedWindow)
    focusedWindow.close()
}

export const toggleMaximizeWindow = () => {
  const focusedWindow = BrowserWindow.getFocusedWindow()
  if (focusedWindow)
    focusedWindow.isMaximized() ? focusedWindow.unmaximize() : focusedWindow.maximize()
}

export const minimizeWindow = () => {
  const focusedWindow = BrowserWindow.getFocusedWindow()
  if (focusedWindow)
    focusedWindow.close()
}

export default {
  closeWindow,
  toggleMaximizeWindow,
  minimizeWindow
}
