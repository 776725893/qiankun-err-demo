
<template>
    <el-container class="main-container" direction="vertical">
        <!-- 头部 -->
        <Header v-if="!isQiankun" />
        <el-container style="overflow: hidden;">
            <!-- 菜单 -->
            <Aside v-if="!isQiankun" />
            <el-container direction="vertical" class="vertical-scroll-container">
                <Tabs />
                <el-main class="content-container" :class="{ isQiankun }">
                    <router-view v-slot="{ Component }">
                        <transition name="fade-transform" mode="out-in">
                            <keep-alive :include="tabStore.cacheArr" exclude="blankView">
                                <component :is="Component" :key="$route.path" v-if="!tabStore.refreshFlag" />
                            </keep-alive>
                        </transition>
                    </router-view>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>
<script setup>
import Header from '@/views/Layout/Header/index.vue'
import Aside from '@/views/Layout/Aside/index.vue'
import Tabs from '@/views/Layout/Tabs/index.vue'
import store from '@/store/index'
const isQiankun = window.__POWERED_BY_QIANKUN__
defineOptions({
    name: 'appView',
});
const { tabStore } = store
</script>

<style lang="scss" scoped>
.main-container {
    height: 100%;

    .vertical-scroll-container {
        .content-container {
            background: #e8eaef;
            @include scrollStyle;
        }
    }
}

.fade-transform-leave-active,
.fade-transform-enter-active {
    transition: all .5s;
}

.fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
}

.fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>
