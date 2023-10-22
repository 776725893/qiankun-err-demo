<template>
    <div class="micro-tab-container">
        <!-- 菜单折叠 -->
        <div class="toggle-menu-box" @click="throttleToggle">
            <MenuUnfold v-show="appStore.collapse" theme="outline" size="20" fill="#333" />
            <menu-fold v-show="!appStore.collapse" theme="outline" size="20" fill="#333" />
        </div>
        <!-- tabs -->
        <div class="tabs-box">
            <el-tabs v-model="tabStore.activeTabKey" type="card" class="vab-tabs-content-smooth" @tab-click="(TabsPaneContext) => {
                tabStore.toTabByKey(String(TabsPaneContext.paneName))
            }" @tab-remove="tabStore.closeTabByKey">
                <el-tab-pane v-for="item in tabStore.tabsList" :key="item.key + item.title" :label="item.key"
                    :closable="item.closable" :name="item.key">
                    <template #label>
                        <span class="tab-name">{{ item.title }}</span>
                        <span class="full-span" @contextmenu.prevent.stop="tabContextmenu($event, item.key)"></span>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!-- 右键菜单 -->
        <el-dropdown ref="tabsMenu" trigger="contextmenu" @command="handleCommand">
            <span ref="tabsMenuTarget" class="tabsMenu-target"></span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="refresh">
                        <el-icon>
                            <Refresh theme="outline" />
                        </el-icon>
                        刷新页面
                    </el-dropdown-item>
                    <el-dropdown-item command="closeLeft">
                        <el-icon>
                            <GoStart theme="outline" />
                        </el-icon>
                        关闭左侧
                    </el-dropdown-item>
                    <el-dropdown-item command="closeRight">
                        <el-icon>
                            <GoEnd theme="outline" />
                        </el-icon>
                        关闭右侧
                    </el-dropdown-item>
                    <el-dropdown-item command="closeOther">
                        <el-icon>
                            <Close theme="outline" />
                        </el-icon>
                        关闭其他
                    </el-dropdown-item>
                    <el-dropdown-item command="closeAll">
                        <el-icon>
                            <Close theme="outline" />
                        </el-icon>
                        关闭全部
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang='ts'>
import { MenuFold, MenuUnfold } from '@icon-park/vue-next'
import { useThrottleFn } from '@vueuse/core'
import store from '@/store/index'
import { ref } from 'vue';
import type { DropdownInstance } from 'element-plus'
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { Refresh, GoStart, GoEnd, Close } from '@icon-park/vue-next'
defineOptions({
    name: 'TabsView',
});
const route = useRoute();
const { appStore, tabStore } = store

// 切换菜单折叠节流函数
const throttleToggle = useThrottleFn(() => {
    appStore.toggleCollapse()
}, 500)

// 当前右键菜单的tabKey
let contextMenuKey: string = ''

// tab右键事件
const tabsMenu = ref<DropdownInstance>()
const tabsMenuTarget = ref<HTMLSpanElement>()
const tabContextmenu = (e: MouseEvent, tabKey: string) => {
    if (!tabsMenu.value || !tabsMenuTarget.value) return
    tabsMenu.value.handleClose()
    setTimeout(() => {
        if (!tabsMenu.value || !tabsMenuTarget.value) return
        tabsMenuTarget.value.style.cssText = `top: 110px;left: ${e.clientX}px`
        contextMenuKey = tabKey
        tabsMenu.value.handleOpen()
    })
}

// tab右键菜单指令事件
const handleCommand = (command: 'refresh' | 'closeLeft' | 'closeRight' | 'closeAll' | 'closeOther') => {
    switch (command) {
        case 'refresh':
            tabStore.refreshTabByKey(contextMenuKey)
            break;
        case 'closeLeft':
            tabStore.closeLeftByKey(contextMenuKey)
            break;
        case 'closeRight':
            tabStore.closeRightByKey(contextMenuKey)
            break;
        case 'closeOther':
            tabStore.closeOther(contextMenuKey)
            break;
        case 'closeAll':
            tabStore.closeAll()
            break;
    }
}

// 监听路由事件(添加tab和判断激活tab)
watch(() => route.path, (newValue) => {
    tabStore.addTabs(route)
}, {
    immediate: true
})
</script>

<style lang='scss' scoped>
.micro-tab-container {
    @include fx;
    height: 50px;

    .toggle-menu-box {
        cursor: pointer;
        width: 50px;
        text-align: center;
    }

    .tabs-box {
        padding: 0 10px;
        flex: 1;
        overflow: hidden;
        height: 100%;
        margin-top: 12px;

        :deep(.vab-tabs-content-smooth) {


            height: 38px;



            .jtlj-tabs__nav-next,
            .jtlj-tabs__nav-prev {
                height: 48px;
                line-height: 48px
            }

            .jtlj-tabs__header {
                border-bottom: 0
            }

            .jtlj-tabs__header .jtlj-tabs__nav {
                border: 0
            }

            .jtlj-tabs__header .jtlj-tabs__nav {
                border: 0
            }

            .jtlj-tabs__header .jtlj-tabs__item {
                position: relative;
                height: 38px;
                padding: 0 30px 0 30px;
                margin-top: 5.95px;
                margin-right: -18px;
                line-height: 38px;
                text-align: center;
                border: 0;
                outline: none;
                transition: padding .3s cubic-bezier(.645, .045, .355, 1) !important
            }

            .full-span {
                position: absolute;
                inset: 0;
            }

            .jtlj-tabs__header .jtlj-tabs__item.is-closable:hover {
                padding: 0 30px 0 30px
            }

            .jtlj-tabs__header .jtlj-tabs__item.is-active {
                outline: none
            }

            .jtlj-tabs__header .jtlj-tabs__item.is-active,
            .jtlj-tabs__header .jtlj-tabs__item.is-active:hover {
                padding: 0 30px 0 30px;
                color: var(--jtlj-color-primary);
                background: var(--jtlj-color-primary-light-9);
                -webkit-mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
                mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
                -webkit-mask-size: 100% 100%;
                mask-size: 100% 100%
            }

            .jtlj-tabs__header .jtlj-tabs__item.is-active.is-closable {
                padding: 0 30px 0 30px
            }

            .jtlj-tabs__header .jtlj-tabs__item:hover {
                padding: 0 30px 0 30px;
                color: var(--jtlj-color-black);
                background: #dee1e6;
                -webkit-mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
                mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
                -webkit-mask-size: 100% 100%;
                mask-size: 100% 100%
            }
        }

    }

    .tabsMenu-target {
        position: fixed;
        top: 0;
        left: 0;
    }
}
</style>