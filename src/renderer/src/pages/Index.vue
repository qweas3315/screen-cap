<script lang="ts" setup="setup">
import {ElMessage} from 'element-plus'
import useRecord from '@renderer/composables/useRecord'
import {reactive} from 'vue'
import {IDesktopCapturer} from '@renderer/model/app'

const {getDesktopCapturer, desktopCapturerList, startRecord} = useRecord()
let currentDesktopCapturer = reactive<IDesktopCapturer>({
  id: '',
  display_id: '',
  name: ''
})
getDesktopCapturer()

const chooseWindow = (value: IDesktopCapturer): void => {
  currentDesktopCapturer = value
}

const unRealize = (): void => {
  ElMessage.warning('该功能暂未实现')
}
</script>

<template>
  <div class="tip">
    <!-- 当前配置：<b>{{ settingObj.savePath }}</b> > <b>{{ settingObj.recordWay }}</b> -->
    当前配置：
  </div>
  <div @click="startRecord(currentDesktopCapturer.id)" class="record-bar">
    <el-icon :size="80">
      <VideoCamera/>
    </el-icon>
  </div>
  <div class="setting-bar">
    <el-space>
      <el-card class="tw-cursor-pointer" @click="unRealize"> 选择录制区域</el-card>
      <el-card class="tw-cursor-pointer">
        <el-dropdown>
          <div>
            {{
              currentDesktopCapturer.id === ''
                ? '选择录制窗口'
                : '当前窗口：' + currentDesktopCapturer.name.substring(0, 4)
            }}
            <el-icon class="el-icon--right">
              <arrow-down/>
            </el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="item in desktopCapturerList"
                :key="item?.id"
                @click="chooseWindow(item)"
              >{{ item.name }}
              </el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-card>
      <el-card class="tw-cursor-pointer"> 全屏录制</el-card>
    </el-space>
  </div>
</template>

<style lang="scss" scoped>
.tip {
  margin: 20px 0;
  border-left: 5px solid #409eff;
  color: #409eff;
  padding-left: 5px;
}

.setting-bar {
  display: flex;
  justify-content: center;
  margin: 30px auto;
}

.record-bar {
  margin: 0 auto;
  @apply tw-w-40 tw-h-40 tw-bg-blue-500 hover:tw-bg-pink-500 tw-text-white tw-rounded-full tw-flex tw-items-center tw-justify-center tw-font-black tw-text-4xl;
}
</style>
