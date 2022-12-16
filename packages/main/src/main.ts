import { app } from 'electron'
import { createAppWindow } from './windows/app'
import { autoUpdater } from 'electron-updater'
// Disable AUto update
// import './utils/autoUpdate'
import './services'
import { createTray, destroyTray } from './windows/tray'
import { getAppSetting } from './stores/setting'
import { cancelAllSchedules, initSchedules } from './utils/schedule'

const isSingleInstance = app.requestSingleInstanceLock()

if (!isSingleInstance) {
  app.quit()
  process.exit(0)
}

app.on('second-instance', () => {
  createAppWindow().catch((err) =>
    console.error('Error while trying to prevent second-instance Electron event:', err)
  )
})

app.on('window-all-closed', async () => {
  const appSetting = getAppSetting()
  if (process.platform !== 'darwin' && !appSetting.trayExit) {
    await destroyTray()
    app.quit()
  }
})

app.on('before-quit', () => {
  cancelAllSchedules()
})

app.on('activate', () => {
  createAppWindow().catch((err) =>
    console.error('Error while trying to handle activate Electron event:', err)
  )
})

app
  .whenReady()
  .then(async () => {
    // Initialize schedules
    initSchedules()
    await createTray()
    await createAppWindow()
    await autoUpdater.checkForUpdates()
  })
  .catch((e) => console.error('Failed to create window:', e))
