<script lang="ts" setup="setup">
const openUrl = (): void => {
  window.api.openUrl('https://www.baidu.com/')
}
const customMinimize = (): void => {
  window.api.customMinimize()
}
const customClose = (): void => {
  window.api.customClose()
}
</script>

<template>
  <div class="top">
    <div class="top-move"></div>
    <div>
      <el-space spacer="|">
        <el-icon class="hover:tw-text-green-600 tw-cursor-pointer" :size="22" @click="openUrl">
          <InfoFilled/>
        </el-icon>
        <el-space>
          <el-icon
            class="hover:tw-text-blue-600 tw-cursor-pointer"
            :size="22"
            @click="customMinimize"
          >
            <Remove/>
          </el-icon>
          <el-icon class="hover:tw-text-red-600 tw-cursor-pointer" :size="22" @click="customClose">
            <CircleClose/>
          </el-icon>
        </el-space>
      </el-space>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top {
  width: 100%;
  display: flex;
  justify-content: space-between;

  .top-move {
    width: 100%;
    cursor: grab;
    -webkit-app-region: drag;
  }
}
</style>
