<template>
    <el-row class="setting-row">
        <span>主题颜色</span>
        <el-color-picker v-model="themeConfig.colors.primary" @change="themeChange" />
    </el-row>
    <el-divider />
    <el-row class="setting-row">
        <span>开启 Tags-View</span>
        <el-switch v-model="appStore.showTab" />
    </el-row>
    <el-row class="setting-row">
        <span>折叠菜单</span>
        <el-switch v-model="appStore.collapse" />
    </el-row>
    <el-divider />
    <el-row class="setting-row">
        <span>色弱模式</span>
        <el-switch v-model="appStore.colorWeakness" />
    </el-row>
</template>

<script setup lang='ts'>
defineOptions({
    name: 'SettingDrawerView',
});
import type { Theme } from '@/utils/theme'
import { setTheme, getTheme, defaultThemeConfig } from '@/utils/theme'
import store from '@/store/index'
import { ref } from 'vue';
const { appStore } = store
// 主题配置
const themeConfig = ref<Theme>(getTheme())
const themeChange = (value: string | null) => {
    if (!value) themeConfig.value = defaultThemeConfig
    setTheme(themeConfig.value)
}
</script>

<style lang='scss' scoped>
.setting-row {
    @include fx-bt;
    color: #4d4b4b;
    line-height: 50px;
}
</style>