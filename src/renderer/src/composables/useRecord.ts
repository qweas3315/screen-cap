import { ElMessage } from 'element-plus'
import { IDesktopCapturer } from '@renderer/model/app'
import { ref } from 'vue'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => {
  const desktopCapturerList = ref<IDesktopCapturer[]>([])
  const getDesktopCapturer = async (): Promise<void> => {
    window.api.loadDesktopCapturer()
    desktopCapturerList.value = await window.api.loadedDesktopCapturer()
  }

  const startRecord = async (id: string): Promise<void> => {
    if (id === '') {
      ElMessage.error('请选择录制窗口')
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          mandatory: {
            chromeMediaSource: 'desktop'
          }
        },
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: id,
            minWidth: 1280,
            maxWidth: 1280,
            minHeight: 720,
            maxHeight: 720
          }
        }
      })
      handleStream(stream)
    } catch (e) {
      console.log(e)
    }
  }
  const buffer = []
  let mediaRecorder
  const onDataAvailable = (d: BlobEvent): void => {
    console.log(d.data.size)
    if (d && d.data && d.data.size > 0) {
      console.log(d.data.size)
      buffer.push(d.data)
    }
  }

  const onRecordError = (e: Error): void => {
    console.error(e)
  }

  const saveVideo = (): void => {
    if (buffer) {
      mediaRecorder.stop()
      const blob = new Blob(buffer, { type: 'video/webm' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.style.display = 'none'
      a.download = 'record.webm'
      a.click()
    } else {
      console.error('record failed')
    }
  }
  const handleStream = (stream: MediaProvider): void => {
    const options = { mimeType: 'video/webm;codecs=vp8' }
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      console.error(`${options.mimeType} is not supported!`)
      return
    }
    try {
      mediaRecorder = new MediaRecorder(stream, options)
      mediaRecorder.ondataavailable = onDataAvailable
      mediaRecorder.onerror = onRecordError
      mediaRecorder.start(10)
      setTimeout(() => {
        saveVideo()
      }, 5000)
    } catch (error) {
      console.error(error)
    }
  }
  return { getDesktopCapturer, desktopCapturerList, startRecord }
}
