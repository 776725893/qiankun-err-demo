<template>
    <!-- 无展开菜单项 -->
    <el-menu-item v-if="!item.hasChildren" :index="item.path">
        <el-icon>
            <home theme="outline" />
        </el-icon>
        <template #title>
            <span>{{ item?.meta?.title || '请设置mete.title' }}</span>
        </template>
    </el-menu-item>
    <!-- 展开菜单项 -->
    <el-sub-menu v-else-if="item.children?.length" :index="item.path">
        <template #title>
            <el-icon>
                <home theme="outline" />
            </el-icon>
            <span>{{ item?.meta?.title || '请设置mete.title' }}</span>
        </template>
        <MenuItem v-for="subItem in item.children" :key="subItem.path" :item="subItem">
        </MenuItem>
    </el-sub-menu>
</template>

<script setup lang='ts'>
import type { IMenu } from '@/types/base'
import { Home } from '@icon-park/vue-next'
defineOptions({
    name: 'menuItem',
});
defineProps<{
    item: IMenu,
}>()
</script>

<style lang='scss' scoped></style>