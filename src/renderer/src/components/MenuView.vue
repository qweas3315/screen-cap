<script lang="ts" setup="setup">
import config from '../../../../package.json'
import {MenuItem} from '@renderer/model/app'
import {useRoute} from 'vue-router'
import router from '@renderer/router'

const route = useRoute()
const currentRouteName = route.name || 'Index'
const MenuList: MenuItem[] = [
  {id: 1, key: 'Index', name: '首页', icon: 'HomeFilled'},
  {id: 2, key: 'List', name: '列表', icon: 'Memo'},
  {id: 3, key: 'Setting', name: '设置', icon: 'Tools'},
  {id: 4, key: 'About', name: '关于', icon: 'QuestionFilled'}
]
const changePage = (key: string): void => {
  router.push({name: key})
}
</script>

<template>
  <div class="logo">
    <img src="../assets/images/logo.svg" class="logo-img" alt=""/>
    <div class="logo-title">录屏大师</div>
  </div>
  <div class="dividing-line"></div>
  <div class="menu">
    <el-menu :default-active="currentRouteName">
      <el-menu-item
        v-for="item in MenuList"
        :key="item.id"
        class="menu-item"
        :index="item.key"
        @click="changePage(item.key)"
      >
        <el-icon>
          <component :is="item.icon"/>
        </el-icon>
        <template #title>{{ item.name }}</template>
      </el-menu-item>
    </el-menu>
  </div>
  <div class="footer">
    <div>Design By QYT-WNX</div>
    <div>v{{ config.version }}</div>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  -webkit-app-region: drag;
  cursor: grab;
  @apply tw-my-6;
  .logo-img {
    @apply tw-w-20 tw-flex tw-justify-center;
  }

  .logo-title {
    @apply tw-text-2xl tw-font-bold;
  }
}

.dividing-line {
  @apply tw-mx-10 tw-border tw-border-white;
}

.menu {
  @apply tw-my-6;
  .menu-item {
    @apply tw-rounded-md focus:tw-bg-blue-500 hover:tw-bg-blue-500 tw-h-8 tw-my-3 focus:tw-text-white hover:tw-text-white tw-mx-6 tw-border tw-border-white tw-font-medium tw-text-base tw-leading-7 tw-flex tw-items-center tw-justify-center;
  }
}

.footer {
  @apply tw-text-xs;
}

:deep(.el-menu) {
  @apply tw-bg-gray-200;
}

:deep(.el-menu-item.is-active) {
  @apply tw-rounded-md tw-bg-blue-500 tw-h-8 tw-my-3 tw-text-white tw-mx-6 tw-border tw-border-white tw-font-medium tw-text-base tw-leading-7 tw-flex tw-items-center tw-justify-center;
}
</style>
