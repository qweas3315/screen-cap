import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
  customMinimize: (): void => {
    ipcRenderer.send('customMinimize')
  },
  customClose: (): void => {
    ipcRenderer.send('customClose')
  },
  openUrl: (url: string): void => {
    ipcRenderer.send('openUrl', { url })
  },
  chooseFilePath: (): void => {
    ipcRenderer.send('chooseFilePath')
  },
  chooseFilePathed: (): Promise<string> => {
    return new Promise((resolve) => {
      ipcRenderer.on('chooseFilePath', (_event, filePath) => {
        resolve(filePath)
      })
    })
  },
  loadDesktopCapturer: (): void => {
    ipcRenderer.send('loadDesktopCapturer')
  },
  loadedDesktopCapturer: (): Promise<[]> => {
    return new Promise((resolve) => {
      ipcRenderer.on('loadedDesktopCapturer', (_event, args) => {
        resolve(args)
      })
    })
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
