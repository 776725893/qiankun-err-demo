<template>
    <div class="setting-box" @click="settingShow = true">
        <setting theme="outline" size="24" />
    </div>
    <el-drawer class="micro-setting-drawer" v-model="settingShow" direction="rtl" title="系统配置" :show-close="false"
        size="230px">
        <template #default>
            <Suspense>
                <SettingDrawer />
                <template #fallback>
                    <div class="loading" v-loading="true"></div>
                </template>
            </Suspense>
        </template>
    </el-drawer>
</template>

<script setup lang='ts'>
import { Setting } from '@icon-park/vue-next'
import { ref, defineAsyncComponent } from 'vue'
const SettingDrawer = defineAsyncComponent(() => import('./drawer.vue'))
defineOptions({
    name: 'SettingView',
});
// 是否显示抽屉
const settingShow = ref(false)
</script>

<style lang='scss' scoped>
.setting-box {
    cursor: pointer;
    margin-left: 20px;
}
</style>