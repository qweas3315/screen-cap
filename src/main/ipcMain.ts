import { app, desktopCapturer, dialog, ipcMain, IpcMainEvent, shell } from 'electron'

ipcMain.on('customClose', () => {
  app.quit()
})

ipcMain.on('openUrl', (_event, opt: { url: string }) => {
  shell.openExternal(opt.url)
})
ipcMain.on('chooseFilePath', async (event) => {
  const result = await dialog.showOpenDialog({ properties: ['openDirectory'] })
  if (!result.canceled) {
    event.reply('chooseFilePath', String(result.filePaths))
  }
})

ipcMain.on('loadDesktopCapturer', (event: IpcMainEvent) => {
  desktopCapturer.getSources({ types: ['window', 'screen'] }).then((sources) => {
    event.reply('loadedDesktopCapturer', sources)
  })
})
