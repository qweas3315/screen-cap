<script lang="ts" setup="setup">
import {ref} from 'vue';

const savePath = ref<string>()

const choosePath = async (): Promise<void> => {
  window.api.chooseFilePath()
  const result = await window.api.chooseFilePathed()
  savePath.value = result
}
</script>

<template>
  <div>
    <div style="border-left: 5px solid #409eff; color: #409eff; padding-left: 5px; margin: 10px 0">
      <b>录屏配置</b>
    </div>
    <div style="padding-left: 10px">
      <div style="color: #888888">待开发</div>
    </div>
  </div>
  <div>
    <div style="border-left: 5px solid #409eff; color: #409eff; padding-left: 5px; margin: 10px 0">
      <b>存储配置</b>
    </div>
    <div style="padding-left: 10px">
      <el-space>
        <div>位置：</div>
        <div class="tw-flex-1">
          <el-input v-model="savePath" disabled placeholder="请选择存储位置"/>
        </div>
        <div>
          <el-button type="primary" icon="More" @click="choosePath"/>
        </div>
      </el-space>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
