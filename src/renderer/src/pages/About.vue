<script lang="ts" setup="setup">
import config from '../../../../package.json'
</script>

<template>
  <div class="top">
    <el-space>
      <img style="width: 100px; height: 100px" src="../assets/images/logo.svg" alt=""/>
      <div>
        <div>录屏大师</div>
        <div>版本：v{{ config.version }}</div>
        <div>版权（c) 2023 QYT-WNX</div>
      </div>
    </el-space>
  </div>
</template>

<style lang="scss" scoped>
.top {
  @apply tw-flex tw-items-center tw-justify-center;
}
</style>
