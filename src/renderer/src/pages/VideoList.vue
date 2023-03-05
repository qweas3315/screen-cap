<script lang="ts" setup="setup">
import useFile from '@renderer/composables/useFile'
import {getCurrentInstance, ref} from 'vue'
import {MFile} from '@renderer/model/files'

const instance = getCurrentInstance()
const {getFileList, fileList, renameFile, removeFile} = useFile()
getFileList()
const dialogVisible = ref<boolean>(false)
const editDialogVisible = ref<boolean>(false)
const currentFile = ref<MFile>()
const reNameInput = ref<string>('')
const name = ref<string>('')
const show = (e: string): void => {
  name.value = e
  dialogVisible.value = !dialogVisible.value
}
const editItem = (item: MFile): void => {
  currentFile.value = item
  const suffix = currentFile.value?.name?.split('.')[currentFile.value!.name!.split('.').length - 1]
  reNameInput.value = currentFile.value?.name.substring(
    0,
    currentFile.value!.name.length - suffix!.length - 1
  )
  editDialogVisible.value = true
}
const saveEdit = (): void => {
  console.log(currentFile)
  console.log(reNameInput.value)
  renameFile(currentFile.value!.name, reNameInput.value)
  getFileList()
  instance?.proxy?.$forceUpdate()
  editDialogVisible.value = false
}
const deleteFile = (name: string): void => {
  removeFile(name)
  getFileList()
  instance?.proxy?.$forceUpdate()
}
const handleEditClose = (done: () => void): void => {
  reNameInput.value = ''
  currentFile.value = {createTime: '', duration: '', size: '', state: '', name: ''}
  done()
}

const handlePlayClose = (done: () => void): void => {
  name.value = ''
  done()
}
</script>

<template>
  <el-table :data="fileList" border style="width: 100%" highlight-current-row>
    <el-table-column
      prop="name"
      align="center"
      label="视频名"
      :show-overflow-tooltip="true"
      :resizable="false"
    />
    <el-table-column
      prop="duration"
      align="center"
      label="时长"
      :show-overflow-tooltip="true"
      :resizable="false"
    />
    <el-table-column
      prop="size"
      align="center"
      label="大小"
      :show-overflow-tooltip="true"
      :resizable="false"
    />
    <el-table-column
      prop="createTime"
      align="center"
      label="日期"
      :show-overflow-tooltip="true"
      :resizable="false"
    />
    <el-table-column
      fixed="right"
      label="操作"
      width="110"
      :show-overflow-tooltip="true"
      :resizable="false"
    >
      <template #default="scope">
        <el-button link @click.prevent="show(scope.row.name)">
          <el-icon>
            <View/>
          </el-icon>
        </el-button>
        <el-button link @click.prevent="editItem(scope.row)">
          <el-icon>
            <Edit/>
          </el-icon>
        </el-button>
        <el-button link @click.prevent="deleteFile(scope.row.name)">
          <el-icon>
            <Delete/>
          </el-icon>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <div>共33条数据</div>

  <el-dialog v-model="dialogVisible" :title="name" width="80%" :before-close="handlePlayClose">
    <video :src="`D:/home/video/${name}`"></video>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="editDialogVisible" title="重命名" width="50%" :before-close="handleEditClose">
    <el-input v-model="reNameInput" placeholder="Please input"/>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editDialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="saveEdit">修改</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
