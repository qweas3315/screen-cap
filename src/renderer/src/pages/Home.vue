<script setup lang="ts">
import TopView from '@renderer/components/TopView.vue'
import MenuView from '@renderer/components/MenuView.vue';
</script>

<template>
  <div class="main-container">
    <div class="main-container-left">
      <MenuView/>
    </div>
    <div class="main-container-right">
      <div class="right-top">
        <TopView/>
      </div>
      <div class="right-main">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  overflow: hidden;

  .main-container-left {
    @apply tw-w-52 tw-text-center tw-bg-gray-200 tw-text-base;
  }

  .main-container-right {
    @apply tw-w-full tw-bg-white;

    .right-top {
      //-webkit-app-region: drag;
      @apply tw-h-10 tw-flex tw-items-center;
    }

    .right-main {
      @apply tw-m-3;
    }
  }
}
</style>
