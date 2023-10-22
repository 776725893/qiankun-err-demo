<template>
    <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click" @command="handleCommand">
        <!-- 主题 -->
        <div class="theme-box">
            <svg-icon name="top-theme" class="top-theme" style="color: var(--primary-deep-color);"></svg-icon>
            <svg-icon name="colorful" class="colorful"></svg-icon>
        </div>
        <template #dropdown>
            <el-dropdown-menu class="userDropdown">
                <el-dropdown-item v-for="item in colorList" :key="item.color" :command="item.color">
                    <span class="dot" :style="{ backgroundColor: item.color }"></span>
                    <span class="title">{{ item.label }}</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup>
import { setTheme, getTheme } from '@/utils/theme'
defineOptions({
    name: 'themeChange',
});
const colorList = [{
    color: '#5558D9',
    label: '默认 '
}, {
    color: '#4574F1',
    label: '科技蓝色 '
}, {
    color: '#C1A476',
    label: '经典金色 '
}, {
    color: '#242525',
    label: '酷炫黑色 '
}, {
    color: '#509827',
    label: '生机绿色 '
}, {
    color: '#1CACA8',
    label: '清凉一夏  '
}, {
    color: '#E5A21E',
    label: '活力黄色  '
}, {
    color: '#FF99C3',
    label: '可爱粉色  '
}]

// 用户下拉菜单点击事件
function handleCommand(command) {
    const pre = getTheme()
    pre.colors.primary = command
    setTheme(pre)
}
</script>

<style lang='scss' scoped>
.theme-box {
    position: relative;
    margin-right: 20px;
    cursor: pointer;

    .top-theme {
        width: 74px;
        height: 31px;
        color: var(--primary-deep-color);
    }

    .colorful {
        position: absolute;
        left: 3px;
        top: 2px;
        width: 26px;
        height: 26px;
    }
}

.dot {
    width: 15px;
    height: 15px;
    border-radius: 6px;
    margin-right: 16px
}

.title {
    margin: 0 !important;
}
</style>