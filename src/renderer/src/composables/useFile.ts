import { MFile } from '@renderer/model/files'
import { ref } from 'vue'
import formatDate from '@renderer/utils/common'
import { ElMessage } from 'element-plus'
import { Stats } from 'fs'

const fs = require('fs')

const filePath = 'D:/home/video/'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => {
  const fileList = ref<MFile[]>([])
  const getFileList = (): void => {
    fileList.value = []
    fs.readdir(filePath, (err: Error, files: []) => {
      if (err) throw err
      for (let i = files.length - 1; i >= 0; i--) {
        // console.log(files[i]);
        if (/(.*)\.(mp4)$/.test(files[i])) {
          fs.stat(`${filePath}${files[i]}`, (_err, stats: Stats) => {
            if (stats.isDirectory()) return
            fileList.value.push({
              name: String(files[i]),
              duration: '10',
              size: String((Number(stats.size) / 1024 / 1024).toFixed(2)) + 'MB',
              createTime: formatDate(stats.ctime),
              state: '可用'
            })
          })
        }
      }
    })
  }
  const renameFile = (oldName: string, newName: string): void => {
    const suffix = oldName?.split('.')[oldName?.split('.').length - 1]
    if (newName.length === 0) {
      ElMessage.error('文件名长度需大于0')
      return
    }
    const newFileName = newName + '.' + suffix
    fs.renameSync(filePath + oldName, filePath + newFileName)
  }

  const removeFile = (fileName: string): void => {
    fs.rmSync(filePath + fileName)
  }
  return { getFileList, fileList, renameFile, removeFile }
}
