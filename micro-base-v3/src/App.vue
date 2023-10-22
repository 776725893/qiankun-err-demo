<template>
  <el-config-provider namespace="jtlj" :locale="zhCn">
    <el-container class="micro-main-container" direction="vertical">
      <!-- 头部 -->
      <Header />
      <el-container style="overflow: hidden;">
        <!-- 菜单 -->
        <Aside />
        <el-container direction="vertical" class="vertical-scroll-container">
          <!-- tab-view -->
          <Tabs v-if="appStore.showTab" />
          <el-main class="content-container">
            <router-view v-slot="{ Component }">
              <div id="subApp"></div>
              <transition name="micro-fade-transform" mode="out-in">
                <keep-alive :include="tabStore.cacheArr" exclude="blankView,subAppView">
                  <component :is="Component" :key="getKey($route.path)" v-if="!tabStore.refreshFlag" />
                </keep-alive>
              </transition>
            </router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import Header from '@/views/Layout/Header/index.vue'
import Aside from '@/views/Layout/Aside/index.vue'
import Tabs from '@/views/Layout/Tabs/index.vue'
import store from '@/store/index'
defineOptions({
  name: 'appView',
});
const { tabStore, appStore } = store
const getKey = (path: string) => {
  if (!path.startsWith('/sub-')) return path
  return path.split('/')[1]
}
</script>

<style lang="scss" scoped>
.micro-main-container {
  height: 100%;

  .vertical-scroll-container {
    @include scrollStyle;
    overflow: auto;

    .content-container {
      background: #e8eaef;
      min-width: 1000px;
      @include scrollStyle
    }
  }
}

.micro-fade-transform-leave-active,
.micro-fade-transform-enter-active {
  transition: all .5s;
}

.micro-fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.micro-fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
