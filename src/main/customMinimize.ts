import { BrowserWindow, ipcMain } from 'electron'

export default (win: BrowserWindow): void => {
  ipcMain.on('customMinimize', () => {
    win.minimize()
  })
}
